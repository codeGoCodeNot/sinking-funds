"use server";

import { setCookieByKey } from "@/actions/cookies";
import prisma from "@/lib/prisma";
import fromErrorToActionState from "@/lib/to-action-state";
import { loansPagePath, savingsPath } from "@/path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const deleteFunds = async (fundId: string) => {
  try {
    await prisma.fund.delete({ where: { id: fundId } });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath(savingsPath());
  revalidatePath(loansPagePath());
  await setCookieByKey("toast", "Fund deleted successfully");
  redirect(savingsPath());
};

export default deleteFunds;
