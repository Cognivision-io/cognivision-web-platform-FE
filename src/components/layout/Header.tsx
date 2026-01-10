"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

const navItems = [
  { label: "Use Cases", href: "/use-case", hasDropdown: true },
  { label: "About Us", href: "/about-us" },
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "/#docs", isAnchor: true },
  { label: "Contact", href: "/contact-us" },
];

export default function Header() {
  const pathname = usePathname();

  const isActive = (href: string, isAnchor?: boolean) => {
    if (isAnchor) return false;
    const base = href.split("#")[0] || "/";
    return pathname === base;
  };

  return (
    <header className="relative w-full overflow-hidden bg-white">
      <div className="absolute inset-x-0 top-0 h-px bg-black/10" />

      {/* Purple wave background */}
      <img
        src="/Vector.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[80%] object-cover lg:block"
      />

      {/* ✅ 3-column grid: left logo, center nav, right CTA */}
      <div className="relative z-10 mx-auto grid h-[92px] max-w-6xl grid-cols-[auto_1fr_auto] items-center px-5 sm:px-6 lg:px-0">
        {/* Left: Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/logo-black-text.svg"
              alt="CogniVision.io"
              className="h-9 w-auto"
            />
          </Link>
        </div>

        {/* Center: NAV (true center) */}
        <div className="flex justify-center">
          <nav className="hidden items-center gap-10 text-white lg:flex">
            {navItems.map((item) => {
              const active = isActive(item.href, item.isAnchor);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "group inline-flex items-center gap-2",
                    "text-[14px] font-bold tracking-wide",
                    "transition-opacity hover:opacity-90",
                    active ? "underline underline-offset-[10px]" : "",
                  ].join(" ")}
                >
                  <span>{item.label}</span>
                  {item.hasDropdown && (
                    <ChevronDown className="h-4 w-4 opacity-90" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right: CTA */}
        <div className="flex justify-end">
          <Link
            href="/register"
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-2.5 text-[14px] font-semibold text-black shadow-[0_14px_28px_rgba(0,0,0,0.25)] transition-transform duration-150 hover:-translate-y-0.5"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
