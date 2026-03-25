
import Image from "next/image";
import { Bed, Bath, Car, Maximize, MapPin, Share2, Heart, ShieldCheck, PlayCircle, Info, ArrowLeft, Calendar, MessageSquare, Phone } from "lucide-react";
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
    <div className="pt-[72px] bg-white min-h-screen font-body">
      {/* Navigation Header */}
      <div className="sticky top-[72px] z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 py-3 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/search">
            <Button variant="ghost" className="text-[10px] font-bold tracking-widest uppercase flex items-center gap-2 hover:bg-transparent hover:text-primary p-0">
              <ArrowLeft className="w-4 h-4" /> BACK TO SEARCH
            </Button>
          </Link>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-none border-gray-200 text-[10px] font-bold tracking-widest uppercase h-9 px-4">
              <Share2 className="w-3.5 h-3.5 mr-2" /> SHARE
            </Button>
            <Button variant="outline" size="sm" className="rounded-none border-gray-200 text-[10px] font-bold tracking-widest uppercase h-9 px-4">
              <Heart className="w-3.5 h-3.5 mr-2" /> SAVE
            </Button>
          </div>
        </div>
      </div>

      {/* Hero Bento Gallery */}
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-1 px-1 md:h-[70vh] min-h-[500px]">
        {/* Parallax Hero shot */}
        <div className="md:col-span-8 relative group overflow-hidden bg-gray-100">
          <div className="absolute inset-0 z-0">
            <Image 
              src={images[0]} 
              alt="Main Hero Shot" 
              fill 
              className="object-cover transition-transform duration-[10000ms] ease-linear scale-110 group-hover:scale-100" 
              priority
              data-ai-hint="Luxury Australian Architecture"
            />
          </div>
          <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:opacity-0" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Button 
              className="bg-white/15 backdrop-blur-xl border border-white/30 text-white hover:bg-white hover:text-black font-bold rounded-full px-8 h-14 shadow-2xl transition-all"
            >
              <PlayCircle className="w-6 h-6 mr-3" /> 360° VIRTUAL TOUR
            </Button>
          </div>
          <div className="absolute top-6 left-6 flex gap-2">
            <Badge className="bg-primary text-white rounded-none px-3 py-1 font-bold text-[9px] tracking-widest border-none shadow-lg uppercase">AETHER EXCLUSIVE</Badge>
          </div>
        </div>

        {/* Vertical Detail Stack */}
        <div className="hidden md:grid md:col-span-4 grid-rows-2 gap-1">
          <div className="relative group overflow-hidden bg-gray-100">
            <Image 
              src={images[1]} 
              alt="Interior View" 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-110" 
            />
          </div>
          <div className="relative group overflow-hidden bg-gray-100">
            <Image 
              src={images[2]} 
              alt="Master Bedroom" 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            <div className="absolute bottom-4 right-4 z-10">
              <Button className="bg-white/80 backdrop-blur-md text-black border-none font-bold text-[10px] tracking-widest rounded-none hover:bg-white h-10 px-6 shadow-xl">
                VIEW ALL 24 PHOTOS
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Story Column */}
          <div className="lg:col-span-8">
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <Badge variant="outline" className="border-primary/20 text-primary rounded-none px-3 py-0.5 text-[9px] font-bold tracking-widest uppercase bg-primary/5">
                  {propertyData.type}
                </Badge>
                <div className="h-px flex-1 bg-gray-100" />
              </div>
              <h1 className="font-headline font-extrabold text-4xl md:text-7xl mb-4 tracking-tighter text-[#111111] leading-none uppercase">
                {propertyData.address}
              </h1>
              <p className="text-lg md:text-xl text-gray-400 font-bold tracking-[0.2em] uppercase mb-10 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" /> {propertyData.suburb}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-gray-100">
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-gray-400 tracking-[0.2em] uppercase block">BEDROOMS</span>
                  <div className="flex items-center gap-3">
                    <Bed className="w-6 h-6 text-primary/40" />
                    <span className="font-extrabold text-3xl">{propertyData.beds}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-gray-400 tracking-[0.2em] uppercase block">BATHROOMS</span>
                  <div className="flex items-center gap-3">
                    <Bath className="w-6 h-6 text-primary/40" />
                    <span className="font-extrabold text-3xl">{propertyData.baths}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-gray-400 tracking-[0.2em] uppercase block">CAR SPACES</span>
                  <div className="flex items-center gap-3">
                    <Car className="w-6 h-6 text-primary/40" />
                    <span className="font-extrabold text-3xl">{propertyData.cars}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-gray-400 tracking-[0.2em] uppercase block">AREA</span>
                  <div className="flex items-center gap-3">
                    <Maximize className="w-6 h-6 text-primary/40" />
                    <span className="font-extrabold text-3xl">{propertyData.area}m<sup>2</sup></span>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Generated Narrative Story */}
            <div className="mb-20">
              <h2 className="font-headline font-extrabold text-2xl uppercase tracking-tighter mb-8 text-primary">THE PROPERTY STORY</h2>
              <div className="prose max-w-none text-gray-600 leading-[2] font-body text-lg whitespace-pre-wrap">
                {story}
              </div>
            </div>

            {/* Amenities Grid */}
            <div className="mb-20">
              <h3 className="text-[10px] font-bold text-gray-400 tracking-[0.4em] uppercase mb-8">PREMIUM FEATURES</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {[
                  { label: "Solar Energy System", icon: <Info className="w-4 h-4" /> },
                  { label: "Designer Kitchen", icon: <Info className="w-4 h-4" /> },
                  { label: "Infinity Pool", icon: <Info className="w-4 h-4" /> },
                  { label: "Smart Home Tech", icon: <Info className="w-4 h-4" /> },
                  { label: "Wine Cellar", icon: <Info className="w-4 h-4" /> },
                  { label: "High-Key Lighting", icon: <Info className="w-4 h-4" /> },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-100">
                    <div className="text-primary">{item.icon}</div>
                    <span className="text-xs font-bold tracking-tight uppercase">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Investment Summary */}
            <div className="mb-20 p-10 bg-[#111111] text-white shadow-2xl">
              <div className="flex justify-between items-center mb-10">
                <h3 className="font-headline font-bold text-xl uppercase tracking-tighter text-primary">INVESTMENT SNAPSHOT</h3>
                <Badge className="bg-white/10 text-white rounded-none border-none text-[8px] tracking-[0.2em]">EST. 2026</Badge>
              </div>
              <div className="space-y-6">
                <div className="flex justify-between border-b border-white/5 pb-4">
                  <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Market Price</span>
                  <span className="font-extrabold text-xl">${propertyData.price.toLocaleString()} AUD</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-4">
                  <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Stamp Duty (EST)</span>
                  <span className="font-extrabold text-xl text-primary">+ ${stampDuty.toLocaleString()} AUD</span>
                </div>
                <div className="pt-4">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 text-center">TOTAL PROJECTED INVESTMENT</p>
                  <p className="text-5xl md:text-6xl font-headline font-extrabold text-center tracking-tighter">
                    ${(propertyData.price + stampDuty).toLocaleString()} <span className="text-xs">AUD</span>
                  </p>
                </div>
              </div>
            </div>

            <InspectionScheduler />
          </div>

          {/* Sticky Action Sidebar */}
          <div className="lg:col-span-4 relative">
            <div className="sticky top-24 space-y-6">
              <AgentSidebar />
              
              {/* Inspection Times Block */}
              <div className="bg-gray-50 p-8 border border-gray-100 text-center">
                <h4 className="font-bold text-xs tracking-[0.3em] uppercase mb-4 text-gray-400">OPEN FOR INSPECTION</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                    <div className="text-left">
                      <p className="font-bold text-sm">Saturday, 12 Oct</p>
                      <p className="text-[10px] text-gray-500">10:00 AM - 10:45 AM</p>
                    </div>
                    <Button variant="link" className="text-primary p-0 text-[10px] font-bold uppercase">ADD TO CALENDAR</Button>
                  </div>
                  <div className="flex justify-between items-center pb-3">
                    <div className="text-left">
                      <p className="font-bold text-sm">Wednesday, 16 Oct</p>
                      <p className="text-[10px] text-gray-500">05:00 PM - 05:30 PM</p>
                    </div>
                    <Button variant="link" className="text-primary p-0 text-[10px] font-bold uppercase">ADD TO CALENDAR</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
