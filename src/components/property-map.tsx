
"use client";

import Image from "next/image";
import { MapPin, School, Train, ShoppingBag } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

interface PropertyMapProps {
  address: string;
  suburb: string;
}

export default function PropertyMap({ address, suburb }: PropertyMapProps) {
  const mapPlaceholder = PlaceHolderImages.find(img => img.id === 'property-map');

  return (
    <div className="mt-16 pt-16 border-t border-gray-100">
      <div className="mb-8">
        <h3 className="text-[11px] font-bold text-gray-400 tracking-[0.4em] uppercase mb-2">
          LOCATION
        </h3>
        <p className="text-xl font-medium text-gray-700">{address}, {suburb}</p>
      </div>

      <div className="relative w-full aspect-[21/9] overflow-hidden bg-gray-100 shadow-sm border border-gray-100">
        <Image
          src={mapPlaceholder?.imageUrl || "https://picsum.photos/seed/map-fallback/1200/600"}
          alt="Property Location Map"
          fill
          className="object-cover grayscale-[0.6] contrast-[1.1] opacity-80"
          data-ai-hint={mapPlaceholder?.imageHint || "City Map"}
        />
        <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
        
        {/* Pulsing Pin Indicator */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-primary animate-ping rounded-full opacity-30" />
            <div className="relative bg-white p-2.5 rounded-full shadow-2xl border border-primary/20">
              <MapPin className="w-6 h-6 text-primary fill-primary/10" />
            </div>
          </div>
        </div>
      </div>

      {/* Neighborhood Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        <div className="flex gap-5 items-start p-4 hover:bg-gray-50 transition-colors">
          <div className="w-12 h-12 rounded-none bg-white border border-gray-100 flex items-center justify-center flex-shrink-0 shadow-sm">
            <School className="w-5 h-5 text-primary/60" />
          </div>
          <div>
            <h4 className="font-bold text-[10px] tracking-widest uppercase mb-2 text-[#111111]">Elite Schooling</h4>
            <p className="text-xs text-gray-500 leading-relaxed font-body">
              Within catchment for premier state and private institutions, ensuring world-class education for residents.
            </p>
          </div>
        </div>
        
        <div className="flex gap-5 items-start p-4 hover:bg-gray-50 transition-colors">
          <div className="w-12 h-12 rounded-none bg-white border border-gray-100 flex items-center justify-center flex-shrink-0 shadow-sm">
            <Train className="w-5 h-5 text-primary/60" />
          </div>
          <div>
            <h4 className="font-bold text-[10px] tracking-widest uppercase mb-2 text-[#111111]">Transit Connectivity</h4>
            <p className="text-xs text-gray-500 leading-relaxed font-body">
              Direct ferry and express bus connections to the CBD, providing effortless urban access within minutes.
            </p>
          </div>
        </div>

        <div className="flex gap-5 items-start p-4 hover:bg-gray-50 transition-colors">
          <div className="w-12 h-12 rounded-none bg-white border border-gray-100 flex items-center justify-center flex-shrink-0 shadow-sm">
            <ShoppingBag className="w-5 h-5 text-primary/60" />
          </div>
          <div>
            <h4 className="font-bold text-[10px] tracking-widest uppercase mb-2 text-[#111111]">Lifestyle Enclave</h4>
            <p className="text-xs text-gray-500 leading-relaxed font-body">
              Moments from high-end boutiques, artisan providores, and iconic harbourside fine dining.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
