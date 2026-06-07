"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { getSiteConfig, hasMeaningfulSiteConfig, type SiteConfig } from "@/lib/public-site";
import { prefixAgencyPath, resolveAgencySlugFromPathname } from "@/lib/agency-routing";

function getDisplayName(siteConfig?: SiteConfig | null) {
  return siteConfig?.branding?.displayName || siteConfig?.organization.name || "Agency Website";
}

export default function Navbar({ initialSiteConfig }: { initialSiteConfig?: SiteConfig | null }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [brandName, setBrandName] = useState(() => getDisplayName(initialSiteConfig));
  const [brandLogo, setBrandLogo] = useState<string | null>(initialSiteConfig?.profile?.logo || null);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const agencySlug = resolveAgencySlugFromPathname(pathname);
  const currentPath = agencySlug ? pathname.replace(`/${agencySlug}`, "") || "/" : pathname;
  const desktopNavRef = useRef<HTMLDivElement | null>(null);
  const desktopLinkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setBrandName(getDisplayName(initialSiteConfig));
    setBrandLogo(initialSiteConfig?.profile?.logo || null);
  }, [initialSiteConfig]);

  useEffect(() => {
    let active = true;

    async function loadSiteConfig() {
      try {
        const siteConfig = await getSiteConfig(agencySlug);
        if (!active) return;
        if (!hasMeaningfulSiteConfig(siteConfig)) return;
        setBrandName(getDisplayName(siteConfig));
        setBrandLogo(siteConfig.profile?.logo || null);
      } catch {
        if (!active) return;
        setBrandName((current) => current || getDisplayName(initialSiteConfig));
        setBrandLogo((current) => current ?? initialSiteConfig?.profile?.logo ?? null);
      }
    }

    void loadSiteConfig();
    return () => {
      active = false;
    };
  }, [agencySlug, initialSiteConfig]);

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
  const isNavLinkActive = (href: string) => {
    const [hrefPath, hrefQuery = ""] = href.split("?");
    if (currentPath !== hrefPath && !(hrefPath !== "/" && currentPath.startsWith(`${hrefPath}/`))) {
      return false;
    }

    if (!hrefQuery) {
      return true;
    }

    const hrefParams = new URLSearchParams(hrefQuery);
    for (const [key, value] of hrefParams.entries()) {
      if (searchParams.get(key) !== value) {
        return false;
      }
    }

    return true;
  };
  const activeNavName = navLinks.find((link) => isNavLinkActive(link.href))?.name;
  const [activeUnderline, setActiveUnderline] = useState<{ left: number; width: number } | null>(null);

  useEffect(() => {
    const updateUnderline = () => {
      if (!activeNavName || !desktopNavRef.current) {
        setActiveUnderline(null);
        return;
      }

      const activeLink = desktopLinkRefs.current[activeNavName];
      if (!activeLink) {
        setActiveUnderline(null);
        return;
      }

      const navRect = desktopNavRef.current.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      setActiveUnderline({
        left: linkRect.left - navRect.left,
        width: linkRect.width,
      });
    };

    updateUnderline();
    window.addEventListener("resize", updateUnderline);
    return () => window.removeEventListener("resize", updateUnderline);
  }, [activeNavName]);

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
        <div ref={desktopNavRef} className="relative flex items-center gap-8 pb-2">
          {activeUnderline && (
            <span
              className="pointer-events-none absolute bottom-0 h-0.5 rounded-full bg-primary transition-all duration-300 ease-out"
              style={{
                left: activeUnderline.left,
                width: activeUnderline.width,
              }}
            />
          )}
          {navLinks.map((link) => {
            const isActive = link.name === activeNavName;

            return (
              <Link
                key={link.name}
                href={prefixAgencyPath(link.href, agencySlug)}
                ref={(node) => {
                  desktopLinkRefs.current[link.name] = node;
                }}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative py-1 text-xs font-bold tracking-widest hover:text-primary transition-colors duration-300",
                  isActive ? "text-primary" : textColor
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
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
              className={cn(
                "text-4xl font-headline font-bold hover:text-primary transition-all",
                isNavLinkActive(link.href) ? "text-primary" : "text-black"
              )}
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
