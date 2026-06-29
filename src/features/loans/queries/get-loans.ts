import prisma from "@/lib/prisma";

const getLoans = async () => {
  return await prisma.loan.findMany({
    include: {
      fund: {
        select: { name: true },
      },
      loanPayments: {
        select: { amount: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

export default getLoans;
