
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
      "https://picsum.photos/seed/p1/1200/800",
      "https://picsum.photos/seed/p2/800/800",
      "https://picsum.photos/seed/p3/800/800",
      "https://picsum.photos/seed/p4/800/800",
      "https://picsum.photos/seed/location1/800/800",
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
      {/* "Big 5" Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-2 h-[400px] md:h-[650px] px-2 pt-2">
        <div className="md:col-span-8 relative group overflow-hidden bg-gray-100">
          <Image 
            src={property.images[0]} 
            alt="Main Hero" 
            fill 
            className="object-cover transition-transform duration-1000 group-hover:scale-105" 
            priority
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Button 
              className="bg-white/15 backdrop-blur-xl border border-white/30 text-white hover:bg-white hover:text-black font-bold rounded-full px-8 h-14 pointer-events-auto transition-all shadow-2xl"
            >
              <PlayCircle className="w-6 h-6 mr-3" /> 360° VIRTUAL TOUR
            </Button>
          </div>
          <div className="absolute top-6 left-6 flex gap-2">
            <Badge className="bg-primary text-white rounded-none px-4 py-1 font-bold text-[10px] tracking-widest border-none">FEATURED</Badge>
          </div>
        </div>
        <div className="hidden md:grid md:col-span-4 grid-rows-2 gap-2">
          <div className="relative group overflow-hidden bg-gray-100">
            <Image src={property.images[1]} alt="Interior 1" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="relative group overflow-hidden bg-gray-100">
              <Image src={property.images[2]} alt="Interior 2" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="relative group overflow-hidden bg-gray-100">
              <Image src={property.images[4]} alt="Location Shot" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 text-[8px] font-extrabold text-white tracking-[0.2em]">LOCATION SHOT</div>
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
                    <ShieldCheck className="w-3.5 h-3.5" /> VERIFIED LISTING
                  </div>
                  <Badge variant="outline" className="border-gray-200 text-gray-400 rounded-none px-4 py-1 text-[10px] font-bold tracking-widest">RESIDENTIAL</Badge>
                </div>
                <h1 className="font-headline font-extrabold text-5xl md:text-6xl mb-4 tracking-tighter text-[#111111]">{property.address}</h1>
                <p className="text-xl text-gray-400 font-bold tracking-[0.2em] uppercase mb-8 flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-primary" /> {property.suburb}
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-gray-100">
                  <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-3">BEDROOMS</span>
                    <div className="flex items-center gap-3">
                      <Bed className="w-6 h-6 text-primary/40" />
                      <span className="font-extrabold text-2xl">{property.beds}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-3">BATHROOMS</span>
                    <div className="flex items-center gap-3">
                      <Bath className="w-6 h-6 text-primary/40" />
                      <span className="font-extrabold text-2xl">{property.baths}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-3">CAR SPACES</span>
                    <div className="flex items-center gap-3">
                      <Car className="w-6 h-6 text-primary/40" />
                      <span className="font-extrabold text-2xl">{property.cars}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-3">FLOOR AREA</span>
                    <div className="flex items-center gap-3">
                      <Maximize className="w-6 h-6 text-primary/40" />
                      <span className="font-extrabold text-2xl">{property.area}m<sup>2</sup></span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 self-end md:self-start">
                <Button variant="outline" size="icon" className="rounded-none w-12 h-12 border-gray-200 hover:bg-gray-50"><Share2 className="w-5 h-5" /></Button>
                <Button variant="outline" size="icon" className="rounded-none w-12 h-12 border-gray-200 hover:bg-gray-50"><Heart className="w-5 h-5" /></Button>
              </div>
            </div>

            <div className="mb-20">
              <div className="flex items-center gap-4 mb-10">
                <h2 className="font-headline font-extrabold text-3xl uppercase tracking-tighter">THE PROPERTY STORY</h2>
                <div className="h-px flex-1 bg-gray-100" />
              </div>
              <div className="prose max-w-none text-gray-600 leading-[1.8] font-body text-lg whitespace-pre-wrap">
                {story}
              </div>
              
              <div className="mt-12 flex flex-wrap gap-4">
                {["SMART HOME", "SOLAR POWERED", "WATER RECYCLING"].map((tag) => (
                  <div key={tag} className="px-4 py-2 bg-gray-50 border border-gray-100 text-[10px] font-bold tracking-widest text-gray-400">
                    {tag}
                  </div>
                ))}
              </div>
            </div>

            {/* Upfront Costs with local Navy styling */}
            <div className="mb-20 p-10 bg-gray-50 border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#111111]" />
              <div className="flex items-center gap-3 mb-8">
                <h3 className="font-headline font-bold text-2xl uppercase tracking-tighter">UPFRONT COST BREAKDOWN</h3>
                <Info className="w-4 h-4 text-gray-300" />
              </div>
              <div className="space-y-6">
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-500 font-bold text-sm">Property Price</span>
                  <span className="font-extrabold text-lg">${property.price.toLocaleString()} AUD</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-500 font-bold text-sm flex items-center gap-2">
                    Stamp Duty Estimate 
                    <Badge variant="secondary" className="bg-gray-200 text-gray-500 hover:bg-gray-200 rounded-none text-[8px] font-extrabold tracking-widest">NSW</Badge>
                  </span>
                  <span className="font-extrabold text-lg text-destructive">+ ${stampDuty.toLocaleString()} AUD</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200 pb-8">
                  <span className="text-gray-500 font-bold text-sm">Transfer Fees & Legal</span>
                  <span className="font-extrabold text-lg text-destructive">+ $2,500 AUD</span>
                </div>
                <div className="flex justify-between items-end pt-4">
                  <div>
                    <span className="block text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-1">TOTAL ESTIMATED INVESTMENT</span>
                    <span className="text-4xl font-headline font-extrabold text-primary">
                      ${(property.price + stampDuty + 2500).toLocaleString()} <span className="text-sm">AUD</span>
                    </span>
                  </div>
                </div>
              </div>
              <p className="mt-8 text-[10px] text-gray-400 italic tracking-wide">
                * Figures provided for illustrative purposes under 2026 Australian Real Estate Guidelines. Virtual staging may have been applied to some photography.
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
