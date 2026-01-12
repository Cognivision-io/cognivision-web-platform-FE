"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";

const PURPLE = "#5b2fe8";

const navItems = [
  { label: "About", href: "/about" },
  { label: "Solutions", href: "/solutions/wgts", hasDropdown: true },
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "/help" },
  { label: "Contact", href: "/contact-us" },
];

const solutionsItems = [
  { label: "WGTS", href: "/solutions/wgts" },
  { label: "TableAr", href: "/solutions/tablear" },
];

function cn(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSolutionsOpen, setIsMobileSolutionsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMobileSolutionsOpen(false);
  }, [pathname]);

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

            if (item.hasDropdown) {
              const solutionsActive =
                pathname === "/solutions/wgts" || pathname === "/solutions/tablear";

              return (
                <div key={item.href} className="relative group">
                  <Link
                    href={item.href}
                    className={cn(
                      "inline-flex items-center gap-1.5",
                      "text-[15px] font-medium tracking-wide",
                      "transition-colors duration-150",
                      solutionsActive ? "font-semibold" : "hover:text-black",
                      solutionsActive ? "text-[#5b2fe8]" : "text-[#111827]"
                    )}
                    style={solutionsActive ? { color: PURPLE } : undefined}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform duration-150",
                        "opacity-80 group-hover:opacity-100 group-focus-within:opacity-100",
                        "group-hover:rotate-180 group-focus-within:rotate-180"
                      )}
                    />
                  </Link>

                  <div
                    className={cn(
                      "pointer-events-none absolute left-1/2 top-full z-50 mt-3 w-[220px] -translate-x-1/2 rounded-xl border border-black/10 bg-white p-2 shadow-[0_20px_60px_rgba(17,24,39,0.14)]",
                      "opacity-0 translate-y-1 transition-[opacity,transform] duration-150",
                      "group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0",
                      "group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0"
                    )}
                  >
                    {solutionsItems.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        className={cn(
                          "flex items-center justify-between rounded-lg px-3 py-2.5 text-[14px] font-medium text-[#111827]",
                          "hover:bg-black/[0.04]"
                        )}
                      >
                        <span>{s.label}</span>
                        <span className="text-[12px] text-[#111827]/50">
                          /solutions
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

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
        <div className="flex justify-end items-center gap-3">
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

          <button
            type="button"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            className={cn(
              "lg:hidden",
              "grid h-10 w-10 place-items-center rounded-lg border border-black/10 bg-white/80 backdrop-blur",
              "hover:bg-white"
            )}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5 text-[#111827]" />
            ) : (
              <Menu className="h-5 w-5 text-[#111827]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen ? (
        <div className="lg:hidden fixed inset-0 z-50">
          <button
            type="button"
            aria-label="Close menu overlay"
            className="absolute inset-0 bg-black/30"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div className="absolute right-0 top-0 h-full w-[340px] max-w-[86vw] bg-white shadow-[0_30px_90px_rgba(0,0,0,0.25)]">
            <div className="flex h-[78px] items-center justify-between border-b border-black/10 px-5">
              <Link
                href="/"
                className="flex items-center gap-3"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <img
                  src="/logo-text-black.svg"
                  alt="CogniVision.io"
                  className="h-8 w-auto select-none"
                  draggable={false}
                />
              </Link>

              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setIsMobileMenuOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-lg border border-black/10"
              >
                <X className="h-5 w-5 text-[#111827]" />
              </button>
            </div>

            <div className="px-5 py-6">
              <div className="space-y-2">
                <Link
                  href="/about"
                  className="block rounded-lg px-3 py-3 text-[15px] font-medium text-[#111827] hover:bg-black/[0.04]"
                >
                  About
                </Link>

                <div className="rounded-lg border border-black/10">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between px-3 py-3 text-[15px] font-medium text-[#111827]"
                    onClick={() => setIsMobileSolutionsOpen((v) => !v)}
                  >
                    <span>Solutions</span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform duration-150",
                        isMobileSolutionsOpen ? "rotate-180" : ""
                      )}
                    />
                  </button>

                  {isMobileSolutionsOpen ? (
                    <div className="border-t border-black/10 p-2">
                      {solutionsItems.map((s) => (
                        <Link
                          key={s.href}
                          href={s.href}
                          className="block rounded-lg px-3 py-2.5 text-[14px] font-medium text-[#111827] hover:bg-black/[0.04]"
                        >
                          {s.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>

                <Link
                  href="/pricing"
                  className="block rounded-lg px-3 py-3 text-[15px] font-medium text-[#111827] hover:bg-black/[0.04]"
                >
                  Pricing
                </Link>

                <Link
                  href="/docs"
                  className="block rounded-lg px-3 py-3 text-[15px] font-medium text-[#111827] hover:bg-black/[0.04]"
                >
                  Docs
                </Link>

                <Link
                  href="/contact-us"
                  className="block rounded-lg px-3 py-3 text-[15px] font-medium text-[#111827] hover:bg-black/[0.04]"
                >
                  Contact
                </Link>
              </div>

              <div className="mt-6">
                <Link
                  href="/register"
                  className={cn(
                    "flex h-[46px] w-full items-center justify-center rounded-lg",
                    "text-[14px] font-semibold text-white",
                    "shadow-[0_10px_18px_rgba(91,47,232,0.22)]"
                  )}
                  style={{ backgroundColor: PURPLE }}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
