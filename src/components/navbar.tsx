
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "BUY", href: "/search?type=buy" },
    { name: "RENT", href: "/search?type=rent" },
    { name: "SOLD", href: "/search?type=sold" },
    { name: "INSIGHTS", href: "/insights" },
    { name: "FIND AN AGENT", href: "#" },
    { name: "PORTALS", href: "/portals" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-[100] transition-all duration-300 px-6 py-4 flex items-center justify-between",
        scrolled ? "bg-white/90 shadow-sm py-3" : "bg-transparent"
      )}
    >
      <Link href="/" className="z-[110]">
        <span className="font-headline font-extrabold text-2xl tracking-tighter text-black">
          AETHER<span className="text-primary">.</span>
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-8 z-[110]">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="text-xs font-bold tracking-widest text-black hover:text-primary transition-colors"
          >
            {link.name}
          </Link>
        ))}
        <Button variant="ghost" size="icon" className="text-black">
          <Search className="w-5 h-5" />
        </Button>
        <Link href="/contact">
          <Button variant="outline" className={cn(
            "border-2 font-bold px-6",
            !scrolled && !isOpen 
              ? "border-black text-black bg-white hover:bg-white/90" 
              : "border-black text-black hover:bg-black hover:text-white"
          )}>
            CONTACT US
          </Button>
        </Link>
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden z-[110] p-2 focus:outline-none"
      >
        {isOpen ? (
          <X className="w-8 h-8 text-black" />
        ) : (
          <Menu className="w-8 h-8 text-black" />
        )}
      </button>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 bg-white z-[105] flex flex-col items-center justify-center transition-all duration-500 ease-in-out",
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        )}
      >
        <div className="flex flex-col gap-8 text-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-4xl font-headline font-bold text-black hover:text-primary transition-all"
            >
              {link.name}
            </Link>
          ))}
          <div className="mt-8 flex flex-col gap-4">
            <Button className="bg-primary hover:bg-primary/90 text-white font-bold py-6 px-12 text-xl">
              FIND AN AGENT
            </Button>
            <Link href="/contact" onClick={() => setIsOpen(false)}>
              <Button variant="outline" className="border-black text-black font-bold py-6 px-12 text-xl w-full">
                CONTACT US
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
