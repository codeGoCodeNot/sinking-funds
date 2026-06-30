import { LucideBanknote, LucidePiggyBank, LucideTrendingUp, LucideUsers } from "lucide-react";

const features = [
    { icon: LucideBanknote, label: "Track every contribution to the day" },
    { icon: LucideTrendingUp, label: "Watch interest grow as loans repay" },
    { icon: LucideUsers, label: "Built for funds you save with others" },
];

type SplitAuthLayoutProps = {
    children: React.ReactNode;
};

const SplitAuthLayout = ({ children }: SplitAuthLayoutProps) => {
    return (
        <div className="flex flex-1 min-h-screen">
            <div className="hidden lg:flex w-[42%] flex-col justify-between bg-[#3C3489] text-white px-12 py-14">
                <div className="flex items-center gap-2 text-sm tracking-[0.15em] uppercase font-semibold">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
                        <LucidePiggyBank className="size-4" />
                    </span>
                    Sinking
                </div>

                <div className="flex flex-col gap-y-8">
                    <h2 className="text-3xl font-bold leading-tight">
                        Save smart.
                        <br />
                        Lend with purpose.
                    </h2>
                    <div className="flex flex-col gap-y-4">
                        {features.map(({ icon: Icon, label }) => (
                            <div key={label} className="flex items-center gap-3">
                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10">
                                    <Icon className="size-4" />
                                </span>
                                <p className="text-sm text-white/80">{label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <p className="text-xs text-white/50">
                    A sinking fund for the things you're planning together.
                </p>
            </div>

            <div className="flex flex-1 items-center justify-center px-6 py-16 bg-background">
                {children}
            </div>
        </div>
    );
};

export default SplitAuthLayout;