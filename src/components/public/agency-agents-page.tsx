"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAgents, getSiteConfig, type SiteAgent, type SiteConfig } from "@/lib/public-site";
import { prefixAgencyPath, resolveAgencySlugFromPathname } from "@/lib/agency-routing";

function getDisplayName(siteConfig: SiteConfig | null) {
  return siteConfig?.branding?.displayName || siteConfig?.organization.name || "Agency Website";
}

function getAgentImage(seed: string, avatar?: string | null) {
  return avatar || `https://picsum.photos/seed/${encodeURIComponent(seed)}/900/1200`;
}

function AgentCard({
  agent,
  agencySlug,
  agencyName,
}: {
  agent: SiteAgent;
  agencySlug?: string | null;
  agencyName: string;
}) {
  return (
    <Link
      href={prefixAgencyPath(`/agents/${agent.slug || ""}`, agencySlug)}
      className="group overflow-hidden border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
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
          <p className="font-headline text-xl font-bold uppercase tracking-tight">{agent.name}</p>
          <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
            {agent.jobTitle || agent.title || agent.tagline || "Property Consultant"}
          </p>
        </div>
      </div>
      <div className="space-y-4 p-6">
        <p className="line-clamp-4 text-sm leading-6 text-gray-500">
          {agent.bio || `${agent.name} is part of the active public roster for ${agencyName}.`}
        </p>
        <div className="flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
          {(agent.languages || []).slice(0, 3).map((language) => (
            <span key={language} className="border border-gray-200 px-2 py-1">
              {language}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between border-t border-gray-100 pt-4 text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
          <span>{agent.totalListings ?? 0} listings</span>
          <span className="inline-flex items-center gap-2">
            View profile <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function AetherAgentsPageContent() {
  const pathname = usePathname();
  const agencySlug = resolveAgencySlugFromPathname(pathname);
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null);
  const [agents, setAgents] = useState<SiteAgent[]>([]);
  const [search, setSearch] = useState("");

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
  const filteredAgents = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return agents;

    return agents.filter((agent) => {
      const haystack = [
        agent.name,
        agent.jobTitle,
        agent.title,
        agent.tagline,
        agent.bio,
        ...(agent.languages || []),
        ...(agent.specializations || []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(query);
    });
  }, [agents, search]);

  return (
    <div className="min-h-screen bg-white pt-[72px]">
      <section className="border-b border-gray-100 bg-[radial-gradient(circle_at_top_right,rgba(197,164,126,0.18),transparent_35%),linear-gradient(180deg,#fff_0%,#f7f8fa_100%)] px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-[10px] font-bold uppercase tracking-[0.45em] text-primary">Agents</p>
          <h1 className="mt-5 font-headline text-5xl font-extrabold uppercase tracking-tighter text-[#111111] md:text-6xl">
            The public team at {displayName}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-500">
            Every profile on this page is organization-aware, public, and synced from the Broker OS
            workspace for this agency slug.
          </p>
          <div className="mt-10 max-w-xl border border-gray-200 bg-white p-2 shadow-sm">
            <div className="flex items-center gap-3 px-4">
              <Search className="h-4 w-4 text-gray-400" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by agent, language, or specialization"
                className="border-0 bg-transparent px-0 focus-visible:ring-0"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-center justify-between">
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-gray-400">
              {filteredAgents.length} active public agents
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredAgents.length > 0 ? (
              filteredAgents.map((agent) => (
                <AgentCard
                  key={agent.slug || agent.id || agent.name}
                  agent={agent}
                  agencySlug={agencySlug}
                  agencyName={displayName}
                />
              ))
            ) : (
              <div className="border border-dashed border-gray-300 bg-[#F7F8FA] p-10 text-sm text-gray-500 md:col-span-2 xl:col-span-3">
                No public agents matched the current search.
              </div>
            )}
          </div>

          <div className="mt-16 text-center">
            <Link href={prefixAgencyPath("/contact", agencySlug)}>
              <Button className="rounded-none bg-[#111111] px-10 font-bold uppercase tracking-[0.3em] text-white hover:bg-primary">
                Contact the office
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
