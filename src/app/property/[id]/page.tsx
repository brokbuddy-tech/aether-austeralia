
import Image from "next/image";
import { Bed, Bath, Car, Maximize, MapPin, Share2, Heart, ShieldCheck, PlayCircle, Info, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import AgentSidebar from "@/components/agent-sidebar";
import InspectionScheduler from "@/components/inspection-scheduler";
import { generatePropertyStory } from "@/ai/flows/ai-generated-property-story";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

// Mock data fetcher to make the page feel connected
const getPropertyData = (id: string) => {
  const properties = [
    { id: "1", address: "14 Marine Drive", suburb: "MOSMAN, NSW", price: 4250000, beds: 4, baths: 3, cars: 2, area: 420, type: "House" as const },
    { id: "2", address: "88 Collins Street", suburb: "MELBOURNE, VIC", price: 2100000, beds: 2, baths: 2, cars: 1, area: 110, type: "Apartment" as const },
    { id: "3", address: "22 Ocean View Pde", suburb: "BYRON BAY, NSW", price: 8900000, beds: 5, baths: 4, cars: 4, area: 1200, type: "House" as const },
    { id: "4", address: "55 The Esplanade", suburb: "GOLD COAST, QLD", price: 1850000, beds: 3, baths: 2, cars: 2, area: 180, type: "Villa" as const },
    { id: "5", address: "10 Terrace St", suburb: "PADDINGTON, NSW", price: 3400000, beds: 3, baths: 2, cars: 0, area: 150, type: "Townhouse" as const },
    { id: "6", address: "Acreage Lot 9", suburb: "MALENY, QLD", price: 2750000, beds: 4, baths: 3, cars: 6, area: 4500, type: "Acreage" as const },
  ];
  return properties.find(p => p.id === id) || properties[0];
};

export default async function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const propertyData = getPropertyData(id);

  const images = [
    `https://picsum.photos/seed/prop-${id}-1/1200/800`,
    `https://picsum.photos/seed/prop-${id}-2/800/800`,
    `https://picsum.photos/seed/prop-${id}-3/800/800`,
    `https://picsum.photos/seed/prop-${id}-4/800/800`,
    `https://picsum.photos/seed/prop-${id}-5/800/800`,
  ];

  const { story } = await generatePropertyStory({
    address: `${propertyData.address}, ${propertyData.suburb}`,
    propertyType: propertyData.type,
    bedrooms: propertyData.beds,
    bathrooms: propertyData.baths,
    carSpaces: propertyData.cars,
    areaM2: propertyData.area,
    keyFeatures: ["Premium finishes", "Architectural design", "Prime location", "Modern amenities"],
    locationDescription: `Situated in the highly sought-after enclave of ${propertyData.suburb}.`
  });

  const stampDuty = Math.round(propertyData.price * 0.05);

  return (
    <div className="pt-[72px] bg-white min-h-screen">
      {/* Navigation & Actions Header */}
      <div className="sticky top-[72px] z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/search">
            <Button variant="ghost" className="text-[10px] font-bold tracking-widest uppercase flex items-center gap-2 hover:bg-transparent hover:text-primary p-0">
              <ArrowLeft className="w-4 h-4" /> BACK TO SEARCH
            </Button>
          </Link>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="rounded-none border-gray-200 text-[10px] font-bold tracking-widest uppercase h-10 px-6">
              <Share2 className="w-4 h-4 mr-2" /> SHARE
            </Button>
            <Button variant="outline" size="sm" className="rounded-none border-gray-200 text-[10px] font-bold tracking-widest uppercase h-10 px-6">
              <Heart className="w-4 h-4 mr-2" /> SAVE
            </Button>
          </div>
        </div>
      </div>

      {/* Hero Bento Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-2 h-[450px] md:h-[75vh] px-2 pt-2">
        <div className="md:col-span-8 relative group overflow-hidden bg-gray-100">
          <Image 
            src={images[0]} 
            alt="Main Hero Shot" 
            fill 
            className="object-cover transition-transform duration-1000 group-hover:scale-105 group-hover:brightness-105" 
            priority
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Button 
              className="bg-white/10 backdrop-blur-xl border border-white/30 text-white hover:bg-white hover:text-black font-bold rounded-full px-10 h-16 shadow-2xl transition-all group/btn"
            >
              <PlayCircle className="w-8 h-8 mr-3 group-hover/btn:scale-110 transition-transform" /> 360° VIRTUAL TOUR
            </Button>
          </div>
          <div className="absolute top-6 left-6 flex gap-2">
            <Badge className="bg-primary text-white rounded-none px-4 py-1.5 font-bold text-[10px] tracking-widest border-none shadow-lg uppercase">AETHER EXCLUSIVE</Badge>
          </div>
        </div>
        <div className="hidden md:grid md:col-span-4 grid-rows-2 gap-2">
          <div className="relative group overflow-hidden bg-gray-100">
            <Image src={images[1]} alt="Interior View" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="relative group overflow-hidden bg-gray-100">
              <Image src={images[2]} alt="Master Bedroom" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div className="relative group overflow-hidden bg-gray-100">
              <Image src={images[4]} alt="Lifestyle Shot" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-[10px] font-bold tracking-widest uppercase border border-white/50 px-4 py-2">VIEW ALL PHOTOS</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
          {/* Main Detail Section */}
          <div className="lg:col-span-2">
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <Badge variant="outline" className="border-primary/20 text-primary rounded-none px-4 py-1 text-[10px] font-bold tracking-widest uppercase bg-primary/5">
                  {propertyData.type}
                </Badge>
                <div className="h-px flex-1 bg-gray-100" />
              </div>
              <h1 className="font-headline font-extrabold text-5xl md:text-8xl mb-4 tracking-tighter text-[#111111] leading-none uppercase">{propertyData.address}</h1>
              <p className="text-xl md:text-2xl text-gray-400 font-bold tracking-[0.2em] uppercase mb-12 flex items-center gap-3">
                <MapPin className="w-6 h-6 text-primary" /> {propertyData.suburb}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-12 py-16 border-y border-gray-100">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-gray-400 tracking-[0.3em] uppercase block">BEDROOMS</span>
                  <div className="flex items-center gap-4">
                    <Bed className="w-8 h-8 text-primary/40" />
                    <span className="font-extrabold text-4xl">{propertyData.beds}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-gray-400 tracking-[0.3em] uppercase block">BATHROOMS</span>
                  <div className="flex items-center gap-4">
                    <Bath className="w-8 h-8 text-primary/40" />
                    <span className="font-extrabold text-4xl">{propertyData.baths}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-gray-400 tracking-[0.3em] uppercase block">CAR SPACES</span>
                  <div className="flex items-center gap-4">
                    <Car className="w-8 h-8 text-primary/40" />
                    <span className="font-extrabold text-4xl">{propertyData.cars}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-gray-400 tracking-[0.3em] uppercase block">AREA</span>
                  <div className="flex items-center gap-4">
                    <Maximize className="w-8 h-8 text-primary/40" />
                    <span className="font-extrabold text-4xl">{propertyData.area}m<sup>2</sup></span>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Generated Property Story (The Description) */}
            <div className="mb-24">
              <div className="flex items-center gap-6 mb-12">
                <h2 className="font-headline font-extrabold text-4xl uppercase tracking-tighter">THE PROPERTY STORY</h2>
                <div className="h-px flex-1 bg-gray-100" />
              </div>
              <div className="prose max-w-none text-gray-600 leading-[2.2] font-body text-xl whitespace-pre-wrap">
                {story}
              </div>
              
              <div className="mt-16 flex flex-wrap gap-3">
                {["SUSTAINABLE BUILD", "ARCHITECTURAL GEM", "HIGH GROWTH AREA", "SMART HOME"].map((tag) => (
                  <div key={tag} className="px-6 py-3 bg-gray-50 border border-gray-100 text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                    {tag}
                  </div>
                ))}
              </div>
            </div>

            {/* Investment Breakdown */}
            <div className="mb-24 p-12 bg-[#F8F9FB] border-t-8 border-primary shadow-sm">
              <div className="flex items-center justify-between mb-12">
                <h3 className="font-headline font-extrabold text-3xl uppercase tracking-tighter">FINANCIAL SNAPSHOT</h3>
                <Info className="w-6 h-6 text-gray-300" />
              </div>
              <div className="space-y-8">
                <div className="flex justify-between items-center text-lg">
                  <span className="text-gray-500 font-bold uppercase tracking-widest text-[11px]">Listing Price</span>
                  <span className="font-extrabold text-2xl">${propertyData.price.toLocaleString()} AUD</span>
                </div>
                <div className="flex justify-between items-center text-lg">
                  <span className="text-gray-500 font-bold uppercase tracking-widest text-[11px]">Stamp Duty (EST)</span>
                  <span className="font-extrabold text-2xl text-destructive">+ ${stampDuty.toLocaleString()} AUD</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-10 text-lg">
                  <span className="text-gray-500 font-bold uppercase tracking-widest text-[11px]">Acquisition Fees</span>
                  <span className="font-extrabold text-2xl text-destructive">+ $3,500 AUD</span>
                </div>
                <div className="pt-4">
                  <span className="block text-[10px] font-bold text-gray-400 tracking-[0.4em] uppercase mb-4">TOTAL PROJECTED INVESTMENT</span>
                  <span className="text-6xl md:text-7xl font-headline font-extrabold text-primary tracking-tighter">
                    ${(propertyData.price + stampDuty + 3500).toLocaleString()} <span className="text-xl">AUD</span>
                  </span>
                </div>
              </div>
              <p className="mt-12 text-[10px] text-gray-400 italic tracking-wider border-t border-gray-200 pt-8 leading-relaxed">
                * Figures provided are estimates based on 2026 Australian State guidelines. We recommend consulting with your financial advisor for exact calculations.
              </p>
            </div>

            <InspectionScheduler />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <AgentSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
