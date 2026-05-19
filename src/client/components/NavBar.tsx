"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavBar() {
  const path = usePathname();

  return (
    <nav
      className="sticky top-0 z-40 w-full"
      style={{ background: "rgba(220,232,244,0.88)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(42,80,130,0.18)" }}
    >
      <div className="mx-auto max-w-6xl px-4 h-11 flex items-center justify-between">
        <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-mist/40">
          Fossilized
        </span>
        <div className="flex gap-6">
          {[
            { href: "/", label: "Feed" },
            { href: "/calendar", label: "Calendar" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-[12px] font-medium tracking-wide transition-colors ${
                path === href ? "text-mist/90" : "text-mist/35 hover:text-mist/65"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
