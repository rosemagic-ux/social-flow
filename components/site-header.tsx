"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Caught up" },
  { href: "/reels", label: "Shared Reels" },
];

export function SiteHeader() {
  const pathname = usePathname();

  if (pathname?.startsWith("/embed")) {
    return null;
  }

  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-6">
      <p className="text-[13px] font-medium tracking-tight text-ink">
        Rose · Product design
      </p>
      <nav className="flex items-center gap-4 text-[13px]">
        {links.map((link) => {
          const active =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "transition-colors",
                active ? "text-ink" : "text-plum hover:text-ink"
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
