"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

const navItems = [
  { label: "About us", href: "/about-us", highlight: true },
  { label: "Use Cases", href: "/use-case", highlight: true },
  { label: "Docs", href: "/#docs", highlight: false },
  { label: "Contact", href: "/contact-us", highlight: true },
];

const Header = () => {
  const pathname = usePathname();
  const navLinkBase =
    "transition-opacity hover:opacity-80 text-[13px] font-medium";

  return (
    <header className="relative w-full bg-white">
      {/* Purple vector background – only on laptops/desktop */}
      <img
        src="/Vector.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[78%] object-cover lg:block"
      />

      <div className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-0 lg:py-5">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          {/* render the svg here logo black text */}
          <img
            src="/logo-black-text.svg"
            alt="Company Logo"
            className="h-9 w-auto"
          />
        </Link>

        {/* Right side – nav + CTA */}
        <div className="flex items-center gap-6">
          {/* Nav (hidden on small screens) */}
          <nav className="hidden items-center gap-8 text-white lg:flex">
            {navItems.map((item) => {
              const basePath = item.href.split("#")[0] || "/";
              const isAnchor = item.href.includes("#");
              const isActive = !isAnchor && pathname === basePath;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${navLinkBase} ${
                    item.highlight && isActive
                      ? "font-semibold underline underline-offset-[6px]"
                      : isActive
                      ? "opacity-100"
                      : ""
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Get Started CTA */}
          <Link
            href="/register"
            className="inline-flex items-center gap-3 rounded-full bg-white px-5 py-2.5 text-[13px] font-semibold text-black shadow-[0_12px_26px_rgba(0,0,0,0.18)]"
          >
            <span>Get Started</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
