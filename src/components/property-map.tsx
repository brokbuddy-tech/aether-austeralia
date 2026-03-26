
"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, School, Train, ShoppingBag, ChevronRight, Plus, Minus } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface PropertyMapProps {
  address: string;
  suburb: string;
}

export default function PropertyMap({ address, suburb }: PropertyMapProps) {
  const mapPlaceholder = PlaceHolderImages.find(img => img.id === 'property-map');
  const [activeTab, setActiveTab] = useState<'school' | 'transit' | 'lifestyle'>('school');
  const [isExpanded, setIsExpanded] = useState(false);

  const neighborhoodData = {
    school: {
      title: "Elite Schooling",
      items: [
        { name: "Mosman Public School", type: "Primary", distance: "450m" },
        { name: "Mosman High School", type: "Secondary", distance: "800m" },
        { name: "Queenwood School for Girls", type: "Private", distance: "1.2km" },
        { name: "Only About Children Mosman", type: "Childcare", distance: "300m" },
        { name: "Blessed Sacrament Catholic Primary", type: "Religious", distance: "950m" },
        { name: "Beauty Point Public School", type: "Primary", distance: "2.1km" },
        { name: "Middle Harbour Public School", type: "Primary", distance: "1.8km" },
        { name: "St Therese's Catholic Primary", type: "Religious", distance: "1.5km" },
      ]
    },
    transit: {
      title: "Transit Connectivity",
      items: [
        { name: "Spit Junction Bus Interchange", type: "Bus", distance: "250m" },
        { name: "Mosman Bay Ferry Wharf", type: "Ferry", distance: "1.5km" },
        { name: "Military Rd at Avenue Rd", type: "Bus Stop", distance: "150m" },
        { name: "Neutral Bay Station", type: "Train", distance: "3.2km" },
        { name: "South Mosman Wharf", type: "Ferry", distance: "1.8km" },
        { name: "Taronga Zoo Wharf", type: "Ferry", distance: "2.5km" },
        { name: "North Sydney Station", type: "Train", distance: "4.5km" },
        { name: "Cremorne Point Wharf", type: "Ferry", distance: "2.2km" },
      ]
    },
    lifestyle: {
      title: "Lifestyle Enclave",
      items: [
        { name: "Bridgepoint Shopping Centre", type: "Mall", distance: "400m" },
        { name: "Mosman Village", type: "Boutiques", distance: "350m" },
        { name: "Fourth Village Providore", type: "Market", distance: "500m" },
        { name: "Balmoral Beach", type: "Coastal", distance: "1.8km" },
        { name: "Taronga Zoo", type: "Leisure", distance: "2.5km" },
        { name: "Chinaman's Beach", type: "Coastal", distance: "2.1km" },
        { name: "Mosman RSL", type: "Dining", distance: "600m" },
        { name: "Rawson Park", type: "Park", distance: "1.1km" },
      ]
    }
  };

  const currentItems = neighborhoodData[activeTab].items;
  const displayedItems = isExpanded ? currentItems : currentItems.slice(0, 4);

  return (
    <div className="mt-16 pt-16 border-t border-gray-100">
      <div className="mb-8">
        <h3 className="text-[11px] font-bold text-gray-400 tracking-[0.4em] uppercase mb-2">
          LOCATION
        </h3>
        <p className="text-xl font-medium text-gray-700">{address}, {suburb}</p>
      </div>

      <div className="relative w-full aspect-[21/9] overflow-hidden bg-gray-100 shadow-sm border border-gray-100 mb-12">
        <Image
          src={mapPlaceholder?.imageUrl || "https://picsum.photos/seed/map-fallback/1200/600"}
          alt="Property Location Map"
          fill
          className="object-cover grayscale-[0.6] contrast-[1.1] opacity-80"
          data-ai-hint={mapPlaceholder?.imageHint || "City Map"}
        />
        <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-primary animate-ping rounded-full opacity-30" />
            <div className="relative bg-white p-2.5 rounded-full shadow-2xl border border-primary/20">
              <MapPin className="w-6 h-6 text-primary fill-primary/10" />
            </div>
          </div>
        </div>
      </div>

      {/* Neighborhood Highlights Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <button 
          onClick={() => {
            setActiveTab('school');
            setIsExpanded(false);
          }}
          className={cn(
            "flex gap-4 items-center p-5 border transition-all text-left group",
            activeTab === 'school' ? "border-primary bg-primary/5 shadow-md" : "border-gray-100 bg-white hover:border-gray-200"
          )}
        >
          <div className={cn(
            "w-10 h-10 flex items-center justify-center flex-shrink-0 transition-colors",
            activeTab === 'school' ? "text-primary" : "text-gray-400 group-hover:text-primary/60"
          )}>
            <School className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-[10px] tracking-widest uppercase text-[#111111]">Schooling</h4>
            <p className="text-[9px] text-gray-400 uppercase font-bold">Local Education</p>
          </div>
        </button>
        
        <button 
          onClick={() => {
            setActiveTab('transit');
            setIsExpanded(false);
          }}
          className={cn(
            "flex gap-4 items-center p-5 border transition-all text-left group",
            activeTab === 'transit' ? "border-primary bg-primary/5 shadow-md" : "border-gray-100 bg-white hover:border-gray-200"
          )}
        >
          <div className={cn(
            "w-10 h-10 flex items-center justify-center flex-shrink-0 transition-colors",
            activeTab === 'transit' ? "text-primary" : "text-gray-400 group-hover:text-primary/60"
          )}>
            <Train className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-[10px] tracking-widest uppercase text-[#111111]">Transit</h4>
            <p className="text-[9px] text-gray-400 uppercase font-bold">Connectivity</p>
          </div>
        </button>

        <button 
          onClick={() => {
            setActiveTab('lifestyle');
            setIsExpanded(false);
          }}
          className={cn(
            "flex gap-4 items-center p-5 border transition-all text-left group",
            activeTab === 'lifestyle' ? "border-primary bg-primary/5 shadow-md" : "border-gray-100 bg-white hover:border-gray-200"
          )}
        >
          <div className={cn(
            "w-10 h-10 flex items-center justify-center flex-shrink-0 transition-colors",
            activeTab === 'lifestyle' ? "text-primary" : "text-gray-400 group-hover:text-primary/60"
          )}>
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-[10px] tracking-widest uppercase text-[#111111]">Lifestyle</h4>
            <p className="text-[9px] text-gray-400 uppercase font-bold">Amenities</p>
          </div>
        </button>
      </div>

      {/* Neighborhood List */}
      <div className="bg-gray-50/50 border border-gray-100 p-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
        <h5 className="font-headline font-extrabold text-sm uppercase tracking-tighter mb-6 flex items-center gap-2">
          Nearest {neighborhoodData[activeTab].title} <ChevronRight className="w-4 h-4 text-primary" />
        </h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          {displayedItems.map((item, idx) => (
            <div key={idx} className="flex justify-between items-end border-b border-gray-200 pb-3 group">
              <div>
                <p className="text-[10px] font-bold text-primary tracking-widest uppercase mb-1">{item.type}</p>
                <p className="text-sm font-bold text-gray-800 group-hover:text-black transition-colors">{item.name}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-gray-400 uppercase">{item.distance} away</span>
              </div>
            </div>
          ))}
        </div>

        {currentItems.length > 4 && (
          <div className="mt-8 flex justify-center">
            <Button 
              variant="outline" 
              onClick={() => setIsExpanded(!isExpanded)}
              className="rounded-none border-gray-300 text-[9px] font-bold tracking-[0.3em] uppercase h-10 px-8 hover:bg-black hover:text-white transition-all"
            >
              {isExpanded ? (
                <>SHOW LESS <Minus className="w-3 h-3 ml-2" /></>
              ) : (
                <>SHOW MORE <Plus className="w-3 h-3 ml-2" /></>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
