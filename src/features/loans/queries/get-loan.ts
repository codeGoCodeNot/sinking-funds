import prisma from "@/lib/prisma";

const getLoan = async (loanId: string) => {
  return await prisma.loan.findUnique({
    where: {
      id: loanId,
    },
    include: {
      fund: { select: { name: true } },
      loanPayments: { orderBy: { createdAt: "desc" } },
    },
  });
};

export default getLoan;
