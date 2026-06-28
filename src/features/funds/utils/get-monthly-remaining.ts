import { Fund, Payment } from "@/generated/prisma/client";

const getMonthlyRemaining = (fund: Fund & { payments: Payment[] }) => {
  const today = new Date();
  const thisMonthTotal = fund.payments
    .filter((payment) => {
      const date = new Date(payment.createdAt);
      return (
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      );
    })
    .reduce((acc, payment) => acc + Number(payment.amount), 0);

  return Math.max(+fund.monthlyAmount - thisMonthTotal, 0);
};

export default getMonthlyRemaining;
