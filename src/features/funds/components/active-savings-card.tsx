import { Card } from "@/components/ui/card";
import { Fund, Payment } from "@/generated/prisma/client";
import { toCurrencyFromCents } from "@/utils/currency";
import isDueSoon from "../utils/id-due-soon";
import badgeConfig from "../utils/badge-config";
import { LucideSquareArrowUpRight } from "lucide-react";
import Link from "next/link";
import { savingPagePath } from "@/path";
import { Button } from "@/components/ui/button";
import getMonthlyRemaining from "../utils/get-monthly-remaining";

type SavingsCardProps = {
  funds: (Fund & { payments: Payment[] })[];
};

const ActiveSavingsCard = ({ funds }: SavingsCardProps) => {
  return (
    <div className="max-w-2xl mx-auto w-full">
      <h2 className="text-2xl font-bold mb-4">Active Sinking Funds</h2>
      <div className="flex flex-col gap-y-3">
        {funds.map((fund) => {
          const remaining = getMonthlyRemaining(fund);
          const pct = Math.min(
            Math.round(
              (Number(fund.saved) /
                (Number(fund.monthlyAmount) * fund.months)) *
                100,
            ),
            100,
          );
          const config = badgeConfig[fund.status as keyof typeof badgeConfig];
          const dueDays = isDueSoon(fund);

          return (
            <Card
              key={fund.id}
              className="bg-muted p-0 border-l-[3px]"
              style={{ borderLeftColor: config.color }}
            >
              <div className="px-5 py-4 flex flex-col gap-2.5">
                {/* Header */}
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-sm leading-tight">
                    {fund.name}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span
                      className="text-xs px-2.5 py-0.5 rounded-full font-medium"
                      style={{
                        background: config.badgeBg,
                        color: config.badgeColor,
                      }}
                    >
                      {config.badge}
                    </span>
                    <Button
                      asChild
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 -mr-1.5"
                    >
                      <Link href={savingPagePath(fund.id)}>
                        <LucideSquareArrowUpRight size={14} />
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Description */}
                {fund.description && (
                  <p className="text-xs text-muted-foreground -mt-1">
                    {fund.description}
                  </p>
                )}

                {/* Alerts */}
                {(dueDays !== null || remaining > 0) && (
                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    {dueDays !== null && (
                      <span className="text-xs text-orange-500 font-medium">
                        ⚠ Due in {dueDays} day{dueDays !== 1 ? "s" : ""}
                      </span>
                    )}
                    {remaining > 0 && (
                      <span className="text-xs text-muted-foreground">
                        Remaining{" "}
                        <span className="text-foreground font-medium">
                          {toCurrencyFromCents(remaining)}
                        </span>
                      </span>
                    )}
                  </div>
                )}

                {/* Progress bar */}
                <div className="flex items-center gap-2.5">
                  <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${pct}%`, background: config.color }}
                    />
                  </div>
                  <span className="text-xs tabular-nums text-muted-foreground w-7 text-right">
                    {pct}%
                  </span>
                </div>

                {/* Stats row */}
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>
                    Saved{" "}
                    <span className="text-foreground font-semibold">
                      {toCurrencyFromCents(Number(fund.saved))}
                    </span>
                  </span>
                  <span>
                    {Math.floor(
                      Number(fund.saved) / Number(fund.monthlyAmount),
                    )}{" "}
                    / {fund.months} mo
                  </span>
                </div>

                <span className="text-xs text-muted-foreground">
                  Interest{" "}
                  <span className="font-semibold text-emerald-600">
                    +{toCurrencyFromCents(Number(fund.interest))}
                  </span>
                </span>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ActiveSavingsCard;
