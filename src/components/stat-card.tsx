import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

type StatCardProps = {
  label: string;
  value: string;
  emoji: string;
  tone?: "default" | "positive";
};

export default function StatCard({
  label,
  value,
  emoji,
  tone = "default",
}: StatCardProps) {
  return (
    <Card className="flex flex-row items-center gap-4 px-5 py-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-muted text-xl">
        {emoji}
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          {label}
        </span>
        <span
          className={cn(
            "text-xl font-semibold tracking-tight",
            tone === "positive" ? "text-emerald-600" : "text-foreground",
          )}
        >
          {value}
        </span>
      </div>
    </Card>
  );
}
