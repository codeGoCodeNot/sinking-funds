import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const seed = async () => {
  const t0 = performance.now();
  console.log("Db seeding started...");

  await prisma.fund.deleteMany();
  await prisma.fund.createMany({
    data: [
      {
        name: "Emergency Fund",
        description: "3 months of living expenses",
        months: 12,
        monthlyAmount: 400000, // ₱4,000
        saved: 2460000, // ₱24,600
        interest: 120000, // ₱1,200
        status: "in_progress",
      },
      {
        name: "Family Trip 2025",
        description: "Boracay summer vacation",
        months: 12,
        monthlyAmount: 500000, // ₱5,000
        saved: 600000, // ₱6,000
        interest: 30000, // ₱300
        status: "in_progress",
      },
      {
        name: "New Laptop",
        description: "MacBook Pro M4",
        months: 12,
        monthlyAmount: 1000000, // ₱10,000
        saved: 10000000, // ₱100,000
        interest: 500000, // ₱5,000
        status: "completed",
      },
    ],
  });

  const t1 = performance.now();
  console.log(`Db seeding finished in ${(t1 - t0).toFixed(2)} ms.`);

  await prisma.$disconnect();
};

seed();
