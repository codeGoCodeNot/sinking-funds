import prisma from "@/lib/prisma";

const getFunds = async () => {
  return await prisma.fund.findMany({
    include: { payments: true },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export default getFunds;
