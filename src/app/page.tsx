
import Image from "next/image";
import Link from "next/link";
import HeroSearch from "@/components/hero-search";
import DifferenceBlock from "@/components/difference-block";
import PropertyCard from "@/components/property-card";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-home');
  
  const featuredProperties = [
    { id: "1", image: "https://picsum.photos/seed/lux-house-1/800/600", address: "14 Marine Drive", suburb: "MOSMAN, NSW", price: "4,250,000", beds: 4, baths: 3, cars: 2, area: 420, agent: "Marcus Thorne" },
    { id: "2", image: "https://picsum.photos/seed/lux-apt-2/800/600", address: "88 Collins Street", suburb: "MELBOURNE, VIC", price: "2,100,000", beds: 2, baths: 2, cars: 1, area: 110, agent: "Sarah Jenkins" },
    { id: "3", image: "https://picsum.photos/seed/lux-estate-3/800/600", address: "22 Ocean View Pde", suburb: "BYRON BAY, NSW", price: "8,900,000", beds: 5, baths: 4, cars: 4, area: 1200, agent: "David Beck" },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        <Image
          src={heroImage?.imageUrl || "https://picsum.photos/seed/architecture-hero/1920/1080"}
          alt={heroImage?.description || "Modern Architecture"}
          fill
          priority
          className="object-cover scale-105"
          data-ai-hint={heroImage?.imageHint || "Modern Architecture"}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative text-center px-6 w-full max-w-7xl">
          <h1 className="text-white font-headline font-extrabold text-4xl md:text-6xl mb-8 tracking-tighter leading-none animate-in fade-in slide-in-from-bottom-8 duration-1000">
            DISCOVER THE AETHER LIFESTYLE.
          </h1>
          <HeroSearch />
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-24 px-6 bg-[#F5F7FA]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-headline font-extrabold text-4xl mb-4">FEATURED RESIDENCES</h2>
              <p className="text-muted-foreground font-body">Exceptional living spaces across Australia's most coveted suburbs.</p>
            </div>
            <Link href="/search">
              <Button variant="link" className="font-bold text-primary tracking-widest text-xs p-0">
                VIEW ALL PROPERTIES →
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProperties.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        </div>
      </section>

      {/* The Difference Section */}
      <DifferenceBlock />

      {/* Insights Preview */}
      <section className="py-24 px-6 bg-secondary/5 border-y border-secondary/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[16/10] bg-gray-200">
            <Image
              src="https://picsum.photos/seed/market-insights/800/600"
              alt="Market Insights"
              fill
              className="object-cover"
              data-ai-hint="Property Analysis"
            />
            <div className="absolute top-8 -left-8 bg-white p-8 shadow-2xl max-w-xs hidden md:block">
              <span className="text-secondary font-bold text-xs tracking-[0.2em] block mb-4">MARKET UPDATE</span>
              <h3 className="font-headline font-bold text-2xl mb-4">Sydney's 2026 Coastal Boom</h3>
              <p className="text-gray-400 text-sm mb-6">Expert analysis from our Managing Director on the current shift toward luxury coastal assets.</p>
              <Link href="/insights" className="text-xs font-bold text-primary tracking-widest hover:underline">READ MORE</Link>
            </div>
          </div>
          <div>
            <h2 className="font-headline font-extrabold text-4xl mb-6">AETHER INSIGHTS</h2>
            <p className="text-gray-600 mb-8 leading-relaxed font-body text-lg">
              Knowledge is the most valuable asset in real estate. Access our exclusive collection of market data, lifestyle trends, and expert predictions.
            </p>
            <div className="space-y-6 mb-12">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 flex-shrink-0 bg-white shadow-md flex items-center justify-center font-bold text-secondary">01</div>
                <p className="text-sm font-bold pt-3 tracking-wide">QUARTERLY MARKET REPORTS</p>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 flex-shrink-0 bg-white shadow-md flex items-center justify-center font-bold text-secondary">02</div>
                <p className="text-sm font-bold pt-3 tracking-wide">LOCAL SUBURB PROFILES</p>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 flex-shrink-0 bg-white shadow-md flex items-center justify-center font-bold text-secondary">03</div>
                <p className="text-sm font-bold pt-3 tracking-wide">INVESTOR STRATEGY GUIDES</p>
              </div>
            </div>
            <Link href="/insights">
              <Button className="bg-primary hover:bg-primary/90 text-white font-bold h-14 px-10 rounded-none">
                EXPLORE INSIGHTS CENTRE
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-[#111111] text-white text-center px-6 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 bg-[url('https://picsum.photos/seed/au-pattern-bg/1920/1080')] bg-cover" />
        <div className="relative z-10">
          <h2 className="font-headline font-extrabold text-4xl md:text-6xl mb-8">READY TO MOVE?</h2>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold px-12 h-16 text-lg rounded-none">
              LIST YOUR PROPERTY
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black font-bold px-12 h-16 text-lg rounded-none">
              FIND A RESIDENCE
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
