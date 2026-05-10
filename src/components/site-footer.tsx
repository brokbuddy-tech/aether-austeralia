import Link from "next/link";
import { prefixAgencyPath } from "@/lib/agency-routing";
import type { SiteConfig } from "@/lib/public-site";

function getDisplayName(siteConfig: SiteConfig) {
  return siteConfig.branding?.displayName || siteConfig.organization.name || "Agency Website";
}

export function SiteFooter({
  agencySlug,
  siteConfig,
}: {
  agencySlug?: string | null;
  siteConfig: SiteConfig;
}) {
  const displayName = getDisplayName(siteConfig);
  const aboutCompany =
    siteConfig.profile?.aboutCompany?.trim() ||
    siteConfig.branding?.bio?.trim() ||
    `Public branding, agents, and listings for ${displayName} are synced directly from Broker OS.`;

  return (
    <footer className="relative z-30 bg-[#111111] text-white py-20 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div>
            <Link href={prefixAgencyPath("/", agencySlug)} className="inline-block mb-8">
              <span className="font-headline font-extrabold text-3xl tracking-tighter">
                {displayName}<span className="text-primary">.</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-xs font-body">
              {aboutCompany}
            </p>
            <div className="flex gap-4">
              <div className="h-10 w-10 border border-gray-800 flex items-center justify-center text-[10px] font-bold tracking-widest hover:border-primary transition-colors cursor-pointer">IG</div>
              <div className="h-10 w-10 border border-gray-800 flex items-center justify-center text-[10px] font-bold tracking-widest hover:border-primary transition-colors cursor-pointer">LI</div>
              <div className="h-10 w-10 border border-gray-800 flex items-center justify-center text-[10px] font-bold tracking-widest hover:border-primary transition-colors cursor-pointer">FB</div>
            </div>
          </div>

          <div>
            <h4 className="font-headline font-bold text-xs tracking-[0.3em] uppercase mb-8 text-primary">Portfolio</h4>
            <ul className="space-y-4 text-sm font-bold text-gray-400">
              <li><Link href={prefixAgencyPath("/search?type=buy", agencySlug)} className="hover:text-white transition-colors tracking-tight">BUY PROPERTY</Link></li>
              <li><Link href={prefixAgencyPath("/search?type=rent", agencySlug)} className="hover:text-white transition-colors tracking-tight">RENT PROPERTY</Link></li>
              <li><Link href={prefixAgencyPath("/search?type=sold", agencySlug)} className="hover:text-white transition-colors tracking-tight">RECENTLY SOLD</Link></li>
              <li><Link href={prefixAgencyPath("/search", agencySlug)} className="hover:text-white transition-colors tracking-tight">NEW DEVELOPMENTS</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline font-bold text-xs tracking-[0.3em] uppercase mb-8 text-primary">Client Portals</h4>
            <ul className="space-y-4 text-sm font-bold text-gray-400">
              <li><Link href={prefixAgencyPath("/portals", agencySlug)} className="hover:text-white transition-colors tracking-tight">VENDOR CAMPAIGN TRACKER</Link></li>
              <li><Link href={prefixAgencyPath("/portals", agencySlug)} className="hover:text-white transition-colors tracking-tight">LANDLORD PORTAL</Link></li>
              <li><Link href={prefixAgencyPath("/portals", agencySlug)} className="hover:text-white transition-colors tracking-tight">TENANT DASHBOARD</Link></li>
              <li><Link href={prefixAgencyPath("/insights", agencySlug)} className="hover:text-white transition-colors tracking-tight">MARKET INSIGHTS</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline font-bold text-xs tracking-[0.3em] uppercase mb-8 text-primary">Compliance</h4>
            <p className="text-gray-500 text-[10px] leading-relaxed mb-6 font-medium">
              REIA Member #2026-AE-AU. Licensed in NSW, VIC, QLD, WA, SA, TAS, ACT, and NT. Digital staging may be used for visualization. All measurements are approximate.
            </p>
            <div className="flex items-center gap-6 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all">
              <div className="text-[10px] font-black border-2 border-white px-2 py-1 leading-none">REIA</div>
              <div className="text-[10px] font-black border-2 border-white px-2 py-1 leading-none">NSW GOV</div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-600 text-[10px] font-bold tracking-widest uppercase">
            &copy; {new Date().getFullYear()} {displayName}. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8 text-[10px] font-bold tracking-widest uppercase text-gray-600">
            <Link href={prefixAgencyPath("/about", agencySlug)} className="hover:text-white transition-colors">About</Link>
            <Link href={prefixAgencyPath("/contact", agencySlug)} className="hover:text-white transition-colors">Contact</Link>
            <Link href={prefixAgencyPath("/agents", agencySlug)} className="hover:text-white transition-colors">Agents</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
