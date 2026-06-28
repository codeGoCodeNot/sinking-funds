import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Fund, Payment } from "@/generated/prisma/client";
import { toCurrencyFromCents } from "@/utils/currency";
import isDueSoon from "../utils/id-due-soon";
import badgeConfig from "../utils/badge-config";

type SavingsCardProps = {
  funds: (Fund & { payments: Payment[] })[];
};

const SavingsCard = ({ funds }: SavingsCardProps) => {
  return (
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
                    {isDueSoon(fund) !== null && (
                      <span className="text-xs text-orange-500 font-medium">
                        ⚠ Due in {isDueSoon(fund)} day
                        {isDueSoon(fund) !== 1 ? "s" : ""}
                      </span>
                    )}
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
                  <span className="text-xs text-muted-foreground">{pct}%</span>
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
                </div>
                <span className="text-xs text-muted-foreground">
                  Interest earned{" "}
                  <span className="font-medium" style={{ color: "#27500A" }}>
                    +{toCurrencyFromCents(Number(fund.interest))}
                  </span>
                </span>
              </CardHeader>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default SavingsCard;
