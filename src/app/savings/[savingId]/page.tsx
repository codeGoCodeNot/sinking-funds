import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import getFund from "@/features/funds/queries/get-fund";
import badgeConfig from "@/features/funds/utils/badge-config";
import isDueSoon from "@/features/funds/utils/id-due-soon";
import { savingsPath } from "@/path";
import { toCurrencyFromCents } from "@/utils/currency";
import { LucideArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddPaymentsDialog from "@/features/funds/components/add-payments-dialog";

type SavingPageProps = {
  params: Promise<{ savingId: string }>;
};

const SavingPage = async ({ params }: SavingPageProps) => {
  const { savingId } = await params;
  const fund = await getFund(savingId);

  if (!fund) notFound();

  const pct = Math.min(
    Math.round(
      (Number(fund.saved) / (Number(fund.monthlyAmount) * fund.months)) * 100,
    ),
    100,
  );
  const config = badgeConfig[fund.status as keyof typeof badgeConfig];
  const dueDays = isDueSoon(fund);
  const monthsPaid = Math.floor(
    Number(fund.saved) / Number(fund.monthlyAmount),
  );

  return (
    <div className="flex flex-1 flex-col py-10 gap-y-10">
      <div className="max-w-2xl mx-auto w-full flex flex-col gap-y-6">
        {/* Nav + actions */}
        <div className="flex items-center justify-between">
          <Link
            href={savingsPath()}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <LucideArrowLeft size={16} />
            Back to savings
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="destructive" size="sm">
              Delete
            </Button>
            <AddPaymentsDialog fundId={fund.id} />
          </div>
        </div>

        {/* Fund title + badges */}
        <div>
          <h1 className="text-3xl font-bold">{fund.name}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {fund.description}
          </p>
          <div className="flex items-center gap-2 mt-3">
            <span
              className="text-xs px-3 py-1 rounded-full font-medium"
              style={{ background: config.badgeBg, color: config.badgeColor }}
            >
              {config.badge}
            </span>
            {dueDays !== null && (
              <span className="text-xs px-3 py-1 rounded-full font-medium bg-orange-50 text-orange-600">
                ⚠ Due in {dueDays} day{dueDays !== 1 ? "s" : ""}
              </span>
            )}
          </div>
        </div>

        {/* Stat cards — same as savings page */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              title: "Total saved",
              description: toCurrencyFromCents(Number(fund.saved)),
              emoji: "💰",
            },
            {
              title: "Monthly amount",
              description: toCurrencyFromCents(Number(fund.monthlyAmount)),
              emoji: "📅",
            },
            {
              title: "Duration",
              description: `${fund.months} months`,
              emoji: "🎯",
            },
            {
              title: "Interest earned",
              description: `+${toCurrencyFromCents(Number(fund.interest))}`,
              emoji: "📈",
            },
          ].map((s) => (
            <Card className="border-border shadow-sm" key={s.title}>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {s.title}
                </CardTitle>
                <CardDescription>
                  {s.emoji} {s.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Progress */}
        <Card className="border-border shadow-sm">
          <CardHeader>
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>
                Progress — {monthsPaid} of {fund.months} months
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
        <div>
          <h2 className="text-2xl font-bold mb-4">Payment history</h2>
          {fund.payments.length === 0 ? (
            <div className="text-center text-sm text-muted-foreground border border-dashed shadow-sm rounded-lg py-8">
              No payments yet. Add your first payment.
            </div>
          ) : (
            <div className="flex flex-col gap-y-4">
              {fund.payments.map((payment) => (
                <Card key={payment.id} className="border-border shadow-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-base">
                          Monthly deposit
                        </CardTitle>
                        <CardDescription>
                          {new Date(payment.createdAt).toLocaleDateString(
                            "en-PH",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            },
                          )}
                        </CardDescription>
                      </div>
                      <span
                        className="text-sm font-medium"
                        style={{ color: "#27500A" }}
                      >
                        +{toCurrencyFromCents(Number(payment.amount))}
                      </span>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavingPage;
