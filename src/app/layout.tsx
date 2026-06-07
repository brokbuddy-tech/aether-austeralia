import type {Metadata} from 'next';
import 'leaflet/dist/leaflet.css';
import './globals.css';
import Navbar from '@/components/navbar';
import { SiteFooter } from '@/components/site-footer';
import { Toaster } from '@/components/ui/toaster';
import { getAgencyDisplayName, getSiteConfig } from '@/lib/public-site';
import { getRequestAgencySlug } from '@/lib/server-agency';

export async function generateMetadata(): Promise<Metadata> {
  const agencySlug = await getRequestAgencySlug();
  const siteConfig = await getSiteConfig(agencySlug);
  const agencyName = getAgencyDisplayName(siteConfig);
  const logoIconUrl = siteConfig.profile?.logo?.trim() || undefined;

  return {
    title: siteConfig.branding?.metaTitle?.trim() || `${agencyName} | Australian Real Estate Experts`,
    description:
      siteConfig.branding?.metaDescription?.trim()
      || `Premium Australian real estate platform featuring modern coastal, hamptons, and urban terrace homes through ${agencyName}.`,
    icons: logoIconUrl
      ? {
          icon: [{ url: logoIconUrl }],
          shortcut: [{ url: logoIconUrl }],
          apple: [{ url: logoIconUrl }],
        }
      : undefined,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const agencySlug = await getRequestAgencySlug();
  const siteConfig = await getSiteConfig(agencySlug);

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800&family=Open+Sans:wght@400;600&family=Playfair+Display:wght@700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased selection:bg-primary selection:text-white flex flex-col min-h-screen">
        <Navbar initialSiteConfig={siteConfig} />
        <main className="flex-grow">{children}</main>
        <SiteFooter agencySlug={agencySlug} siteConfig={siteConfig} />
        <Toaster />
      </body>
    </html>
  );
}
