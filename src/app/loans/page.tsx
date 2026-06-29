import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Heading from "@/components/heading";
import getLoans from "@/features/loans/queries/get-loans";
import { toCurrencyFromCents } from "@/utils/currency";
import { INTEREST_RATES } from "@/features/loans/interest-rate";
import AddLoanDialog from "@/features/loans/components/add-loan-dialog";
import getFunds from "@/features/funds/queries/get-funds";
import LoansCard from "@/features/loans/components/loans-card";

const loanBadgeConfig = {
  active: {
    badge: "Active",
    badgeBg: "#EEEDFE",
    badgeColor: "#3C3489",
    color: "#3C3489",
  },
  paid: {
    badge: "Paid",
    badgeBg: "#E1F5EE",
    badgeColor: "#085041",
    color: "#085041",
  },
  overdue: {
    badge: "Overdue",
    badgeBg: "#FCEBEB",
    badgeColor: "#791F1F",
    color: "#791F1F",
  },
};

const LoansPage = async () => {
  const loans = await getLoans();
  const funds = await getFunds();

  const totalLoaned = loans.reduce((acc, loan) => acc + +loan.amount, 0);
  const totalInterest = loans.reduce((acc, loan) => acc + +loan.interest, 0);
  const activeCount = loans.filter((loan) => loan.status === "active").length;
  const overdueCount = loans.filter((loan) => loan.status === "overdue").length;

  const cards = [
    {
      title: "Total loaned out",
      description: toCurrencyFromCents(totalLoaned),
      emoji: "💸",
    },
    {
      title: "Total interest",
      description: toCurrencyFromCents(totalInterest),
      emoji: "📈",
    },
    { title: "Active loans", description: String(activeCount), emoji: "🔄" },
    { title: "Overdue loans", description: String(overdueCount), emoji: "⚠️" },
  ];

  return (
    <div className="flex flex-1 flex-col py-10 gap-y-10">
      <div className="max-w-2xl mx-auto w-full">
        <div className="flex justify-between items-center mb-4">
          <Heading title="Your Loans" />
          <AddLoanDialog funds={funds} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mx-auto w-full max-w-4xl">
          {cards.map((card, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </CardTitle>
                <CardDescription>
                  {card.emoji} {card.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
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
