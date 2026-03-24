
import Image from "next/image";
import { Bed, Bath, Car, Maximize, MapPin, Share2, Heart, ShieldCheck, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import AgentSidebar from "@/components/agent-sidebar";
import InspectionScheduler from "@/components/inspection-scheduler";
import { generatePropertyStory } from "@/ai/flows/ai-generated-property-story";

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
      "https://picsum.photos/seed/p2/800/600",
      "https://picsum.photos/seed/p3/800/600",
      "https://picsum.photos/seed/p4/800/600",
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

  // Simple Australian Stamp Duty estimate (simplified for UI)
  const stampDuty = Math.round(property.price * 0.05);

  return (
    <div className="pt-[72px] bg-white">
      {/* Gallery Header */}
      <div className="grid grid-cols-4 grid-rows-2 h-[600px] gap-2 p-2">
        <div className="col-span-2 row-span-2 relative group overflow-hidden">
          <Image src={property.images[0]} alt="Hero" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute bottom-6 left-6 flex gap-3">
             <Button className="bg-white/90 backdrop-blur-md text-black hover:bg-white font-bold rounded-none px-6">
                <PlayCircle className="w-4 h-4 mr-2" /> VIRTUAL TOUR
             </Button>
          </div>
        </div>
        <div className="relative group overflow-hidden">
          <Image src={property.images[1]} alt="Interior" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
        </div>
        <div className="relative group overflow-hidden">
          <Image src={property.images[2]} alt="Interior" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
        </div>
        <div className="col-span-2 relative group overflow-hidden">
          <Image src={property.images[3]} alt="Garden" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black font-bold px-8 py-6 rounded-none">VIEW ALL 24 PHOTOS</Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-start mb-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-primary/10 text-primary px-3 py-1 text-[10px] font-bold tracking-widest flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> VERIFIED LISTING
                  </div>
                  <div className="bg-gray-100 text-gray-500 px-3 py-1 text-[10px] font-bold tracking-widest">FOR SALE</div>
                </div>
                <h1 className="font-headline font-extrabold text-5xl mb-2">{property.address}</h1>
                <p className="text-xl text-gray-400 font-bold tracking-widest uppercase mb-6 flex items-center gap-2">
                  <MapPin className="w-5 h-5" /> {property.suburb}
                </p>
                <div className="flex items-center gap-8 py-6 border-y border-gray-100">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-1">PRICE GUIDE</span>
                    <span className="text-3xl font-extrabold">${property.price.toLocaleString()} AUD</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Bed className="w-6 h-6 text-gray-300" />
                      <span className="font-bold text-lg">{property.beds}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bath className="w-6 h-6 text-gray-300" />
                      <span className="font-bold text-lg">{property.baths}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Car className="w-6 h-6 text-gray-300" />
                      <span className="font-bold text-lg">{property.cars}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Maximize className="w-6 h-6 text-gray-300" />
                      <span className="font-bold text-lg">{property.area}m<sup>2</sup></span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="rounded-none border-gray-200"><Share2 className="w-4 h-4" /></Button>
                <Button variant="outline" size="icon" className="rounded-none border-gray-200"><Heart className="w-4 h-4" /></Button>
              </div>
            </div>

            {/* Property Story */}
            <div className="mb-16">
              <h2 className="font-headline font-extrabold text-3xl mb-8 uppercase tracking-tighter">THE PROPERTY STORY</h2>
              <div className="prose max-w-none text-gray-600 leading-relaxed font-body text-lg whitespace-pre-wrap">
                {story}
              </div>
            </div>

            {/* Upfront Costs */}
            <div className="mb-16 p-8 bg-gray-50 border border-gray-100">
              <h3 className="font-headline font-bold text-2xl mb-6">UPFRONT COST BREAKDOWN</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-4 border-b border-gray-200">
                  <span className="text-gray-600">Property Price</span>
                  <span className="font-bold">${property.price.toLocaleString()} AUD</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-gray-200">
                  <span className="text-gray-600 flex items-center gap-2">Stamp Duty Estimate <span className="text-[10px] bg-gray-200 px-2 py-0.5 rounded-full">NSW</span></span>
                  <span className="font-bold text-destructive">+ ${stampDuty.toLocaleString()} AUD</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-gray-200">
                  <span className="text-gray-600">Transfer Fees & Legal</span>
                  <span className="font-bold text-destructive">+ $2,500 AUD</span>
                </div>
                <div className="flex justify-between items-center pt-6">
                  <span className="text-xl font-headline font-bold">TOTAL ESTIMATED COST</span>
                  <span className="text-3xl font-headline font-extrabold text-primary">${(property.price + stampDuty + 2500).toLocaleString()} AUD</span>
                </div>
              </div>
              <p className="mt-6 text-xs text-gray-400 italic">Disclaimer: These figures are estimates only. Please consult with a financial advisor or legal professional for exact calculations.</p>
            </div>

            {/* Scheduler */}
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
