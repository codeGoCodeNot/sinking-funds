import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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
    <Card key={loan.id}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-base">{loan.borrower}</CardTitle>
            <CardDescription>{loan.fund.name}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {loan.isGuarantor && (
              <span
                className="text-xs px-3 py-1 rounded-full font-medium"
                style={{ background: "#F1EFE8", color: "#444441" }}
              >
                Guarantor
              </span>
            )}
            <span
              className="text-xs px-3 py-1 rounded-full font-medium"
              style={{
                background: config.badgeBg,
                color: config.badgeColor,
              }}
            >
              {config.badge}
            </span>
            <Button asChild variant="ghost" size="icon">
              <Link href={loanPagePath(loan.id)}>
                <LucideSquareArrowUpRight strokeWidth={1.5} />
              </Link>
            </Button>
          </div>
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
            Paid{" "}
            <span className="text-foreground font-medium">
              {toCurrencyFromCents(paid)}
            </span>
          </span>
          <span className="text-xs text-muted-foreground">
            Total{" "}
            <span className="text-foreground font-medium">
              {toCurrencyFromCents(total)}
            </span>
          </span>
        </div>

        <div className="flex justify-between mt-1">
          <span className="text-xs text-muted-foreground">
            Interest{" "}
            <span className="font-medium" style={{ color: "#27500A" }}>
              +{toCurrencyFromCents(+loan.interest)} ({rate}%)
            </span>
          </span>
          <span className="text-xs text-muted-foreground">
            Due{" "}
            <span
              className="font-medium"
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
      </CardHeader>
    </Card>
  );
};

export default LoansCard;
