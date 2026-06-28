import prisma from "@/lib/prisma";

const getFunds = async () => {
  return await prisma.fund.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export default getFunds;
