import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import StatCard from "@/components/stat-card";
import DeleteLoansDialog from "@/features/loans/components/delete-loan-dialog";
import LoanCardPayment from "@/features/loans/components/loan-card-payments";
import LoanPaymentsDialog from "@/features/loans/components/loan-payments-dialog";
import { INTEREST_RATES } from "@/features/loans/interest-rate";
import getLoan from "@/features/loans/queries/get-loan";
import { loanBadgeConfig } from "@/features/loans/utils/loan-badge-config";
import { loansPagePath } from "@/path";
import { toCurrencyFromCents } from "@/utils/currency";
import { LucideArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

type LoanPageProps = {
  params: Promise<{ loanId: string }>;
};

const LoanPage = async ({ params }: LoanPageProps) => {
  const { loanId } = await params;

  const loan = await getLoan(loanId);
  if (!loan) notFound();

  const total = +loan.amount + +loan.interest;
  const paid = loan.loanPayments.reduce((acc, p) => acc + +p.amount, 0);
  const pct = Math.min(Math.round((paid / total) * 100), 100);
  const config = loanBadgeConfig[loan.status as keyof typeof loanBadgeConfig];
  const rate =
    INTEREST_RATES[String(loan.duration)] * 100 +
    (loan.isGuarantor ? 5 : 0) +
    (loan.status === "overdue" ? 10 : 0);

  if (!loan) notFound();

  return (
    <div className="flex flex-1 flex-col py-10 gap-y-10">
      <div className="max-w-2xl mx-auto w-full flex flex-col gap-y-6">
        {/* Nav + actions */}
        <div className="flex items-center justify-between">
          <Link
            href={loansPagePath()}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <LucideArrowLeft size={16} />
            Back to loans
          </Link>
          <div className="flex items-center gap-2">
            <DeleteLoansDialog loanId={loan.id} />
            <LoanPaymentsDialog loanId={loan.id} />
          </div>
        </div>

        {/* Loan title + badges */}
        <div>
          <h1 className="text-3xl font-bold">{loan.borrower}</h1>
          <p className="text-sm text-muted-foreground mt-1">{loan.fund.name}</p>
          <div className="flex items-center gap-2 mt-3">
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
              style={{ background: config.badgeBg, color: config.badgeColor }}
            >
              {config.badge}
            </span>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <StatCard
            label="Loan amount"
            value={toCurrencyFromCents(+loan.amount)}
            emoji="💸"
          />
          <StatCard
            label="Interest"
            value={`+${toCurrencyFromCents(+loan.interest)} (${rate}%)`}
            emoji="📈"
            tone="positive"
          />
          <StatCard
            label="Duration"
            value={`${loan.duration} month${loan.duration !== 1 ? "s" : ""}`}
            emoji="🎯"
          />
          <StatCard
            label="Due date"
            value={new Date(loan.dueDate).toLocaleDateString("en-PH", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            emoji="📅"
          />
        </div>

        {/* Progress */}
        <Card className="border-border shadow-sm">
          <CardHeader>
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>
                Paid {toCurrencyFromCents(paid)} of {toCurrencyFromCents(total)}
              </span>
              <span>{pct}%</span>
            </div>
            <div className="h-1.5 bg-border rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: `${pct}%`, background: config.color }}
              />
            </div>
          </CardHeader>
        </Card>

        {/* Payment history */}
        <div className="bg-background">
          <h2 className="text-2xl font-bold mb-4">Payment history</h2>
          {loan.loanPayments.length === 0 ? (
            <div className="text-center text-sm text-muted-foreground border border-dashed shadow-sm rounded-lg py-8">
              No payments yet. Add the first payment.
            </div>
          ) : (
            <div className="flex flex-col gap-y-4">
              {loan.loanPayments.map((payment) => (
                <LoanCardPayment key={payment.id} payment={payment} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoanPage;
