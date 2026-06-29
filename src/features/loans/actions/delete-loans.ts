"use server";

import { setCookieByKey } from "@/actions/cookies";
import prisma from "@/lib/prisma";
import fromErrorToActionState from "@/lib/to-action-state";
import { loansPagePath, savingsPath } from "@/path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const deleteLoans = async (loanId: string) => {
  try {
    await prisma.loan.delete({ where: { id: loanId } });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath(loansPagePath());
  await setCookieByKey("toast", "Loan deleted successfully");
  redirect(loansPagePath());
};

export default deleteLoans;
