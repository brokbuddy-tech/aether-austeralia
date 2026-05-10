"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getSiteConfig, hasMeaningfulSiteConfig, type SiteConfig } from "@/lib/public-site";
import { prefixAgencyPath, resolveAgencySlugFromPathname } from "@/lib/agency-routing";

function getDisplayName(siteConfig: SiteConfig | null) {
  return siteConfig?.branding?.displayName || siteConfig?.organization.name || "Agency Website";
}

function getWhatsAppHref(value?: string | null, message?: string) {
  if (!value) return null;
  const digits = value.replace(/\D/g, "");
  if (!digits) return null;
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${digits}${text}`;
}

export function AetherContactPageContent({
  initialSiteConfig = null,
}: {
  initialSiteConfig?: SiteConfig | null;
}) {
  const pathname = usePathname();
  const agencySlug = resolveAgencySlugFromPathname(pathname);
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(initialSiteConfig);

  useEffect(() => {
    setSiteConfig(initialSiteConfig);
  }, [initialSiteConfig]);

  useEffect(() => {
    let active = true;

    async function load() {
      const nextSiteConfig = await getSiteConfig(agencySlug);
      if (active && hasMeaningfulSiteConfig(nextSiteConfig)) {
        setSiteConfig(nextSiteConfig);
      }
    }

    void load();
    return () => {
      active = false;
    };
  }, [agencySlug]);

  const displayName = getDisplayName(siteConfig);
  const officeAddress = siteConfig?.profile?.officeAddress?.trim() || "Address shared on request";
  const officeTimings = siteConfig?.profile?.officeTimings?.trim() || "Available by appointment";
  const officeEmail =
    siteConfig?.profile?.contact?.officialEmail ||
    siteConfig?.branding?.publicEmail ||
    siteConfig?.leadAgent?.email ||
    "hello@example.com";
  const officePhone =
    siteConfig?.profile?.contact?.primaryPhone ||
    siteConfig?.branding?.publicPhone ||
    siteConfig?.leadAgent?.phone ||
    "Phone available on request";
  const whatsappHref = getWhatsAppHref(
    siteConfig?.profile?.contact?.whatsappNumber || siteConfig?.branding?.whatsapp || siteConfig?.leadAgent?.whatsapp,
    `Hi ${displayName}, I would like to speak with your team.`
  );

  return (
    <div className="min-h-screen bg-white pt-[72px]">
      <section className="relative overflow-hidden border-b border-[#111111]/10 px-6 py-32 text-white">
        <Image
          src="https://picsum.photos/seed/aether-contact-dynamic/1920/1080"
          alt={`${displayName} contact`}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 mx-auto max-w-6xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-white/80">Get in touch</p>
          <h1 className="mt-5 font-headline text-5xl font-extrabold uppercase tracking-tighter md:text-7xl">
            Connect with {displayName}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/85">
            Public contact details are synced from the organization profile, so the information
            here always reflects the latest Broker OS workspace updates.
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-20 px-6 py-24 lg:grid-cols-2">
        <div className="space-y-10">
          <div className="space-y-8">
            <div className="flex gap-5">
              <div className="flex h-12 w-12 items-center justify-center bg-primary/10 text-primary">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Office</p>
                <p className="mt-2 text-lg font-semibold text-[#111111]">{officeAddress}</p>
                <p className="mt-1 text-sm text-gray-500">{officeTimings}</p>
              </div>
            </div>

            <div className="flex gap-5">
              <div className="flex h-12 w-12 items-center justify-center bg-primary/10 text-primary">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Phone</p>
                <a href={`tel:${officePhone}`} className="mt-2 block text-lg font-semibold text-[#111111] hover:text-primary">
                  {officePhone}
                </a>
              </div>
            </div>

            <div className="flex gap-5">
              <div className="flex h-12 w-12 items-center justify-center bg-primary/10 text-primary">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Email</p>
                <a href={`mailto:${officeEmail}`} className="mt-2 block text-lg font-semibold text-[#111111] hover:text-primary">
                  {officeEmail}
                </a>
              </div>
            </div>
          </div>

          <div className="border border-gray-100 bg-[#F7F8FA] p-8 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
              Public website workflow
            </p>
            <p className="mt-4 text-sm leading-7 text-gray-500">
              The organization slug is used for the public URL, while all organization, agent, and
              listing API calls continue to resolve the internal hex code before data is fetched.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href={prefixAgencyPath("/agents", agencySlug)}>
                <Button className="rounded-none bg-[#111111] text-xs font-bold uppercase tracking-[0.3em] text-white hover:bg-primary">
                  Meet the agents
                </Button>
              </Link>
              {whatsappHref ? (
                <a href={whatsappHref} target="_blank" rel="noreferrer">
                  <Button variant="outline" className="rounded-none border-primary text-xs font-bold uppercase tracking-[0.3em] text-primary hover:bg-primary hover:text-white">
                    WhatsApp office
                  </Button>
                </a>
              ) : null}
            </div>
          </div>
        </div>

        <div className="border border-gray-100 bg-gray-50 p-12 shadow-sm">
          <h2 className="font-headline text-3xl font-extrabold uppercase tracking-tight text-[#111111]">
            Send a public inquiry
          </h2>
          <form className="mt-8 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400">
                  First name
                </label>
                <Input className="h-14 rounded-none border-gray-200 bg-white" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400">
                  Last name
                </label>
                <Input className="h-14 rounded-none border-gray-200 bg-white" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400">
                Email
              </label>
              <Input type="email" className="h-14 rounded-none border-gray-200 bg-white" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400">
                Phone
              </label>
              <Input type="tel" className="h-14 rounded-none border-gray-200 bg-white" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400">
                Message
              </label>
              <textarea
                className="min-h-[160px] w-full rounded-none border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-primary"
                placeholder={`Tell ${displayName} how the team can help.`}
              />
            </div>
            <Button type="button" className="w-full rounded-none border-2 border-primary bg-white text-primary hover:bg-primary hover:text-white font-bold h-16 uppercase tracking-[0.25em]">
              Submit inquiry
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
