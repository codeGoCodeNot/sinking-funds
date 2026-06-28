"use client";

import { homePagePath } from "@/path";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full bg-white/80 backdrop-blur-sm z-10 transition-all duration-200 ${
        scrolled ? "border-b border-border" : ""
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          href={homePagePath()}
          className="text-base tracking-[0.15em] uppercase font-semibold"
        >
          Sinking
        </Link>
        <nav className="flex items-center gap-6 text-sm text-zinc-500"></nav>
      </div>
    </header>
  );
}
