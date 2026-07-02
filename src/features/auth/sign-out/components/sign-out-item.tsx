"use client";

import { signOut } from "@/lib/auth-client";
import { homePagePath } from "@/path";
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
                router.push(homePagePath());
                router.refresh();
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleLogout}
            disabled={loading}
            className="flex items-center gap-2 w-full text-sm text-red-500 hover:text-red-600 disabled:opacity-60"
        >
            {loading ? (
                <LucideLoaderCircle className="size-4 animate-spin" />
            ) : (
                <LucideLogOut className="size-4" />
            )}
            Sign out
        </button>
    );
};

export default SignOutItem;