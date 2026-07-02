import StatCard from "@/components/stat-card";
import AddFundsDialog from "@/features/funds/components/add-funds-dialog";
import ActiveSavingsCard from "@/features/funds/components/active-savings-card";
import getFunds from "@/features/funds/queries/get-funds";
import { toCurrencyFromCents } from "@/utils/currency";

const SavingsPage = async () => {
  const funds = await getFunds();
  const totalSaved = funds.reduce((acc, fund) => acc + +fund.saved, 0);
  const totalInterest = funds.reduce((acc, fund) => acc + +fund.interest, 0);
  const nearestGoal = funds.reduce((acc, fund) => {
    const pct = Math.round(
      (Number(fund.saved) / (Number(fund.monthlyAmount) * fund.months)) * 100,
    );
    return pct > acc ? pct : acc;
  }, 0);

  const now = new Date();
  const thisMonth = funds.reduce((account, fund) => {
    return (
      account +
      fund.payments
        .filter((payment) => {
          const paymentDate = new Date(payment.createdAt);
          return (
            paymentDate.getMonth() === now.getMonth() &&
            paymentDate.getFullYear() === now.getFullYear()
          );
        })
        .reduce((acc, payment) => acc + +payment.amount, 0)
    );
  }, 0);

  return (
    <div className="flex flex-1 flex-col py-10 gap-y-10">
      <div className="max-w-2xl mx-auto w-full">
        <AddFundsDialog title="Add Funds" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mx-auto w-full max-w-4xl">
          <StatCard
            label="Contributions"
            value={toCurrencyFromCents(totalSaved)}
            emoji="💰"
          />
          <StatCard
            label="This month"
            value={toCurrencyFromCents(thisMonth)}
            emoji="📅"
          />
          <StatCard
            label="Closest goal"
            value={`${nearestGoal}%`}
            emoji="🎯"
          />
          <StatCard
            label="Interest earned"
            value={toCurrencyFromCents(totalInterest)}
            emoji="📈"
            tone="positive"
          />
        </div>
      </div>
      <ActiveSavingsCard funds={funds} />
    </div>
  );
};

export default SavingsPage;
