import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AddFundsDialog from "@/features/funds/components/add-funds-dialog";
import SavingsCard from "@/features/funds/components/savings-card";
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

  const cards = [
    {
      title: "Total saved",
      description: toCurrencyFromCents(totalSaved),
      emoji: "💰",
    },
    { title: "This month", description: "₱0", emoji: "📅" },
    { title: "Nearest goal", description: `${nearestGoal}%`, emoji: "🎯" },
    {
      title: "Total interest",
      description: toCurrencyFromCents(totalInterest),
      emoji: "📈",
    },
  ];

  return (
    <div className="flex flex-1 flex-col py-10 gap-y-10">
      <div className="max-w-2xl mx-auto w-full">
        <AddFundsDialog title="Add Funds" />
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

      <SavingsCard funds={funds} />
    </div>
  );
};

export default SavingsPage;
