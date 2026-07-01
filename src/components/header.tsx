"use client";

import { homePagePath, signInPagePath, signUpPagePath } from "@/path";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LucideArrowRight, LucidePiggyBank, LucideUser } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full bg-white/80 backdrop-blur-sm z-10 transition-all duration-200 ${scrolled ? "border-b border-border" : ""
        }`}
    >
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href={homePagePath()} className="flex items-center gap-2">
          <div className="flex h-[34px] w-[34px] items-center justify-center rounded-[9px] bg-[#3C3489]">
            <LucidePiggyBank className="size-[18px] text-white" />
          </div>
          <span className="text-[15px] font-bold uppercase tracking-[0.1em]">
            <span className="text-[#3C3489]">Sink</span>ing
          </span>
        </Link>

        <nav className="flex items-center gap-1.5">
          <Link
            href={signInPagePath()}
            className="flex items-center gap-1.5 rounded-full border-[1.5px] border-border px-4 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            <LucideUser className="size-3.5 text-muted-foreground" />
            Sign in
          </Link>
          <Link
            href={signUpPagePath()}
            className="flex items-center gap-1.5 rounded-full border-[1.5px] border-[#3C3489] bg-[#3C3489] px-4 py-1.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Get started
            <LucideArrowRight className="size-3.5 text-[#AFA9EC]" />
          </Link>
        </nav>
      </div>
    </header>
  );
}