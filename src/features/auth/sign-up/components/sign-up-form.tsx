"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/features/auth/utils/password-input";
import { LucideLoaderCircle, LucidePiggyBank } from "lucide-react";
import Link from "next/link";
import { useActionState, useState } from "react";
import { EMPTY_ACTION_STATE } from "@/lib/to-action-state";
import { forgotPasswordPagePath, signInPagePath } from "@/path";
import PasswordStrengthMeter from "../../utils/password-strength-meter";
import signUp from "../actions/sign-up";

const SignUpForm = () => {
    const [actionState, action, isPending] = useActionState(
        signUp,
        EMPTY_ACTION_STATE,
    );
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    return (
        <div className="relative w-full max-w-sm">
            <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-3xl bg-[#3C3489]/10" />
            <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-3xl bg-[#3C3489]/20" />

            <div className="relative rounded-3xl bg-card border border-border/60 shadow-[0_24px_48px_-12px_rgba(60,52,137,0.25)] px-8 pt-12 pb-8">
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#3C3489] shadow-lg shadow-[#3C3489]/30">
                    <LucidePiggyBank className="size-6 text-white" />
                </div>

                <div className="flex flex-col items-center gap-y-1 text-center mb-8">
                    <h1 className="text-2xl font-bold tracking-tight">Create your account</h1>
                    <p className="text-sm text-muted-foreground">
                        Start tracking your sinking funds in minutes.
                    </p>
                </div>

                <form action={action} className="flex flex-col gap-y-4">
                    <div className="grid gap-1.5">
                        <Label htmlFor="name">Full name</Label>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Juan Dela Cruz"
                            defaultValue={actionState.payload?.get("name") as string}
                            required
                        />
                        <p className="text-sm text-red-500">
                            {actionState.fieldErrors?.["name"]?.[0]}
                        </p>
                    </div>

                    <div className="grid gap-1.5">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            defaultValue={actionState.payload?.get("email") as string}
                            required
                        />
                        <p className="text-sm text-red-500">
                            {actionState.fieldErrors?.["email"]?.[0]}
                        </p>
                    </div>

                    <div className="grid gap-1.5">
                        <Label htmlFor="password">Password</Label>
                        <PasswordInput
                            id="password"
                            name="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <p className="text-sm text-red-500">
                            {actionState.fieldErrors?.["password"]?.[0]}
                        </p>
                        <PasswordStrengthMeter password={password} />
                    </div>

                    <div className="grid gap-1.5">
                        <Label htmlFor="confirm-password">Confirm password</Label>
                        <PasswordInput
                            id="confirm-password"
                            name="confirmPassword"
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <p className="text-sm text-red-500">
                            {actionState.fieldErrors?.["confirmPassword"]?.[0]}
                        </p>
                    </div>

                    {actionState.status === "ERROR" && actionState.message && (
                        <p className="text-sm text-red-500">{actionState.message}</p>
                    )}

                    <Button
                        type="submit"
                        className="w-full mt-2 bg-[#3C3489] hover:bg-[#3C3489]/90 text-white"
                        disabled={isPending}
                    >
                        {isPending && <LucideLoaderCircle className="animate-spin" />}
                        Create account
                    </Button>
                </form>

                <div className="flex flex-col gap-y-2 text-sm text-muted-foreground mt-6 text-center">
                    <p>
                        Already have an account?{" "}
                        <Link
                            href={signInPagePath()}
                            className="font-medium text-foreground hover:underline underline-offset-4"
                        >
                            Sign in
                        </Link>
                    </p>
                    <Link
                        href={forgotPasswordPagePath()}
                        className="hover:underline underline-offset-4 mx-auto"
                    >
                        Forgot password?
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignUpForm;