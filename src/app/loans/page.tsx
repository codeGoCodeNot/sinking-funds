import StatCard from "@/components/stat-card";
import Heading from "@/components/heading";
import getLoans from "@/features/loans/queries/get-loans";
import { toCurrencyFromCents } from "@/utils/currency";
import { INTEREST_RATES } from "@/features/loans/interest-rate";
import AddLoanDialog from "@/features/loans/components/add-loan-dialog";
import getFunds from "@/features/funds/queries/get-funds";
import LoansCard from "@/features/loans/components/loans-card";
import { loanBadgeConfig } from "@/features/loans/utils/loan-badge-config";
import { savingsPath } from "@/path";

const LoansPage = async () => {
  const loans = await getLoans();
  const funds = await getFunds();

  const totalLoaned = loans.reduce((acc, loan) => acc + +loan.amount, 0);
  const totalInterest = loans.reduce((acc, loan) => acc + +loan.interest, 0);
  const activeCount = loans.filter((loan) => loan.status === "active").length;
  const overdueCount = loans.filter((loan) => loan.status === "overdue").length;

  return (
    <div className="flex flex-1 flex-col py-10 gap-y-10">
      <div className="max-w-2xl mx-auto w-full">
        <div className="flex justify-between items-center mb-4">
          <Heading
            title="Your Loans"
            description="Track loans from your funds. Go to"
            descriptionHref={savingsPath()}
            descriptionLinkLabel="savings"
          />
          <AddLoanDialog funds={funds} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mx-auto w-full max-w-4xl">
          <StatCard
            label="Total loaned out"
            value={toCurrencyFromCents(totalLoaned)}
            emoji="💸"
          />
          <StatCard
            label="Interest earned"
            value={toCurrencyFromCents(totalInterest)}
            emoji="📈"
            tone="positive"
          />
          <StatCard
            label="Active loans"
            value={String(activeCount)}
            emoji="🔄"
          />
          <StatCard
            label="Overdue loans"
            value={String(overdueCount)}
            emoji="⚠️"
          />
        </div>
      </div>

      <div className="max-w-2xl mx-auto w-full">
        <h2 className="text-2xl font-bold mb-4">Loans</h2>
        <div className="flex flex-col gap-y-4">
          {loans.map((loan) => {
            const config =
              loanBadgeConfig[loan.status as keyof typeof loanBadgeConfig];
            const total = +loan.amount + +loan.interest;
            const paid = loan.loanPayments.reduce(
              (acc, p) => acc + +p.amount,
              0,
            );
            const pct = Math.min(Math.round((paid / total) * 100), 100);
            const rate =
              INTEREST_RATES[String(loan.duration)] * 100 +
              (loan.isGuarantor ? 5 : 0) +
              (loan.status === "overdue" ? 10 : 0);

            return (
              <LoansCard
                key={loan.id}
                loan={loan}
                config={config}
                total={total}
                paid={paid}
                pct={pct}
                rate={rate}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LoansPage;
