import { savingsPath, loansPath, activityPath, membersPath } from "@/path";
import Link from "next/link";

const cards = [
  {
    href: savingsPath(),
    emoji: "🏦",
    title: "Savings",
    description: "Track your sinking funds",
  },
  {
    href: loansPath(),
    emoji: "🤝",
    title: "Loans",
    description: "Lend to the community",
  },
  {
    href: activityPath(),
    emoji: "📊",
    title: "Activity",
    description: "Recent transactions",
  },
  {
    href: membersPath(),
    emoji: "👥",
    title: "Members",
    description: "View fund members",
  },
];

const goalPills = [
  { label: "Emergency Fund", bg: "#EEEDFE", color: "#3C3489" },
  { label: "Family Trip", bg: "#E1F5EE", color: "#085041" },
  { label: "New Laptop", bg: "#FAEEDA", color: "#633806" },
  { label: "Car Down Payment", bg: "#FAECE7", color: "#712B13" },
  { label: "Wedding Fund", bg: "#FBEAF0", color: "#72243E" },
  { label: "Medical Reserve", bg: "#EAF3DE", color: "#27500A" },
  { label: "Study Abroad", bg: "#E6F1FB", color: "#0C447C" },
  { label: "Home Repairs", bg: "#EEEDFE", color: "#3C3489" },
  { label: "Side Business", bg: "#E1F5EE", color: "#085041" },
  { label: "Vacation Fund", bg: "#FAEEDA", color: "#633806" },
];

const statChips = [
  "💰 ₱2.4M saved",
  "👥 340 members",
  "🤝 120 active loans",
  "📈 98% repayment rate",
  "🏦 52 active funds",
  "⭐ 4.9 community rating",
  "🔒 Fully secured",
  "🚀 Trusted since 2023",
];

const HomePage = () => {
  return (
    <div className="flex flex-1 flex-col pt-20">
      <div className="w-full">
        <h1 className="text-5xl font-bold mb-12 text-center">
          Save smart. Lend with purpose
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mx-auto w-full max-w-4xl">
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="flex flex-col gap-3 p-6 rounded-2xl border border-border bg-white
              transition-all duration-200 hover:-translate-y-1 hover:shadow-lg max-w-[550px]"
            >
              <span className="text-3xl">{card.emoji}</span>
              <div>
                <p className="font-semibold text-lg">{card.title}</p>
                <p className="text-sm text-muted-foreground">
                  {card.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="flex flex-col flex-1">
        <section
          className="mt-20 py-6 flex flex-col gap-3 overflow-hidden w-full"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}
        >
          <div
            className="marquee-left flex gap-3"
            style={{ width: "max-content" }}
          >
            {[...goalPills, ...goalPills, ...goalPills].map((pill, idx) => (
              <span
                key={idx}
                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap"
                style={{ background: pill.bg, color: pill.color }}
              >
                {pill.label}
              </span>
            ))}
          </div>
          <div
            className="marquee-right flex gap-3"
            style={{ width: "max-content" }}
          >
            {[...statChips, ...statChips, ...statChips].map((chip, i) => (
              <span
                key={i}
                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap border border-border bg-secondary text-secondary-foreground"
              >
                {chip}
              </span>
            ))}
          </div>
        </section>

        <div className="mx-auto w-full max-w-4xl mt-16 mb-20 rounded-3xl bg-foreground text-background px-12 py-14 flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Ready to start saving?</h2>
            <p className="text-background/60 text-base max-w-sm">
              Join the community and take control of your finances — one fund at
              a time.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href={savingsPath()}
              className="px-6 py-3 rounded-xl bg-background text-foreground font-semibold text-sm hover:bg-background/90 transition-colors text-center"
            >
              Start a fund
            </Link>
            <Link
              href={membersPath()}
              className="px-6 py-3 rounded-xl border border-background/20 text-background font-semibold text-sm hover:bg-white/10 transition-colors text-center"
            >
              Browse members
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
