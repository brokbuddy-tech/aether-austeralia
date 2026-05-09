import Image from "next/image";
import { Bed, Bath, Car, Maximize, MapPin, Heart, ShieldCheck, PlayCircle, Info, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import AgentSidebar from "@/components/agent-sidebar";
import InspectionScheduler from "@/components/inspection-scheduler";
import AuctionBlock from "@/components/auction-block";
import PropertyMap from "@/components/property-map";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import PropertyStory from "@/components/property-story";
import PropertyShare from "@/components/property-share";
import EnergyEfficiencyRating from "@/components/energy-efficiency-rating";
import InternetAvailability from "@/components/internet-availability";
import { getPropertyById } from "@/lib/api";
import { getRequestAgencySlug } from "@/lib/server-agency";
import { notFound } from "next/navigation";

export default async function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const agencySlug = await getRequestAgencySlug();
  const propertyData = await getPropertyById(id, agencySlug);
  if (!propertyData) {
    notFound();
  }

  const images = propertyData.images.length > 0
    ? propertyData.images
    : [
        `https://picsum.photos/seed/prop-${id}-1/1200/800`,
        `https://picsum.photos/seed/prop-${id}-2/800/800`,
        `https://picsum.photos/seed/prop-${id}-3/800/800`,
        `https://picsum.photos/seed/prop-${id}-4/800/800`,
      ];

  const story = propertyData.description;

  return (
    <div className="pt-[72px] bg-white min-h-screen font-body text-[13px]">
      {/* Navigation Header */}
      <div className="sticky top-[72px] z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 py-2 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href={`/search?type=${propertyData.transactionType === "RENT" ? "rent" : propertyData.status === "SOLD" ? "sold" : "buy"}`}>
            <Button variant="ghost" className="text-[8px] font-bold tracking-widest uppercase flex items-center gap-2 hover:bg-transparent hover:text-primary p-0">
              <ArrowLeft className="w-3 h-3" /> BACK TO SEARCH
            </Button>
          </Link>
          <div className="flex gap-2">
            <PropertyShare address={`${propertyData.address}, ${propertyData.suburb}`} />
            <Button variant="outline" size="sm" className="rounded-none border-gray-200 text-[8px] font-bold tracking-widest uppercase h-7 px-3">
              <Heart className="w-2.5 h-2.5 mr-1.5" /> SAVE
            </Button>
          </div>
        </div>
      </div>

      {/* Hero Bento Gallery */}
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-1 px-1 md:h-[65vh] min-h-[450px]">
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
          <div className="absolute inset-0 bg-black/5 transition-opacity group-hover:opacity-0" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Button 
              className="bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white hover:text-black font-bold rounded-full px-6 h-11 text-xs shadow-2xl transition-all"
            >
              <PlayCircle className="w-4 h-4 mr-2.5" /> 360° VIRTUAL TOUR
            </Button>
          </div>
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge className="bg-primary text-white rounded-none px-2 py-0.5 font-bold text-[7px] tracking-widest border-none shadow-lg uppercase">AETHER EXCLUSIVE</Badge>
          </div>
        </div>

        {/* Vertical Detail Stack */}
        <div className="hidden md:grid md:col-span-4 grid-rows-2 gap-1">
          <div className="relative group overflow-hidden bg-gray-100">
            <Image 
              src={images[1]} 
              alt="Interior View" 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-105" 
            />
          </div>
          <div className="relative group overflow-hidden bg-gray-100">
            <Image 
              src={images[2]} 
              alt="Master Bedroom" 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-105" 
            />
            <div className="absolute bottom-3 right-3 z-10">
              <Button className="bg-white/80 backdrop-blur-md text-black border-none font-bold text-[8px] tracking-widest rounded-none hover:bg-white h-8 px-4 shadow-lg">
                VIEW ALL 24 PHOTOS
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Column */}
          <div className="lg:col-span-8">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <Badge variant="outline" className="border-primary/10 text-primary rounded-none px-1.5 py-0.5 text-[7px] font-bold tracking-widest uppercase bg-primary/5">
                  {propertyData.type}
                </Badge>
                <div className="h-px flex-1 bg-gray-100" />
              </div>

              {/* Price Details */}
              <div className="mb-4">
                <p className="text-2xl font-headline font-extrabold text-[#B8860B] tracking-tighter leading-none">
                  ${propertyData.price.toLocaleString()} <span className="text-[9px] text-gray-400 tracking-widest ml-1">AUD</span>
                </p>
              </div>

              <h1 className="font-headline font-extrabold text-base md:text-lg mb-1.5 tracking-tighter text-[#111111] leading-none uppercase">
                {propertyData.address}
              </h1>
              <p className="text-[8px] md:text-[9px] text-gray-400 font-bold tracking-[0.2em] uppercase mb-6 flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-primary" /> {propertyData.suburb}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-gray-100">
                <div className="space-y-1">
                  <span className="text-[6px] font-bold text-gray-400 tracking-[0.2em] uppercase block">BEDROOMS</span>
                  <div className="flex items-center gap-1.5">
                    <Bed className="w-3.5 h-3.5 text-primary/30" />
                    <span className="font-extrabold text-sm">{propertyData.beds}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-[6px] font-bold text-gray-400 tracking-[0.2em] uppercase block">BATHROOMS</span>
                  <div className="flex items-center gap-1.5">
                    <Bath className="w-3.5 h-3.5 text-primary/30" />
                    <span className="font-extrabold text-sm">{propertyData.baths}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-[6px] font-bold text-gray-400 tracking-[0.2em] uppercase block">CAR SPACES</span>
                  <div className="flex items-center gap-1.5">
                    <Car className="w-3.5 h-3.5 text-primary/30" />
                    <span className="font-extrabold text-sm">{propertyData.cars}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-[6px] font-bold text-gray-400 tracking-[0.2em] uppercase block">AREA</span>
                  <div className="flex items-center gap-1.5">
                    <Maximize className="w-3.5 h-3.5 text-primary/30" />
                    <span className="font-extrabold text-sm">{propertyData.area}m<sup>2</sup></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Amenities Grid */}
            <div className="mb-12">
              <h3 className="text-[8px] font-bold text-gray-400 tracking-[0.4em] uppercase mb-5">PREMIUM FEATURES</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { label: "Solar Energy System", icon: <Info className="w-3 h-3" /> },
                  { label: "Designer Kitchen", icon: <Info className="w-3 h-3" /> },
                  { label: "Infinity Pool", icon: <Info className="w-3 h-3" /> },
                  { label: "Smart Home Tech", icon: <Info className="w-3 h-3" /> },
                  { label: "Wine Cellar", icon: <Info className="w-3 h-3" /> },
                  { label: "High-Key Lighting", icon: <Info className="w-3 h-3" /> },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-3 bg-gray-50 border border-gray-100">
                    <div className="text-primary">{item.icon}</div>
                    <span className="text-[11px] font-bold tracking-tight uppercase">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Generated Narrative Story Component */}
            <PropertyStory story={story} />

            {/* Energy Efficiency Rating Section */}
            <EnergyEfficiencyRating />

            {/* Internet Availability Section */}
            <InternetAvailability address={propertyData.address} suburb={propertyData.suburb} />

            <InspectionScheduler />
            
            {/* Auction Details Section */}
            <AuctionBlock />

            {/* Location Map Section */}
            <PropertyMap
              address={propertyData.address}
              suburb={propertyData.suburb}
              latitude={propertyData.latitude}
              longitude={propertyData.longitude}
            />
          </div>

          {/* Sticky Action Sidebar */}
          <div className="lg:col-span-4 relative">
            <div className="sticky top-24 space-y-6">
              <AgentSidebar propertyId={id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
