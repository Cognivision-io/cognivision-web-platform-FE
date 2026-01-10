"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

const PURPLE = "#5b2fe8";

const navItems = [
  { label: "About", href: "/about" },
  { label: "Solutions", href: "/solutions", hasDropdown: true },
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "/docs" },
  { label: "Contact", href: "/contact-us" },
];

function cn(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    const base = href.split("#")[0] || "/";
    return pathname === base;
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-[background-color,box-shadow,border-color] duration-200",
        isScrolled
          ? "bg-white/90 backdrop-blur border-b border-black/5 shadow-[0_6px_20px_rgba(17,24,39,0.06)]"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto grid h-[78px] max-w-6xl grid-cols-[auto_1fr_auto] items-center px-5 sm:px-6 lg:px-0">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-3">
          {/* use your exact logo asset */}
          <img
            src="/logo-text-black.svg"
            alt="CogniVision.io"
            className="h-9 w-auto select-none"
            draggable={false}
          />
        </Link>

        {/* Center: Nav */}
        <nav className="hidden items-center justify-center gap-10 lg:flex">
          {navItems.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "inline-flex items-center gap-1.5",
                  "text-[15px] font-medium tracking-wide",
                  "transition-colors duration-150",
                  active ? "font-semibold" : "hover:text-black",
                  active ? "text-[#5b2fe8]" : "text-[#111827]"
                )}
                style={active ? { color: PURPLE } : undefined}
              >
                <span>{item.label}</span>
                {item.hasDropdown && (
                  <ChevronDown
                    className={cn(
                      "h-4 w-4",
                      active ? "opacity-100" : "opacity-80"
                    )}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right: CTA */}
        <div className="flex justify-end">
          <Link
            href="/register"
            className={cn(
              "inline-flex items-center justify-center",
              "rounded-lg",
              "px-5 py-2.5",
              "text-[14px] font-semibold text-white",
              "shadow-[0_10px_18px_rgba(91,47,232,0.22)]",
              "transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0"
            )}
            style={{ backgroundColor: PURPLE }}
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
