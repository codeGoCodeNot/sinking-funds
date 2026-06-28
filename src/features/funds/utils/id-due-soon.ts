import { Fund, Payment } from "@/generated/prisma/client";

const isDueSoon = (fund: Fund & { payments: Payment[] }) => {
  const today = new Date();
  const dueDate =
    today.getDate() >= fund.dueDay
      ? new Date(today.getFullYear(), today.getMonth() + 1, fund.dueDay)
      : new Date(today.getFullYear(), today.getMonth(), fund.dueDay);

  const daysUntilDue = Math.ceil(
    (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );

  const thisMonthTotal = fund.payments
    .filter((payment) => {
      const date = new Date(payment.createdAt);
      return (
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      );
    })
    .reduce((acc, payment) => acc + Number(payment.amount), 0);

  const paidThisMonth = thisMonthTotal >= Number(fund.monthlyAmount);

  if (paidThisMonth || daysUntilDue > 3) return null;
  return daysUntilDue;
};

export default isDueSoon;
