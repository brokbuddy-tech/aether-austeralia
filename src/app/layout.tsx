
import type {Metadata} from 'next';
import './globals.css';
import Navbar from '@/components/navbar';
import { Toaster } from '@/components/ui/toaster';

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
      <body className="font-body antialiased selection:bg-primary selection:text-white">
        <Navbar />
        <main>{children}</main>
        <footer className="bg-[#111111] text-white py-12 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-headline font-bold text-xl mb-4">Aether Australia</h3>
              <p className="text-gray-400 text-sm">Elevating the Australian real estate experience through innovation and local expertise since 2026.</p>
            </div>
            <div>
              <h4 className="font-headline font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/search?type=buy" className="hover:text-white transition-colors">Buy Property</a></li>
                <li><a href="/search?type=rent" className="hover:text-white transition-colors">Rent Property</a></li>
                <li><a href="/search?type=sold" className="hover:text-white transition-colors">Sold Properties</a></li>
                <li><a href="/insights" className="hover:text-white transition-colors">Market Insights</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-headline font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/portals" className="hover:text-white transition-colors">Vendor Portal</a></li>
                <li><a href="/portals" className="hover:text-white transition-colors">Landlord Portal</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Property Management</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Commercial</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-headline font-bold mb-4">Compliance</h4>
              <p className="text-gray-400 text-xs mb-4">REIA Member #2026-AE-AU. Licensed in NSW, VIC, QLD, WA, SA, TAS, ACT, and NT.</p>
              <div className="flex gap-4">
                <div className="h-10 w-10 border border-gray-600 flex items-center justify-center text-[10px] font-bold">REIA</div>
                <div className="h-10 w-10 border border-gray-600 flex items-center justify-center text-[10px] font-bold">NSW GOV</div>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-xs">
            © 2026 Aether Australia Real Estate. All rights reserved. Built for the modern Australian market.
          </div>
        </footer>
        <Toaster />
      </body>
    </html>
  );
}
