"use server";

import prisma from "@/lib/prisma";
import fromErrorToActionState, {
  ActionState,
  toActionState,
} from "@/lib/to-action-state";
import { savingPagePath, savingsPath } from "@/path";
import { toCent } from "@/utils/currency";
import { revalidatePath } from "next/cache";
import z from "zod";

const addPaymentSchema = z.object({
  amount: z.coerce
    .number()
    .min(1, { message: "Amount must be greater than 0" }),
});

const addPayment = async (
  fundId: string,
  _actionState: ActionState,
  formData: FormData,
) => {
  try {
    const data = addPaymentSchema.parse(Object.fromEntries(formData.entries()));
    const amount = toCent(data.amount);

    await prisma.$transaction([
      prisma.payment.create({ data: { fundId, amount } }),
      prisma.fund.update({
        where: { id: fundId },
        data: { saved: { increment: amount } },
      }),
    ]);
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  revalidatePath(savingsPath());
  revalidatePath(savingPagePath(fundId));
  return toActionState("SUCCESS", "Payment added successfully");
};

export default addPayment;
