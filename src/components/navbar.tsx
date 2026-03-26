
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHomePage = pathname === "/";
  const isTransparent = isHomePage && !scrolled && !isOpen;
  const textColor = isTransparent ? "text-white" : "text-black";

  const navLinks = [
    { name: "BUY", href: "/search?type=buy" },
    { name: "RENT", href: "/search?type=rent" },
    { name: "SOLD", href: "/search?type=sold" },
    { name: "ABOUT US", href: "/about" },
    { name: "FIND AN AGENT", href: "/find-an-agent" },
    { name: "COMMERCIAL", href: "/search?type=commercial" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-[100] transition-all duration-300 px-6 py-4 flex items-center justify-between",
        (scrolled || !isHomePage) ? "bg-white/90 shadow-sm py-3" : "bg-transparent"
      )}
    >
      <Link href="/" className="z-[110]">
        <span className={cn("font-headline font-extrabold text-2xl tracking-tighter transition-colors duration-300", textColor)}>
          AETHER<span className="text-primary">.</span>
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-8 z-[110]">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={cn("text-xs font-bold tracking-widest hover:text-primary transition-colors duration-300", textColor)}
          >
            {link.name}
          </Link>
        ))}
        <Link href="/contact">
          <Button 
            variant="outline" 
            className={cn(
              "border-2 font-bold px-6 transition-all duration-300",
              isTransparent 
                ? "border-white text-white bg-transparent hover:bg-white hover:text-black" 
                : "border-black text-black bg-transparent hover:bg-black hover:text-white"
            )}
          >
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
          <Menu className={cn("w-8 h-8 transition-colors duration-300", textColor)} />
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
            <Link href="/find-an-agent" onClick={() => setIsOpen(false)}>
              <Button className="bg-primary hover:bg-primary/90 text-white font-bold py-6 px-12 text-xl w-full">
                FIND AN AGENT
              </Button>
            </Link>
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
