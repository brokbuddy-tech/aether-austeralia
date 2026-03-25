
import type {Metadata} from 'next';
import './globals.css';
import Navbar from '@/components/navbar';
import { Toaster } from '@/components/ui/toaster';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Aether Australia | Australian Real Estate Experts',
  description: 'Premium Australian real estate platform featuring modern coastal, hamptons, and urban terrace homes. Experience the difference in luxury living.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased selection:bg-primary selection:text-white flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">{children}</main>
        
        {/* Premium Aether Australia Footer */}
        <footer className="relative z-30 bg-[#111111] text-white py-20 px-6 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
              <div>
                <Link href="/" className="inline-block mb-8">
                  <span className="font-headline font-extrabold text-3xl tracking-tighter">
                    AETHER<span className="text-primary">.</span>
                  </span>
                </Link>
                <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-xs font-body">
                  Elevating the Australian real estate experience through local heritage and global innovation. Setting the 6-star standard in luxury residential sales and property management since 2026.
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
                  <li><Link href="/search?type=buy" className="hover:text-white transition-colors tracking-tight">BUY PROPERTY</Link></li>
                  <li><Link href="/search?type=rent" className="hover:text-white transition-colors tracking-tight">RENT PROPERTY</Link></li>
                  <li><Link href="/search?type=sold" className="hover:text-white transition-colors tracking-tight">RECENTLY SOLD</Link></li>
                  <li><Link href="/search" className="hover:text-white transition-colors tracking-tight">NEW DEVELOPMENTS</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="font-headline font-bold text-xs tracking-[0.3em] uppercase mb-8 text-primary">Client Portals</h4>
                <ul className="space-y-4 text-sm font-bold text-gray-400">
                  <li><Link href="/portals" className="hover:text-white transition-colors tracking-tight">VENDOR CAMPAIGN TRACKER</Link></li>
                  <li><Link href="/portals" className="hover:text-white transition-colors tracking-tight">LANDLORD PORTAL</Link></li>
                  <li><Link href="/portals" className="hover:text-white transition-colors tracking-tight">TENANT DASHBOARD</Link></li>
                  <li><Link href="/insights" className="hover:text-white transition-colors tracking-tight">MARKET INSIGHTS</Link></li>
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
                © 2026 AETHER AUSTRALIA REAL ESTATE. ALL RIGHTS RESERVED.
              </p>
              <div className="flex gap-8 text-[10px] font-bold tracking-widest uppercase text-gray-600">
                <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                <Link href="#" className="hover:text-white transition-colors">Sitemap</Link>
              </div>
            </div>
          </div>
        </footer>
        <Toaster />
      </body>
    </html>
  );
}
