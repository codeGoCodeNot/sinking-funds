"use client";

import { useSession } from "@/lib/auth-client";
import { loansPagePath, savingsPath, signInPagePath, signUpPagePath } from "@/path";
import Link from "next/link";

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

const HomeClient = () => {
    const { data: session, isPending } = useSession();
    const user = session?.user;

    return (
        <div>
            <div className="flex flex-1 flex-col pt-20">
                <div className="w-full">
                    <h1 className="text-5xl font-bold mb-12 text-center">
                        Save smart. Lend with purpose
                    </h1>

                    {!isPending && !user && (
                        <div className="mx-auto w-full max-w-md mt-12 bg-card border border-border rounded-2xl p-8 flex flex-col gap-6">
                            <div className="text-center">
                                <h3 className="text-lg font-bold text-foreground">Start saving in 3 steps</h3>
                                <p className="text-sm text-muted-foreground mt-1">It only takes a minute to set up your first fund.</p>
                            </div>

                            <div className="flex flex-col gap-1">
                                <div className="flex gap-3 items-start">
                                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#3C3489] text-white text-xs font-semibold mt-0.5">1</div>
                                    <div>
                                        <p className="text-sm font-medium text-foreground">Create your account</p>
                                        <p className="text-xs text-muted-foreground">Sign up with email or Google</p>
                                    </div>
                                </div>
                                <div className="ml-3.5 w-0.5 h-5 bg-[#EEEDFE]" />

                                <div className="flex gap-3 items-start">
                                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#3C3489] text-white text-xs font-semibold mt-0.5">2</div>
                                    <div>
                                        <p className="text-sm font-medium text-foreground">Set up a sinking fund</p>
                                        <p className="text-xs text-muted-foreground">Name it, set a goal and monthly amount</p>
                                    </div>
                                </div>
                                <div className="ml-3.5 w-0.5 h-5 bg-[#EEEDFE]" />

                                <div className="flex gap-3 items-start">
                                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#3C3489] text-white text-xs font-semibold mt-0.5">3</div>
                                    <div>
                                        <p className="text-sm font-medium text-foreground">Start contributing</p>
                                        <p className="text-xs text-muted-foreground">Track progress and lend to your community</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 justify-center">
                                <Link
                                    href={signUpPagePath()}
                                    className="flex items-center gap-1.5 rounded-full border-[1.5px] border-[#3C3489] bg-[#3C3489] px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
                                >
                                    Create free account
                                </Link>
                                <Link
                                    href={signInPagePath()}
                                    className="flex items-center gap-1.5 rounded-full border-[1.5px] border-border px-5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                                >
                                    Sign in
                                </Link>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex flex-col flex-1">
                    <section
                        className="mt-20 py-6 flex flex-col gap-3 overflow-hidden max-w-6xl mx-auto"
                        style={{
                            maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                            WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                        }}
                    >
                        <div className="marquee-left flex gap-3" style={{ width: "max-content" }}>
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
                        <div className="marquee-right flex gap-3" style={{ width: "max-content" }}>
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
                                Join the community and take control of your finances — one fund at a time.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                            {user ? (
                                <>
                                    <Link
                                        href={savingsPath()}
                                        className="px-6 py-3 rounded-xl bg-background text-foreground font-semibold text-sm hover:bg-background/90 transition-colors text-center"
                                    >
                                        My savings
                                    </Link>
                                    <Link
                                        href={loansPagePath()}
                                        className="px-6 py-3 rounded-xl border border-background/20 text-background font-semibold text-sm hover:bg-white/10 transition-colors text-center"
                                    >
                                        My loans
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href={signUpPagePath()}
                                        className="px-6 py-3 rounded-xl bg-background text-foreground font-semibold text-sm hover:bg-background/90 transition-colors text-center"
                                    >
                                        Get started
                                    </Link>
                                    <Link
                                        href={signInPagePath()}
                                        className="px-6 py-3 rounded-xl border border-background/20 text-background font-semibold text-sm hover:bg-white/10 transition-colors text-center"
                                    >
                                        Sign in
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeClient;