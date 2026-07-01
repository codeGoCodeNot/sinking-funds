"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { PasswordInput } from "../../utils/password-input";
import { forgotPasswordPagePath, signUpPagePath, savingsPath } from "@/path";
import { LucideLoaderCircle, LucideLogIn, LucidePiggyBank } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SignInProviderForm from "./sign-in-provider-form";
import signInAction from "../actions/sign";

const SignInForm = () => {
    const router = useRouter();
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setIsPending(true);

        const formData = new FormData(e.currentTarget);
        const { error } = await signInAction(
            formData.get("email") as string,
            formData.get("password") as string,
        );

        setIsPending(false);

        if (error) {
            setError(error.message ?? "Invalid email or password");
            return;
        }

        router.push(savingsPath());
        router.refresh();
    };

    return (
        <div className="relative w-full max-w-sm">
            <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-3xl bg-[#3C3489]/10" />
            <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-3xl bg-[#3C3489]/20" />

            <div className="relative rounded-3xl bg-card border border-border/60 shadow-[0_24px_48px_-12px_rgba(60,52,137,0.25)] px-8 pt-12 pb-8">
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#3C3489] shadow-lg shadow-[#3C3489]/30">
                    <LucidePiggyBank className="size-6 text-white" />
                </div>

                <div className="flex flex-col items-center gap-y-1 text-center mb-8">
                    <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
                    <p className="text-sm text-muted-foreground">
                        Sign in to keep tracking your funds.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
                    <div className="grid gap-1.5">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    <div className="grid gap-1.5">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">Password</Label>
                            <Link
                                href={forgotPasswordPagePath()}
                                className="text-xs text-muted-foreground hover:underline underline-offset-4"
                            >
                                Forgot password?
                            </Link>
                        </div>
                        <PasswordInput
                            id="password"
                            name="password"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {error && <p className="text-sm text-red-500">{error}</p>}

                    <Button
                        type="submit"
                        className="w-full mt-2 bg-[#3C3489] hover:bg-[#3C3489]/90 text-white"
                        disabled={isPending}
                    >
                        {isPending && <LucideLoaderCircle className="animate-spin" />}
                        Sign in
                    </Button>
                </form>

                <div className="relative my-6">
                    <Separator />
                    <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
                        or
                    </span>
                </div>

                <SignInProviderForm />

                <p className="text-sm text-muted-foreground mt-6 text-center">
                    Don't have an account?{" "}
                    <Link
                        href={signUpPagePath()}
                        className="font-medium text-foreground hover:underline underline-offset-4"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignInForm;