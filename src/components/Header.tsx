// components/layout/Header.tsx

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

const Header: React.FC = () => {
  const navLinkBase =
    "transition-opacity hover:opacity-80 text-[13px] font-medium";

  return (
    <header className="relative w-full bg-white">
      {/* Purple vector background – only on laptops/desktop */}
      <img
        src="/public/Vector.png" // your purple PNG in public/assets
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[78%] object-cover lg:block"
      />

      <div className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-0 lg:py-5">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#f3f0ff] shadow-sm">
            {/* Replace with your real logo image if you have one */}
            <span className="text-[18px] font-semibold text-[#4f46e5]">⌘</span>
          </div>
          <span className="text-[20px] font-semibold tracking-tight text-black">
            CogniVision.io
          </span>
        </Link>

        {/* Right side – nav + CTA */}
        <div className="flex items-center gap-6">
          {/* Nav (hidden on small screens) */}
          <nav className="hidden items-center gap-8 text-white lg:flex">
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `${navLinkBase} ${isActive ? "opacity-100" : ""}`
              }
            >
              About us
            </NavLink>

            <NavLink
              to="/use-cases"
              className={({ isActive }) =>
                `${navLinkBase} ${isActive ? "opacity-100" : ""}`
              }
            >
              Use Cases
            </NavLink>

            <NavLink
              to="/docs"
              className={({ isActive }) =>
                `${navLinkBase} ${isActive ? "opacity-100" : ""}`
              }
            >
              Docs
            </NavLink>

            {/* Contact – active route gets underline */}
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `${navLinkBase} ${
                  isActive
                    ? "font-semibold underline underline-offset-[6px]"
                    : ""
                }`
              }
            >
              Contact
            </NavLink>
          </nav>

          {/* Get Started CTA */}
          <Link
            to="/get-started"
            className="inline-flex items-center gap-3 rounded-full bg-white px-5 py-2.5 text-[13px] font-semibold text-black shadow-[0_12px_26px_rgba(0,0,0,0.18)]"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4f46e5] text-white">
              <ArrowUpRight size={16} />
            </span>
            <span>Get Started</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
