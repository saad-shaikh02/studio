"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import AppIcon from "@/app/icon.svg";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/search", label: "Search Cases" },
    { href: "/report", label: "Report a Sighting" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image src={AppIcon} alt="Reunite logo" width={24} height={24} className="text-primary" />
            <span className="font-bold font-headline text-lg">Reunite</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname === link.href ? "text-foreground" : "text-foreground/60"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end">
          {/* Future auth button can go here */}
        </div>
      </div>
    </header>
  );
}
