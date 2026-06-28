"use server";

import prisma from "@/lib/prisma";
import { savingsPath } from "@/path";
import { toCent } from "@/utils/currency";
import { revalidatePath } from "next/cache";
import z from "zod";

const addFundsSchema = z.object({
  name: z.string().max(50, { message: "Name must be less than 50 characters" }),
  description: z
    .string()
    .max(200, { message: "Description must be less than 200 characters" }),
  monthlyAmount: z.coerce
    .number()
    .min(1, { message: "Monthly amount must be greater than 0" }),
  months: z.coerce
    .number()
    .min(1, { message: "Duration must be greater than 0" }),
});

const addFunds = async (
  _ActionState: { success?: boolean; message?: string },
  formData: FormData,
) => {
  const data = addFundsSchema.parse(Object.fromEntries(formData.entries()));

  await prisma.fund.create({
    data: {
      ...data,
      monthlyAmount: toCent(data.monthlyAmount),
      status: "in_progress",
    },
  });

  revalidatePath(savingsPath());
  return { success: true, message: "Fund created successfully" };
};

export default addFunds;
