import prisma from "@/lib/prisma";

const getFund = async (id: string) => {
  return await prisma.fund.findUnique({
    where: { id },
    include: { payments: { orderBy: { createdAt: "desc" } } },
  });
};

export default getFund;
