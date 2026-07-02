"use client";

import { signOut } from "@/lib/auth-client";
import { signInPagePath } from "@/path";
import { LucideLoaderCircle, LucideLogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const SignOutItem = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        setLoading(true);
        try {
            const { error } = await signOut();
            if (error) {
                toast.error("Failed to sign out. Please try again.");
            } else {
                toast.success("Signed out successfully.");
                router.push(signInPagePath());
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleLogout}
            disabled={loading}
            className="flex items-center gap-x-1.5 rounded-full border-[1.5px] border-[#3C3489] bg-[#3C3489] px-4 py-1.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
        >
            {loading ? (
                <LucideLoaderCircle className="size-3.5 animate-spin text-[#AFA9EC]" />
            ) : (
                <LucideLogOut className="size-3.5 text-[#AFA9EC]" />
            )}
            Sign out
        </button>
    );
};

export default SignOutItem;