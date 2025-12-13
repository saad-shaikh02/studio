"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import AppIcon from "@/app/icon.svg";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Siren } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";


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
          <Link href="/" className="mr-6 flex items-center space-x-2 transition-transform duration-300 ease-in-out hover:scale-105 group">
            <Image src={AppIcon} alt="Reunite logo" width={24} height={24} className="text-primary" />
            <span className="font-bold font-headline text-lg group-hover:text-foreground">Reunite</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-all duration-300 ease-in-out hover:scale-110 hover:text-foreground",
                  pathname === link.href ? "text-foreground" : "text-foreground/60"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                 <Button asChild variant="destructive" size="icon">
                  <a href="tel:911">
                    <Siren className="h-5 w-5" />
                    <span className="sr-only">Emergency Call</span>
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Contact Local Authorities</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </header>
  );
}
