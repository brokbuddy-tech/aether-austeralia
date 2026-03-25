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
    { id: "1", image: "https://picsum.photos/seed/lux-house-sydney/800/600", address: "14 Marine Drive", suburb: "MOSMAN, NSW", price: "4,250,000", beds: 4, baths: 3, cars: 2, area: 420, agent: "Marcus Thorne" },
    { id: "2", image: "https://picsum.photos/seed/lux-apt-melbourne/800/600", address: "88 Collins Street", suburb: "MELBOURNE, VIC", price: "2,100,000", beds: 2, baths: 2, cars: 1, area: 110, agent: "Sarah Jenkins" },
    { id: "3", image: "https://picsum.photos/seed/lux-estate-byron/800/600", address: "22 Ocean View Pde", suburb: "BYRON BAY, NSW", price: "8,900,000", beds: 5, baths: 4, cars: 4, area: 1200, agent: "David Beck" },
  ];

  const newListings = [
    { id: "4", image: "https://picsum.photos/seed/new-listing-1/800/600", address: "42 High Street", suburb: "PRAHRAN, VIC", price: "1,250,000", beds: 2, baths: 1, cars: 1, area: 85, agent: "Marcus Thorne" },
    { id: "5", image: "https://picsum.photos/seed/new-listing-2/800/600", address: "5/20 Bondi Rd", suburb: "BONDI, NSW", price: "950,000", beds: 1, baths: 1, cars: 0, area: 55, agent: "Sarah Jenkins" },
    { id: "6", image: "https://picsum.photos/seed/new-listing-3/800/600", address: "12 Riverina Ct", suburb: "NOOSA, QLD", price: "3,450,000", beds: 4, baths: 3, cars: 3, area: 600, agent: "David Beck" },
  ];

  const secondaryInsights = [
    {
      id: "i1",
      title: "Sustainable Luxury: The New Gold Standard",
      teaser: "How eco-conscious architectural design is driving premium valuations in Melbourne's leafy suburbs.",
      image: "https://picsum.photos/seed/eco-lux/400/400",
      readTime: "3 min read"
    },
    {
      id: "i2",
      title: "Regional Migration Trends in 2026",
      teaser: "The shift toward coastal hubs continues as infrastructure projects bridge the city-sea divide.",
      image: "https://picsum.photos/seed/regional-shift/400/400",
      readTime: "4 min read"
    },
    {
      id: "i3",
      title: "Interest Rate Stability and Your Portfolio",
      teaser: "Market strategists analyze the impact of recent RBA decisions on investment property yields.",
      image: "https://picsum.photos/seed/market-yield/400/400",
      readTime: "5 min read"
    }
  ];

  return (
    <div className="flex flex-col relative min-h-screen">
      {/* Fixed Background Layer - Only visible through the transparent hero */}
      <div className="fixed inset-0 w-full h-screen z-0">
        <Image
          src={heroImage?.imageUrl || "https://picsum.photos/seed/modern-building-arch/1920/1080"}
          alt={heroImage?.description || "Modern Architecture"}
          fill
          priority
          className="object-cover"
          data-ai-hint={heroImage?.imageHint || "Modern Architecture"}
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Hero Content Section - Transparent background to reveal the fixed image */}
      <section className="relative z-10 h-screen min-h-[700px] flex items-center justify-center bg-transparent">
        <div className="text-center px-6 w-full max-w-7xl">
          <HeroSearch />
        </div>
      </section>

      {/* Main Content Container - Solid background to cover the fixed hero layer when scrolling */}
      <div className="relative z-20 bg-white">
        {/* Featured Residences */}
        <section className="py-24 px-6 bg-[#F5F7FA]">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="font-headline font-extrabold text-4xl mb-4 text-[#111111] uppercase tracking-tighter">FEATURED RESIDENCES</h2>
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

        {/* New Listings Section */}
        <section className="py-24 px-6 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="font-headline font-extrabold text-4xl mb-4 text-[#111111] uppercase tracking-tighter">NEW LISTINGS</h2>
                <p className="text-muted-foreground font-body">The latest additions to our premium collection.</p>
              </div>
              <Link href="/search">
                <Button variant="link" className="font-bold text-primary tracking-widest text-xs p-0">
                  VIEW ALL NEW LISTINGS →
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {newListings.map((prop) => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          </div>
        </section>

        {/* Insights & Advice Section */}
        <section className="relative py-32 px-6 bg-white overflow-hidden">
          {/* Parallax Background */}
          <div className="absolute inset-0 opacity-[0.05] grayscale pointer-events-none z-0">
             <Image 
              src="https://picsum.photos/seed/arch-parallax/1920/1080" 
              alt="Architectural Pattern" 
              fill 
              className="object-cover" 
            />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="mb-16">
              <h2 className="font-headline font-extrabold text-xs tracking-[0.5em] text-[#111111] uppercase mb-4">INSIGHTS & ADVICE</h2>
              <div className="h-1 w-20 bg-primary" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              {/* Featured Insight (Left - 65%) */}
              <div className="lg:col-span-8 group">
                <Link href="/insights" className="block">
                  <div className="relative aspect-[16/9] overflow-hidden mb-8 shadow-2xl">
                    <Image
                      src="https://picsum.photos/seed/insight-featured-2026/1200/675"
                      alt="Market Forecast 2026"
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      data-ai-hint="Luxury Australian Coastline"
                    />
                    <div className="absolute top-6 left-6">
                      <div className="bg-primary text-white px-4 py-1.5 text-[10px] font-bold tracking-widest uppercase backdrop-blur-md bg-opacity-80">
                        MARKET UPDATE
                      </div>
                    </div>
                  </div>
                  <div className="max-w-2xl">
                    <h3 className="font-serif font-extrabold text-4xl md:text-5xl mb-6 leading-tight group-hover:text-primary transition-colors">
                      2026 Forecast: The Evolution of the Australian Coastal Market
                    </h3>
                    <p className="text-gray-500 font-body text-lg leading-relaxed mb-6">
                      Expert analysis from our strategic directors on the structural shift toward high-end regional assets and interest rate resilience in Australia's coastal enclaves.
                    </p>
                    <div className="flex items-center gap-4 text-[11px] font-bold text-gray-400 tracking-widest uppercase">
                      <span>5 MIN READ</span>
                      <span className="h-1 w-1 bg-gray-300 rounded-full" />
                      <span>BY KIERAN WARRINER</span>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Secondary Feed (Right - 35%) */}
              <div className="lg:col-span-4 flex flex-col gap-10">
                {secondaryInsights.map((item, idx) => (
                  <Link 
                    key={item.id} 
                    href="/insights" 
                    className="group flex gap-6 items-start pb-10 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-all p-4 -m-4"
                  >
                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden border border-gray-100">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div>
                      <h4 className="font-headline font-bold text-lg mb-2 leading-tight group-hover:text-primary transition-colors line-clamp-2">
                        {item.title}
                      </h4>
                      <p className="text-gray-400 text-sm line-clamp-2 mb-3">
                        {item.teaser}
                      </p>
                      <span className="text-[10px] font-bold text-gray-300 tracking-widest uppercase">{item.readTime}</span>
                    </div>
                  </Link>
                ))}
                
                <Link href="/insights">
                  <Button variant="outline" className="w-full h-14 border-gray-200 text-xs font-bold tracking-widest uppercase hover:bg-primary hover:text-white transition-all rounded-none mt-4">
                    VIEW ALL INSIGHTS →
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 bg-[#111111] text-white text-center px-6 overflow-hidden relative">
          <div className="absolute inset-0 opacity-10 grayscale">
             <Image 
              src="https://picsum.photos/seed/australia-pattern/1920/1080" 
              alt="Pattern" 
              fill 
              className="object-cover" 
            />
          </div>
          <div className="relative z-30">
            <h2 className="font-headline font-extrabold text-4xl md:text-6xl mb-8 uppercase tracking-tighter">READY TO MOVE?</h2>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold px-12 h-16 text-lg rounded-none uppercase tracking-[0.2em]">
                LIST YOUR PROPERTY
              </Button>
              <Link href="/search">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black font-bold px-12 h-16 text-lg rounded-none uppercase tracking-[0.2em]">
                  FIND A RESIDENCE
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
