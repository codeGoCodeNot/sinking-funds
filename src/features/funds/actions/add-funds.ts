"use server";

import prisma from "@/lib/prisma";
import fromErrorToActionState, {
  ActionState,
  toActionState,
} from "@/lib/to-action-state";
import { savingsPath } from "@/path";
import { toCent } from "@/utils/currency";
import { revalidatePath } from "next/cache";
import z from "zod";

const addFundsSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be between 2 and 50 characters" })
    .max(50, { message: "Name must be between 2 and 50 characters" }),
  description: z
    .string()
    .min(5, { message: "Description must be at least 5 characters" })
    .max(200, { message: "Description must be less than 200 characters" }),
  monthlyAmount: z.coerce
    .number()
    .min(1, { message: "Monthly amount must be greater than 0" }),
  months: z.coerce
    .number()
    .min(1, { message: "Duration must be greater than 0" }),
});

const addFunds = async (_ActionState: ActionState, formData: FormData) => {
  try {
    const data = addFundsSchema.parse(Object.fromEntries(formData.entries()));

    await prisma.fund.create({
      data: {
        ...data,
        monthlyAmount: toCent(data.monthlyAmount),
        status: "in_progress",
      },
    });
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  revalidatePath(savingsPath());
  return toActionState("SUCCESS", "Funds added successfully");
};

export default addFunds;
