import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { loanPagePath } from "@/path";
import { toCurrencyFromCents } from "@/utils/currency";
import { LucideSquareArrowUpRight } from "lucide-react";
import Link from "next/link";

type LoansCardProps = {
  loan: {
    id: string;
    borrower: string;
    fund: {
      name: string;
    };
    isGuarantor: boolean;
    status: string;
    duration: number;
    amount: number;
    interest: number;
    dueDate: Date;
  };
  config: {
    badge: string;
    badgeBg: string;
    badgeColor: string;
    color: string;
  };
  total: number;
  paid: number;
  pct: number;
  rate: number;
};

const LoansCard = ({
  loan,
  config,
  total,
  paid,
  pct,
  rate,
}: LoansCardProps) => {
  return (
    <Card
      className="bg-muted p-0 border-l-[3px]"
      style={{ borderLeftColor: config.color }}
    >
      <div className="px-5 py-4 flex flex-col gap-2.5">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="font-semibold text-sm">{loan.borrower}</p>
            <p className="text-xs text-muted-foreground">{loan.fund.name}</p>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            {loan.isGuarantor && (
              <span
                className="text-xs px-2.5 py-0.5 rounded-full font-medium"
                style={{ background: "#F1EFE8", color: "#444441" }}
              >
                Guarantor
              </span>
            )}
            <span
              className="text-xs px-2.5 py-0.5 rounded-full font-medium"
              style={{ background: config.badgeBg, color: config.badgeColor }}
            >
              {config.badge}
            </span>
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="h-7 w-7 -mr-1.5"
            >
              <Link href={loanPagePath(loan.id)}>
                <LucideSquareArrowUpRight size={14} strokeWidth={1.5} />
              </Link>
            </Button>
          </div>
        </div>

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

        {/* Payment row */}
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>
            Paid{" "}
            <span className="text-foreground font-semibold">
              {toCurrencyFromCents(paid)}
            </span>
          </span>
          <span>
            Total{" "}
            <span className="text-foreground font-semibold">
              {toCurrencyFromCents(total)}
            </span>
          </span>
        </div>

        {/* Interest + due row */}
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>
            Interest{" "}
            <span className="font-semibold text-emerald-600">
              +{toCurrencyFromCents(+loan.interest)} ({rate}%)
            </span>
          </span>
          <span>
            Due{" "}
            <span
              className="font-semibold"
              style={{
                color: loan.status === "overdue" ? "#791F1F" : undefined,
              }}
            >
              {new Date(loan.dueDate).toLocaleDateString("en-PH", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </span>
        </div>
      </div>
    </Card>
  );
};

export default LoansCard;
