import { useEffect, useState } from "react";
import zxcvbn from "zxcvbn";

type PasswordStrengthMeterProps = {
    password: string;
};

const STRENGTH_LABELS = ["Very weak", "Weak", "Fair", "Good", "Strong"];

const STRENGTH_COLORS = [
    "#A32D2D",
    "#993C1D",
    "#854F0B",
    "#3B6D11",
    "#0F6E56",
];

const PasswordStrengthMeter = ({ password }: PasswordStrengthMeterProps) => {
    const [strength, setStrength] = useState<{
        score: number;
        feedback: { suggestions: string[] };
    } | null>(null);

    useEffect(() => {
        if (password) {
            setStrength(zxcvbn(password));
        } else {
            setStrength(null);
        }
    }, [password]);

    if (!strength) return null;

    const { score, feedback } = strength;
    const label = STRENGTH_LABELS[score];
    const color = STRENGTH_COLORS[score];
    const suggestion = feedback?.suggestions?.[0];

    return (
        <div className="mt-2 flex flex-col gap-1.5">
            <div className="flex gap-1">
                {[0, 1, 2, 3].map((segment) => (
                    <div
                        key={segment}
                        className="h-1 flex-1 rounded-full bg-muted transition-colors duration-200"
                        style={{
                            backgroundColor: segment <= score ? color : undefined,
                        }}
                    />
                ))}
            </div>

            <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                    Password strength: <span style={{ color }}>{label}</span>
                </p>
            </div>

            {suggestion && (
                <p className="text-xs text-muted-foreground">{suggestion}</p>
            )}
        </div>
    );
};

export default PasswordStrengthMeter;