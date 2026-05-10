"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Mail, MessageSquare, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAgentProfile } from "@/lib/public-site";
import { prefixAgencyPath, resolveAgencySlugFromPathname } from "@/lib/agency-routing";

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

function getWhatsAppHref(value?: string | null, message?: string) {
  if (!value) return null;
  const digits = value.replace(/\D/g, "");
  if (!digits) return null;
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${digits}${text}`;
}

function ListingPreview({
  listing,
  agencySlug,
}: {
  listing: {
    id: string;
    title: string;
    image: string;
    suburb: string;
    price: string;
    beds: number;
    baths: number;
    cars: number;
  };
  agencySlug?: string | null;
}) {
  return (
    <Link
      href={prefixAgencyPath(`/property/${listing.id}`, agencySlug)}
      className="group overflow-hidden border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={listing.image}
          alt={listing.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="space-y-3 p-6">
        <div>
          <p className="font-headline text-xl font-bold uppercase tracking-tight text-[#111111]">
            {listing.title}
          </p>
          <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">
            {listing.suburb}
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
          <span>{listing.beds} beds</span>
          <span>{listing.baths} baths</span>
          <span>{listing.cars} cars</span>
        </div>
        <div className="border-t border-gray-100 pt-4">
          <p className="text-2xl font-headline font-extrabold text-primary">${listing.price}</p>
        </div>
      </div>
    </Link>
  );
}

export function AetherAgentProfilePageContent({
  agentSlug,
  initialProfile = null,
}: {
  agentSlug: string;
  initialProfile?: Awaited<ReturnType<typeof getAgentProfile>> | null;
}) {
  const pathname = usePathname();
  const agencySlug = resolveAgencySlugFromPathname(pathname);
  const [loading, setLoading] = useState(!initialProfile);
  const [profile, setProfile] = useState<Awaited<ReturnType<typeof getAgentProfile>> | null>(initialProfile);

  useEffect(() => {
    setProfile(initialProfile);
    setLoading(!initialProfile);
  }, [initialProfile]);

  useEffect(() => {
    let active = true;

    async function load() {
      if (!initialProfile) {
        setLoading(true);
      }
      const nextProfile = await getAgentProfile(agentSlug, agencySlug);
      if (!active) return;
      if (nextProfile?.agent) {
        setProfile(nextProfile);
      } else if (!initialProfile) {
        setProfile(nextProfile);
      }
      setLoading(false);
    }

    void load();
    return () => {
      active = false;
    };
  }, [agentSlug, agencySlug, initialProfile]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white pt-[72px]">
        <p className="text-sm font-bold uppercase tracking-[0.35em] text-gray-400">Loading profile</p>
      </div>
    );
  }

  if (!profile?.agent) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white px-6 pt-[72px]">
        <div className="max-w-xl text-center">
          <h1 className="font-headline text-4xl font-extrabold uppercase tracking-tight text-[#111111]">
            Agent not found
          </h1>
          <p className="mt-4 text-gray-500">
            This public profile is not available for the current organization.
          </p>
          <Link href={prefixAgencyPath("/agents", agencySlug)} className="mt-8 inline-flex">
            <Button className="rounded-none bg-primary px-8 font-bold uppercase tracking-[0.25em] text-white">
              Back to agents
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const displayName = profile.organization?.name || "Agency Website";
  const accentColor = profile.agent.primaryColor || profile.profile?.primaryColor || "#C5A47E";
  const whatsappHref = getWhatsAppHref(
    profile.agent.whatsapp || profile.agent.phone || profile.profile?.contact?.whatsappNumber,
    `Hi ${profile.agent.name}, I'm interested in your active listings with ${displayName}.`
  );

  return (
    <div className="min-h-screen bg-white pt-[72px]">
      <section
        className="px-6 py-16"
        style={{
          background: `radial-gradient(circle at top right, ${accentColor}22, transparent 34%), linear-gradient(180deg, #ffffff 0%, #f7f8fa 100%)`,
        }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
            <Link href={prefixAgencyPath("/", agencySlug)} className="hover:text-[#111111]">Home</Link>
            <ArrowRight className="h-4 w-4" />
            <Link href={prefixAgencyPath("/agents", agencySlug)} className="hover:text-[#111111]">Agents</Link>
            <ArrowRight className="h-4 w-4" />
            <span className="text-[#111111]">{profile.agent.name}</span>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
            <div className="space-y-8">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <div className="relative h-36 w-36 overflow-hidden rounded-[32px] border border-gray-100 bg-white shadow-md">
                  <Image
                    src={getAgentImage(profile.agent.slug || profile.agent.name, profile.agent.avatar)}
                    alt={profile.agent.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="inline-flex rounded-full bg-black/5 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                    {displayName}
                  </p>
                  <h1 className="mt-4 font-headline text-4xl font-extrabold uppercase tracking-tight text-[#111111] md:text-5xl">
                    {profile.agent.name}
                  </h1>
                  <p className="mt-3 text-lg font-semibold" style={{ color: accentColor }}>
                    {profile.agent.jobTitle || profile.agent.title || profile.agent.tagline || "Property Consultant"}
                  </p>
                  <p className="mt-4 max-w-3xl text-base leading-7 text-gray-500">
                    {profile.agent.bio || `${profile.agent.name} is part of the public-facing agent roster for ${displayName}.`}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {profile.agent.phone ? (
                  <a href={`tel:${profile.agent.phone}`}>
                    <Button className="rounded-none bg-[#111111] text-white hover:bg-primary">
                      <Phone className="mr-2 h-4 w-4" />
                      Call
                    </Button>
                  </a>
                ) : null}
                {profile.agent.email ? (
                  <a href={`mailto:${profile.agent.email}`}>
                    <Button variant="outline" className="rounded-none border-primary text-primary hover:bg-primary hover:text-white">
                      <Mail className="mr-2 h-4 w-4" />
                      Email
                    </Button>
                  </a>
                ) : null}
                {whatsappHref ? (
                  <a href={whatsappHref} target="_blank" rel="noreferrer">
                    <Button variant="outline" className="rounded-none border-primary text-primary hover:bg-primary hover:text-white">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      WhatsApp
                    </Button>
                  </a>
                ) : null}
              </div>
            </div>

            <div className="border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-[#111111]">Profile snapshot</h2>
              <div className="mt-5 grid grid-cols-2 gap-4">
                {[
                  { label: "Active listings", value: profile.stats.activeListings },
                  { label: "Sold properties", value: profile.stats.soldListings },
                  { label: "Rented properties", value: profile.stats.rentedListings },
                  { label: "Years experience", value: profile.agent.yearsExperience || 0 },
                  { label: "Deals closed", value: profile.agent.totalDeals || 0 },
                  { label: "Languages", value: (profile.agent.languages || []).length },
                ].map((item) => (
                  <div key={item.label} className="border border-gray-100 bg-[#F7F8FA] p-4">
                    <p className="text-2xl font-headline font-extrabold text-[#111111]">{item.value}</p>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-7xl space-y-12">
          {(profile.agent.specializations?.length || profile.agent.languages?.length) ? (
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="border border-gray-100 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-[#111111]">Specializations</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {(profile.agent.specializations || []).map((item) => (
                    <span key={item} className="border border-gray-200 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="border border-gray-100 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-[#111111]">Languages</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {(profile.agent.languages || []).map((item) => (
                    <span key={item} className="bg-primary/10 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          <div>
            <div className="mb-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-primary">Active portfolio</p>
              <h2 className="mt-3 font-headline text-3xl font-extrabold uppercase tracking-tight text-[#111111]">
                Live listings from {profile.agent.name}
              </h2>
            </div>

            {profile.activeListings.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {profile.activeListings.map((listing: any) => (
                  <ListingPreview key={listing.id} listing={listing} agencySlug={agencySlug} />
                ))}
              </div>
            ) : (
              <div className="border border-dashed border-gray-300 bg-[#F7F8FA] p-10 text-sm text-gray-500">
                No active public listings are available for this agent yet.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
