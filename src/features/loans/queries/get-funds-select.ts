import prisma from "@/lib/prisma";

const getFundsSelect = () => {
  return prisma.fund.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: { createdAt: "asc" },
  });
};

export default getFundsSelect;
