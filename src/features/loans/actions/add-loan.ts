"use server";

import fromErrorToActionState, {
  ActionState,
  toActionState,
} from "@/lib/to-action-state";
import { loansPagePath } from "@/path";
import { revalidatePath } from "next/cache";
import z from "zod";
import { INTEREST_RATES } from "../interest-rate";
import { toCent, toCurrencyFromCents } from "@/utils/currency";
import prisma from "@/lib/prisma";
import { addDays } from "date-fns";

const addLoanSchema = z.object({
  fundId: z.string().min(1, { message: "Fund is required" }),
  borrower: z.string().min(2).max(100),
  amount: z.coerce
    .number()
    .min(1, { message: "Amount must be greater than 0" }),
  duration: z.coerce.number().refine((v) => [1, 1.5, 2].includes(v), {
    message: "Duration must be 1, 1.5, or 2 months",
  }),
  isGuarantor: z.coerce.boolean().default(false),
});

const addLoan = async (_actionState: ActionState, formData: FormData) => {
  try {
    const data = addLoanSchema.parse(Object.fromEntries(formData.entries()));

    const baseRate = INTEREST_RATES[String(data.duration)];
    const rate = baseRate + (data.isGuarantor ? 0.05 : 0);
    const amount = toCent(data.amount);
    const interest = Math.round(amount * rate);
    const dueDate = addDays(new Date(), data.duration * 30);

    await prisma.$transaction(async (tx) => {
      const lockedFund = await tx.$queryRaw<{ id: string; saved: number }[]>
        `SELECT id, saved FROM "Fund" WHERE id = ${data.fundId} FOR UPDATE`;

      if (!lockedFund.length) throw new Error("Fund not found");

      const activeLoans = await tx.loan.findMany({
        where: {
          fundId: data.fundId,
          status: { in: ["active", "overdue"] },
        },
        select: { amount: true },
      });

      const totalActiveLoans = activeLoans.reduce((account, loan) => account + +loan.amount, 0);

      const saved = +lockedFund[0].saved;
      const trueSaved = saved + totalActiveLoans;
      const maxLoanable = trueSaved * 0.8;

      if (totalActiveLoans + amount > maxLoanable)
        throw new Error(
          `Loan exceeds 80% of fund savings. Max loanable: ${toCurrencyFromCents(maxLoanable - totalActiveLoans)}`,
        );


      if (amount > saved)
        throw new Error(
          `Loan exceeds available fund balance. Available: ${toCurrencyFromCents(saved)}`,
        );

      await tx.fund.update({
        where: { id: data.fundId },
        data: { saved: { decrement: amount } },
      });

      await tx.loan.create({
        data: {
          fundId: data.fundId,
          borrower: data.borrower,
          duration: data.duration,
          amount,
          interest,
          isGuarantor: data.isGuarantor,
          status: "active",
          dueDate,
        },
      });

    })

  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  revalidatePath(loansPagePath());
  return toActionState("SUCCESS", "Loan created successfully");
};

export default addLoan;
