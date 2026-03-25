
import Image from "next/image";
import FilterBar from "@/components/filter-bar";
import PropertyCard from "@/components/property-card";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function SearchPage() {
  const searchHeaderImage = PlaceHolderImages.find(img => img.id === 'search-header');

  const properties = [
    { id: "1", image: "https://picsum.photos/seed/lux-house-1/800/600", address: "14 Marine Drive", suburb: "MOSMAN, NSW", price: "4,250,000", beds: 4, baths: 3, cars: 2, area: 420, agent: "Marcus Thorne" },
    { id: "2", image: "https://picsum.photos/seed/lux-apt-2/800/600", address: "88 Collins Street", suburb: "MELBOURNE, VIC", price: "2,100,000", beds: 2, baths: 2, cars: 1, area: 110, agent: "Sarah Jenkins" },
    { id: "3", image: "https://picsum.photos/seed/lux-estate-3/800/600", address: "22 Ocean View Pde", suburb: "BYRON BAY, NSW", price: "8,900,000", beds: 5, baths: 4, cars: 4, area: 1200, agent: "David Beck" },
    { id: "4", image: "https://picsum.photos/seed/lux-villa-4/800/600", address: "55 The Esplanade", suburb: "GOLD COAST, QLD", price: "1,850,000", beds: 3, baths: 2, cars: 2, area: 180, agent: "Sarah Jenkins" },
    { id: "5", image: "https://picsum.photos/seed/lux-terrace-5/800/600", address: "10 Terrace St", suburb: "PADDINGTON, NSW", price: "3,400,000", beds: 3, baths: 2, cars: 0, area: 150, agent: "Marcus Thorne" },
    { id: "6", image: "https://picsum.photos/seed/lux-acreage-6/800/600", address: "Acreage Lot 9", suburb: "MALENY, QLD", price: "2,750,000", beds: 4, baths: 3, cars: 6, area: 4500, agent: "David Beck" },
  ];

  return (
    <div className="pt-[72px] bg-gray-50 min-h-screen pb-24">
      {/* Header with Background Image */}
      <div className="relative py-20 px-6 border-b border-gray-100 overflow-hidden text-white">
        <Image
          src={searchHeaderImage?.imageUrl || "https://picsum.photos/seed/search-header-fallback/1920/400"}
          alt={searchHeaderImage?.description || "Search Results"}
          fill
          className="object-cover z-0"
          priority
          data-ai-hint={searchHeaderImage?.imageHint || "Luxury Street"}
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] z-10" />
        
        <div className="relative z-20 max-w-7xl mx-auto">
          <h1 className="font-headline font-extrabold text-4xl md:text-5xl mb-2 tracking-tighter uppercase">Properties for Sale in Australia</h1>
          <p className="text-gray-200 font-body text-lg">Found {properties.length} results matching your search</p>
        </div>
      </div>
      
      <FilterBar />

      <div className="max-w-7xl mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Button variant="outline" className="border-2 border-black rounded-none px-12 h-14 font-bold tracking-widest hover:bg-black hover:text-white transition-all">
            LOAD MORE PROPERTIES
          </Button>
        </div>
      </div>
    </div>
  );
}
