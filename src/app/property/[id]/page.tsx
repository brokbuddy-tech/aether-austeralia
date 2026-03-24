
import Image from "next/image";
import { Bed, Bath, Car, Maximize, MapPin, Share2, Heart, ShieldCheck, PlayCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import AgentSidebar from "@/components/agent-sidebar";
import InspectionScheduler from "@/components/inspection-scheduler";
import { generatePropertyStory } from "@/ai/flows/ai-generated-property-story";
import { Badge } from "@/components/ui/badge";

export default async function PropertyDetailPage({ params }: { params: { id: string } }) {
  const property = {
    id: params.id,
    address: "14 Marine Drive",
    suburb: "MOSMAN, NSW",
    price: 4250000,
    beds: 4,
    baths: 3,
    cars: 2,
    area: 420,
    type: "House" as const,
    images: [
      "https://picsum.photos/seed/lux-p1/1200/800",
      "https://picsum.photos/seed/lux-p2/800/800",
      "https://picsum.photos/seed/lux-p3/800/800",
      "https://picsum.photos/seed/lux-p4/800/800",
      "https://picsum.photos/seed/location-beach/800/800",
    ]
  };

  const { story } = await generatePropertyStory({
    address: `${property.address}, ${property.suburb}`,
    propertyType: property.type,
    bedrooms: property.beds,
    bathrooms: property.baths,
    carSpaces: property.cars,
    areaM2: property.area,
    keyFeatures: ["Ocean views", "Gourmet kitchen", "Swimming pool", "Walk to beach"],
    locationDescription: "Premier coastal location in Sydney's lower north shore."
  });

  const stampDuty = Math.round(property.price * 0.05);

  return (
    <div className="pt-[72px] bg-white">
      {/* The "Big 5" Gallery Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-2 h-[450px] md:h-[700px] px-2 pt-2">
        <div className="md:col-span-8 relative group overflow-hidden bg-gray-100">
          <Image 
            src={property.images[0]} 
            alt="Main Hero Shot" 
            fill 
            className="object-cover transition-transform duration-1000 group-hover:scale-105 group-hover:brightness-105" 
            priority
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Button 
              className="bg-white/20 backdrop-blur-2xl border border-white/40 text-white hover:bg-white hover:text-black font-bold rounded-full px-10 h-16 shadow-2xl transition-all group/btn"
            >
              <PlayCircle className="w-8 h-8 mr-3 group-hover/btn:scale-110 transition-transform" /> 360° VIRTUAL TOUR
            </Button>
          </div>
          <div className="absolute top-6 left-6 flex gap-2">
            <Badge className="bg-primary text-white rounded-none px-4 py-1.5 font-bold text-[10px] tracking-widest border-none shadow-lg">PREMIUM LISTING</Badge>
          </div>
        </div>
        <div className="hidden md:grid md:col-span-4 grid-rows-2 gap-2">
          <div className="relative group overflow-hidden bg-gray-100">
            <Image src={property.images[1]} alt="Architectural Detail" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="relative group overflow-hidden bg-gray-100">
              <Image src={property.images[2]} alt="Master Suite" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div className="relative group overflow-hidden bg-gray-100">
              <Image src={property.images[4]} alt="Local Area" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1.5 text-[8px] font-extrabold text-white tracking-[0.3em] uppercase border border-white/10">LOCATION SHOT</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-primary/10 text-primary px-4 py-1.5 text-[10px] font-extrabold tracking-[0.2em] flex items-center gap-2 border border-primary/20">
                    <ShieldCheck className="w-3.5 h-3.5" /> REIA VERIFIED
                  </div>
                  <Badge variant="outline" className="border-gray-200 text-gray-400 rounded-none px-4 py-1 text-[10px] font-bold tracking-widest">RESIDENTIAL ESTATE</Badge>
                </div>
                <h1 className="font-headline font-extrabold text-5xl md:text-7xl mb-4 tracking-tighter text-[#111111] leading-none uppercase">{property.address}</h1>
                <p className="text-xl text-gray-400 font-bold tracking-[0.3em] uppercase mb-8 flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-primary" /> {property.suburb}
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-gray-100">
                  <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-4">BEDROOMS</span>
                    <div className="flex items-center gap-3">
                      <Bed className="w-7 h-7 text-primary/30" />
                      <span className="font-extrabold text-3xl">{property.beds}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-4">BATHROOMS</span>
                    <div className="flex items-center gap-3">
                      <Bath className="w-7 h-7 text-primary/30" />
                      <span className="font-extrabold text-3xl">{property.baths}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-4">CAR SPACES</span>
                    <div className="flex items-center gap-3">
                      <Car className="w-7 h-7 text-primary/30" />
                      <span className="font-extrabold text-3xl">{property.cars}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-4">LAND SIZE</span>
                    <div className="flex items-center gap-3">
                      <Maximize className="w-7 h-7 text-primary/30" />
                      <span className="font-extrabold text-3xl">{property.area}m<sup>2</sup></span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 self-end md:self-start">
                <Button variant="outline" size="icon" className="rounded-none w-14 h-14 border-gray-200 hover:bg-gray-50"><Share2 className="w-6 h-6" /></Button>
                <Button variant="outline" size="icon" className="rounded-none w-14 h-14 border-gray-200 hover:bg-gray-50"><Heart className="w-6 h-6" /></Button>
              </div>
            </div>

            <div className="mb-20">
              <div className="flex items-center gap-4 mb-10">
                <h2 className="font-headline font-extrabold text-3xl uppercase tracking-tighter">THE PROPERTY STORY</h2>
                <div className="h-px flex-1 bg-gray-100" />
              </div>
              <div className="prose max-w-none text-gray-600 leading-[2] font-body text-lg whitespace-pre-wrap">
                {story}
              </div>
              
              <div className="mt-12 flex flex-wrap gap-4">
                {["SMART DESIGN", "SOLAR POWERED", "CLIMATE RESILIENT"].map((tag) => (
                  <div key={tag} className="px-5 py-2.5 bg-gray-50 border border-gray-100 text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                    {tag}
                  </div>
                ))}
              </div>
            </div>

            {/* Compliance & Cost Transparency */}
            <div className="mb-20 p-12 bg-[#F5F7FA] border-l-4 border-primary relative overflow-hidden shadow-sm">
              <div className="flex items-center gap-3 mb-10">
                <h3 className="font-headline font-bold text-2xl uppercase tracking-tighter">INVESTMENT BREAKDOWN</h3>
                <Info className="w-5 h-5 text-gray-300" />
              </div>
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-bold text-sm">Listed Property Price</span>
                  <span className="font-extrabold text-xl">${property.price.toLocaleString()} AUD</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-bold text-sm flex items-center gap-2">
                    Estimated Stamp Duty 
                    <Badge variant="secondary" className="bg-gray-200 text-gray-600 rounded-none text-[8px] font-extrabold tracking-widest px-2 py-0.5">NSW 2026</Badge>
                  </span>
                  <span className="font-extrabold text-xl text-destructive">+ ${stampDuty.toLocaleString()} AUD</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-10">
                  <span className="text-gray-500 font-bold text-sm">Transfer & Legal Fees</span>
                  <span className="font-extrabold text-xl text-destructive">+ $2,500 AUD</span>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <span className="block text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-2">TOTAL ESTIMATED INVESTMENT</span>
                    <span className="text-5xl font-headline font-extrabold text-primary">
                      ${(property.price + stampDuty + 2500).toLocaleString()} <span className="text-base">AUD</span>
                    </span>
                  </div>
                </div>
              </div>
              <p className="mt-10 text-[10px] text-gray-400 italic tracking-wide border-t border-gray-200 pt-6">
                * All figures are projected as per 2026 Australian Real Estate Guidelines. Digital staging may have been applied for visualization purposes.
              </p>
            </div>

            <InspectionScheduler />
          </div>

          {/* Sidebar */}
          <div className="relative">
            <AgentSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
