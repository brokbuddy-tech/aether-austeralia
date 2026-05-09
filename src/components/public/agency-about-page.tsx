"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, MapPin, Phone, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAgents, getSiteConfig, type SiteAgent, type SiteConfig } from "@/lib/public-site";
import { prefixAgencyPath, resolveAgencySlugFromPathname } from "@/lib/agency-routing";

function getDisplayName(siteConfig: SiteConfig | null) {
  return siteConfig?.branding?.displayName || siteConfig?.organization.name || "Agency Website";
}

function getAgentImage(seed: string, avatar?: string | null) {
  if (avatar) return avatar;
  const initials = seed
    .split(/[\s-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("") || "AG";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 1200"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f4f1eb"/><stop offset="1" stop-color="#d9d2c3"/></linearGradient></defs><rect width="900" height="1200" fill="url(#g)"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#7b6d56" font-family="Arial, sans-serif" font-size="280" font-weight="700">${initials}</text></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export function AetherAboutPageContent() {
  const pathname = usePathname();
  const agencySlug = resolveAgencySlugFromPathname(pathname);
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null);
  const [agents, setAgents] = useState<SiteAgent[]>([]);

  useEffect(() => {
    let active = true;

    async function load() {
      const [nextSiteConfig, nextAgents] = await Promise.all([
        getSiteConfig(agencySlug),
        getAgents(agencySlug),
      ]);

      if (!active) return;
      setSiteConfig(nextSiteConfig);
      setAgents(nextAgents.agents);
    }

    void load();
    return () => {
      active = false;
    };
  }, [agencySlug]);

  const displayName = getDisplayName(siteConfig);
  const aboutCompany =
    siteConfig?.profile?.aboutCompany?.trim() ||
    siteConfig?.branding?.bio?.trim() ||
    `${displayName} publishes live organization data, active agents, and current listings directly from Broker OS so the public experience always reflects the latest office updates.`;
  const officeAddress = siteConfig?.profile?.officeAddress?.trim() || "Address shared on request";
  const officeTimings = siteConfig?.profile?.officeTimings?.trim() || "Available by appointment";
  const officePhone =
    siteConfig?.profile?.contact?.primaryPhone ||
    siteConfig?.branding?.publicPhone ||
    siteConfig?.leadAgent?.phone ||
    null;
  const activeAgents = agents.slice(0, 4);
  const stats = [
    { label: "Live listings", value: siteConfig?.stats?.totalListings ?? 0 },
    { label: "Active agents", value: siteConfig?.stats?.activeAgents ?? agents.length },
    { label: "Ready properties", value: siteConfig?.stats?.readyListings ?? 0 },
    { label: "Off-plan launches", value: siteConfig?.stats?.offPlanListings ?? 0 },
  ];

  return (
    <div className="min-h-screen bg-white pt-[72px]">
      <section className="relative flex min-h-[520px] items-center justify-center overflow-hidden">
        <Image
          src="https://picsum.photos/seed/aether-about-dynamic/1920/1080"
          alt={`${displayName} office`}
          fill
          priority
          className="object-cover brightness-[0.58]"
        />
        <div className="absolute inset-0 bg-black/25" />
        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center text-white">
          <p className="text-[10px] font-bold uppercase tracking-[0.45em] text-white/80">
            Organization Profile
          </p>
          <h1 className="mt-5 font-headline text-5xl font-extrabold uppercase tracking-tighter md:text-7xl">
            {displayName}
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-white/85 md:text-lg">
            {aboutCompany}
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-16 px-6 py-24 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-10">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.45em] text-primary">
              Built for public trust
            </p>
            <h2 className="mt-5 font-headline text-4xl font-extrabold uppercase tracking-tighter text-[#111111] md:text-5xl">
              Organization data that stays current
            </h2>
          </div>
          <div className="space-y-6 text-base leading-8 text-gray-600">
            <p>{aboutCompany}</p>
            <p>
              Every public touchpoint for {displayName} is resolved from the organization slug,
              then fetched securely with the organization hex code behind the scenes. That means
              contact details, agent directories, and listings update automatically when the
              Broker OS workspace changes.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="border border-gray-100 bg-[#F7F8FA] p-8 shadow-sm">
              <MapPin className="mb-4 h-6 w-6 text-primary" />
              <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-gray-400">
                Office
              </p>
              <p className="mt-3 text-lg font-semibold text-[#111111]">{officeAddress}</p>
              <p className="mt-2 text-sm text-gray-500">{officeTimings}</p>
            </div>
            <div className="border border-gray-100 bg-[#F7F8FA] p-8 shadow-sm">
              <ShieldCheck className="mb-4 h-6 w-6 text-primary" />
              <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-gray-400">
                Public sync
              </p>
              <p className="mt-3 text-lg font-semibold text-[#111111]">
                Slug aware. Hex secured.
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Listings, agents, branding, and organization data are all pulled dynamically.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {stats.map((stat) => (
            <div key={stat.label} className="border border-gray-100 bg-white p-8 shadow-sm">
              <p className="text-4xl font-headline font-extrabold text-primary md:text-5xl">
                {stat.value}
              </p>
              <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.35em] text-gray-400">
                {stat.label}
              </p>
            </div>
          ))}
          {officePhone ? (
            <a
              href={`tel:${officePhone}`}
              className="flex flex-col justify-between border border-gray-100 bg-[#111111] p-8 text-white shadow-xl transition-colors hover:bg-primary"
            >
              <Phone className="h-6 w-6" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/60">
                  Direct contact
                </p>
                <p className="mt-3 text-lg font-semibold">{officePhone}</p>
              </div>
            </a>
          ) : (
            <div className="flex flex-col justify-between border border-gray-100 bg-[#111111] p-8 text-white shadow-xl">
              <Globe className="h-6 w-6" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/60">
                  Public website
                </p>
                <p className="mt-3 text-lg font-semibold">Organization synced</p>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="bg-[#F5F7FA] px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.45em] text-primary">
                Meet the team
              </p>
              <h2 className="mt-5 font-headline text-4xl font-extrabold uppercase tracking-tighter text-[#111111] md:text-5xl">
                Advisors representing {displayName}
              </h2>
            </div>
            <Link href={prefixAgencyPath("/agents", agencySlug)}>
              <Button variant="outline" className="rounded-none border-primary px-8 font-bold uppercase tracking-[0.25em] text-primary hover:bg-primary hover:text-white">
                View all agents
              </Button>
            </Link>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {activeAgents.length > 0 ? (
              activeAgents.map((agent) => (
                <Link
                  key={agent.slug || agent.id || agent.name}
                  href={prefixAgencyPath(`/agents/${agent.slug || ""}`, agencySlug)}
                  className="group overflow-hidden bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={getAgentImage(agent.slug || agent.name, agent.avatar)}
                      alt={agent.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                      <p className="font-headline text-xl font-bold uppercase tracking-tight">
                        {agent.name}
                      </p>
                      <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                        {agent.jobTitle || agent.title || agent.tagline || "Property Consultant"}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4 p-6">
                    <p className="line-clamp-4 text-sm leading-6 text-gray-500">
                      {agent.bio || `${agent.name} is part of the active public roster for ${displayName}.`}
                    </p>
                    <div className="flex items-center justify-between border-t border-gray-100 pt-4 text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
                      <span>{agent.totalListings ?? 0} listings</span>
                      <span>View profile</span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="border border-dashed border-gray-300 bg-white p-10 text-sm text-gray-500 md:col-span-2 xl:col-span-4">
                No public agents are active for this organization yet.
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-[#111111] px-6 py-24 text-white">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <Users className="h-10 w-10 text-primary" />
          <h2 className="mt-6 font-headline text-4xl font-extrabold uppercase tracking-tighter md:text-5xl">
            Continue with the live agency experience
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-7 text-white/75">
            Browse listings, connect with active agents, and explore the public-facing brand data
            generated directly from the organization workspace.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link href={prefixAgencyPath("/search?type=buy", agencySlug)}>
              <Button className="rounded-none bg-primary px-10 py-6 text-xs font-bold uppercase tracking-[0.35em] text-white hover:bg-primary/90">
                Explore listings
              </Button>
            </Link>
            <Link href={prefixAgencyPath("/contact", agencySlug)}>
              <Button variant="outline" className="rounded-none border-white/30 bg-transparent px-10 py-6 text-xs font-bold uppercase tracking-[0.35em] text-white hover:bg-white hover:text-[#111111]">
                Contact office
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
