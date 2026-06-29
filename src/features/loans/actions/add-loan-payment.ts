"use server";

import prisma from "@/lib/prisma";
import fromErrorToActionState, {
  ActionState,
  toActionState,
} from "@/lib/to-action-state";
import { loanPagePath, loansPagePath, savingsPath } from "@/path";
import { toCent, toCurrencyFromCents } from "@/utils/currency";
import { revalidatePath } from "next/cache";
import z from "zod";

const loanPaymentSchema = z.object({
  amount: z.coerce
    .number()
    .min(1, { message: "Amount must be greater than 0" }),
});

const addLoanPayment = async (
  loanId: string,
  _actionState: ActionState,
  formData: FormData,
) => {
  try {
    const data = loanPaymentSchema.parse(
      Object.fromEntries(formData.entries()),
    );
    const amount = toCent(data.amount);

    const loan = await prisma.loan.findUnique({
      where: { id: loanId },
      include: {
        loanPayments: { select: { amount: true } },
      },
    });

    if (!loan) return toActionState("ERROR", "Loan not found");

    const totalPaid = loan.loanPayments.reduce((acc, p) => acc + +p.amount, 0);
    const total = +loan.amount + +loan.interest;
    const remaining = total - totalPaid;

    if (amount > remaining) {
      return {
        ...toActionState("ERROR", ""),
        fieldErrors: {
          amount: [
            `Amount exceeds remaining balance of ${toCurrencyFromCents(remaining)}`,
          ],
        },
      };
    }

    const isFullyPaid = totalPaid + amount >= total;

    await prisma.$transaction(async (tx) => {
      await tx.loanPayment.create({ data: { loanId, amount } });

      if (isFullyPaid) {
        await tx.loan.update({
          where: { id: loanId },
          data: { status: "paid" },
        });
        await tx.fund.update({
          where: { id: loan.fundId },
          data: { interest: { increment: +loan.interest } },
        });
      }
    });
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  revalidatePath(loansPagePath());
  revalidatePath(loanPagePath(loanId));
  revalidatePath(savingsPath());
  return toActionState("SUCCESS", "Payment added successfully");
};

export default addLoanPayment;
