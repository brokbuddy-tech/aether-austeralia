
"use client";

import Image from "next/image";
import Link from "next/link";
import { Bed, Bath, Car, Maximize } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PropertyProps {
  id: string;
  image: string;
  address: string;
  suburb: string;
  price: string;
  beds: number;
  baths: number;
  cars: number;
  area: number;
  agent: string;
}

export default function PropertyCard({ property }: { property: PropertyProps }) {
  return (
    <Link href={`/property/${property.id}`} className="group relative block overflow-hidden bg-white shadow-sm hover:shadow-2xl transition-all duration-500">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={property.image}
          alt={property.address}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          data-ai-hint="Luxury Australian Property"
        />
        
        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge className="bg-[#111111] text-white rounded-none font-bold text-[10px] tracking-widest">JUST LISTED</Badge>
          <Badge className="bg-primary text-white rounded-none font-bold text-[10px] tracking-widest uppercase">Verified</Badge>
        </div>

        {/* Stats Overlay */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-4 bg-white/20 backdrop-blur-md p-3 border border-white/30 text-white rounded-sm">
          <div className="flex items-center gap-1.5">
            <Bed className="w-4 h-4" />
            <span className="font-bold text-sm">{property.beds}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="w-4 h-4" />
            <span className="font-bold text-sm">{property.baths}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Car className="w-4 h-4" />
            <span className="font-bold text-sm">{property.cars}</span>
          </div>
          <div className="flex items-center gap-1.5 ml-auto">
            <Maximize className="w-4 h-4" />
            <span className="font-bold text-sm">{property.area}m<sup>2</sup></span>
          </div>
        </div>

        {/* Agent Reveal */}
        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-white px-6 py-2 rounded-none text-xs font-bold tracking-[0.2em] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            VIEW WITH {property.agent.toUpperCase()}
          </div>
        </div>
      </div>

      <div className="p-6">
        <h4 className="font-headline font-bold text-lg mb-1 group-hover:text-primary transition-colors">{property.address}</h4>
        <p className="text-gray-500 text-sm mb-4 uppercase tracking-widest font-bold">{property.suburb}</p>
        <p className="font-headline font-extrabold text-2xl text-[#111111]">${property.price} AUD</p>
      </div>
    </Link>
  );
}
