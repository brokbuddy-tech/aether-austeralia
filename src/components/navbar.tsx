"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { getSiteConfig } from "@/lib/public-site";
import { prefixAgencyPath, resolveAgencySlugFromPathname } from "@/lib/agency-routing";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [brandName, setBrandName] = useState("AETHER");
  const [brandLogo, setBrandLogo] = useState<string | null>(null);
  const pathname = usePathname();
  const agencySlug = resolveAgencySlugFromPathname(pathname);
  const currentPath = agencySlug ? pathname.replace(`/${agencySlug}`, "") || "/" : pathname;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let active = true;

    async function loadSiteConfig() {
      const siteConfig = await getSiteConfig(agencySlug);
      if (!active) return;
      setBrandName(siteConfig.branding?.displayName || siteConfig.organization.name || "AETHER");
      setBrandLogo(siteConfig.profile?.logo || null);
    }

    void loadSiteConfig();
    return () => {
      active = false;
    };
  }, [agencySlug]);

  const isHomePage = currentPath === "/";
  const isTransparent = isHomePage && !scrolled && !isOpen;
  const textColor = isTransparent ? "text-white" : "text-black";

  const navLinks = [
    { name: "BUY", href: "/search?type=buy" },
    { name: "RENT", href: "/search?type=rent" },
    { name: "SOLD", href: "/search?type=sold" },
    { name: "ABOUT US", href: "/about" },
    { name: "AGENTS", href: "/agents" },
    { name: "COMMERCIAL", href: "/search?type=commercial" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-[100] transition-all duration-300 px-6 py-4 flex items-center justify-between",
        (scrolled || !isHomePage) ? "bg-white/90 shadow-sm py-3" : "bg-transparent"
      )}
    >
      <Link href={prefixAgencyPath("/", agencySlug)} className="z-[110] flex items-center gap-3">
        {brandLogo ? (
          <span className="relative h-10 w-10 overflow-hidden rounded-full border border-black/10 bg-white">
            <Image
              src={brandLogo}
              alt={`${brandName} logo`}
              fill
              className="object-contain p-1.5"
              sizes="40px"
            />
          </span>
        ) : (
          <span className="h-3 w-3 rounded-full bg-primary" />
        )}
        <span className={cn("font-headline font-extrabold text-2xl tracking-tighter transition-colors duration-300", textColor)}>
          {brandName}<span className="text-primary">.</span>
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-8 z-[110]">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={prefixAgencyPath(link.href, agencySlug)}
            className={cn("text-xs font-bold tracking-widest hover:text-primary transition-colors duration-300", textColor)}
          >
            {link.name}
          </Link>
        ))}
        <Link href={prefixAgencyPath("/contact", agencySlug)}>
          <Button 
            variant="outline" 
            className={cn(
              "border-2 font-bold px-6 transition-all duration-300 hover:bg-primary hover:text-white hover:border-primary",
              isTransparent 
                ? "border-white text-white bg-transparent" 
                : "border-black text-black bg-transparent"
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
              href={prefixAgencyPath(link.href, agencySlug)}
              onClick={() => setIsOpen(false)}
              className="text-4xl font-headline font-bold text-black hover:text-primary transition-all"
            >
              {link.name}
            </Link>
          ))}
          <div className="mt-8 flex flex-col gap-4">
            <Link href={prefixAgencyPath("/agents", agencySlug)} onClick={() => setIsOpen(false)}>
              <Button className="bg-primary hover:bg-primary/90 text-white font-bold py-6 px-12 text-xl w-full rounded-none">
                AGENTS
              </Button>
            </Link>
            <Link href={prefixAgencyPath("/contact", agencySlug)} onClick={() => setIsOpen(false)}>
              <Button 
                variant="outline" 
                className="border-black text-black font-bold py-6 px-12 text-xl w-full rounded-none hover:bg-primary hover:text-white hover:border-primary transition-all"
              >
                CONTACT US
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
