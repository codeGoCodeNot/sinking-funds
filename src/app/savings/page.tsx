import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AddFundsDialog from "@/features/funds/components/add-funds-dialog";
import getFunds from "@/features/funds/queries/get-funds";
import { toCurrencyFromCents } from "@/utils/currency";

const cards = [
  { title: "Total saved", description: "₱2,400", emoji: "💰" },
  { title: "This month", description: "₱500", emoji: "📅" },
  { title: "Nearest goal", description: "82%", emoji: "🎯" },
  { title: "Total interest", description: "₱1,200", emoji: "📈" },
];

const badgeConfig = {
  in_progress: {
    badge: "In progress",
    badgeBg: "#EEEDFE",
    badgeColor: "#3C3489",
    color: "#3C3489",
  },
  completed: {
    badge: "Completed",
    badgeBg: "#E1F5EE",
    badgeColor: "#085041",
    color: "#085041",
  },
  inactive: {
    badge: "Inactive",
    badgeBg: "#F1EFE8",
    badgeColor: "#444441",
    color: "#444441",
  },
};

const SavingsPage = async () => {
  const funds = await getFunds();

  return (
    <div className="flex flex-1 flex-col py-10 gap-y-10">
      <div className="max-w-2xl mx-auto w-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Your Savings</h1>
          <AddFundsDialog title="Add Funds" />
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
        <h2 className="text-2xl font-bold mb-4">Active Singking Funds</h2>
        <div className="flex flex-col gap-y-4">
          {funds.map((fund) => {
            const pct = Math.min(
              Math.round(
                (Number(fund.saved) /
                  (Number(fund.monthlyAmount) * fund.months)) *
                  100,
              ),
              100,
            );
            const config = badgeConfig[fund.status as keyof typeof badgeConfig];
            return (
              <Card key={fund.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">{fund.name}</CardTitle>
                      <CardDescription>{fund.description}</CardDescription>
                    </div>
                    <span
                      className="text-xs px-3 py-1 rounded-full font-medium"
                      style={{
                        background: config.badgeBg,
                        color: config.badgeColor,
                      }}
                    >
                      {config.badge}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${pct}%`, background: config.color }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {pct}%
                    </span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-muted-foreground">
                      Saved{" "}
                      <span className="text-foreground font-medium">
                        {toCurrencyFromCents(Number(fund.saved))}
                      </span>
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Goal{" "}
                      <span className="text-foreground font-medium">
                        {Math.floor(
                          Number(fund.saved) / Number(fund.monthlyAmount),
                        )}{" "}
                        of {fund.months} months
                      </span>
                    </span>
                    <div className="mt-1">
                      <span className="text-xs text-muted-foreground">
                        Interest earned{" "}
                        <span
                          className="font-medium"
                          style={{ color: "#27500A" }}
                        >
                          +{toCurrencyFromCents(Number(fund.interest))}
                        </span>
                      </span>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SavingsPage;
