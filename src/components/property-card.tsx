import Image from "next/image";
import Link from "next/link";
import { Bed, Bath, Car, Maximize } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PropertyProps {
  id: string;
  image: string;
  address: string;
  title?: string;
  suburb: string;
  price: string;
  beds: number;
  baths: number;
  cars: number;
  area: number;
  agent: string;
  badgeLabel?: string;
  transactionType?: string;
  status?: string;
}

export default function PropertyCard({ property }: { property: PropertyProps }) {
  // Determine badge label based on search type
  let badgeLabel = property.badgeLabel || "BUY";
  if (!property.badgeLabel) {
    if (property.transactionType === "RENT") {
      badgeLabel = "RENT";
    } else if (property.status?.toUpperCase() === "SOLD") {
      badgeLabel = "SOLD";
    }
  }

  return (
    <Link 
      href={`/property/${property.id}`} 
      className="group relative block overflow-hidden bg-white shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={property.image}
          alt={property.title || property.address}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105 group-hover:brightness-105"
          data-ai-hint="Luxury Australian Property"
          priority={false}
        />
        
        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex gap-2 z-10">
          <Badge className="bg-[#111111] text-white rounded-none font-bold text-[9px] tracking-[0.2em] uppercase px-3 py-1">
            {badgeLabel}
          </Badge>
          <Badge className="bg-primary text-white rounded-none font-bold text-[9px] tracking-[0.2em] uppercase px-3 py-1">
            AETHER VERIFIED
          </Badge>
        </div>

        {/* Minimalist Metadata Overlay (Bottom-Left) */}
        <div className="absolute bottom-4 left-4 flex items-center gap-4 bg-[#111111]/90 backdrop-blur-md px-4 py-2.5 text-white border border-white/10 shadow-xl">
          <div className="flex items-center gap-1.5">
            <Bed className="w-3.5 h-3.5 opacity-80" />
            <span className="font-bold text-xs">{property.beds}</span>
          </div>
          <div className="flex items-center gap-1.5 border-l border-white/20 pl-4">
            <Bath className="w-3.5 h-3.5 opacity-80" />
            <span className="font-bold text-xs">{property.baths}</span>
          </div>
          <div className="flex items-center gap-1.5 border-l border-white/20 pl-4">
            <Car className="w-3.5 h-3.5 opacity-80" />
            <span className="font-bold text-xs">{property.cars}</span>
          </div>
          <div className="flex items-center gap-1.5 border-l border-white/20 pl-4">
            <Maximize className="w-3.5 h-3.5 opacity-80" />
            <span className="font-bold text-xs">{property.area}m<sup>2</sup></span>
          </div>
        </div>

        {/* Quick View Prompt */}
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <div className="bg-white px-6 py-2 rounded-none text-[10px] font-extrabold tracking-[0.3em] text-[#111111] shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            EXPLORE RESIDENCE
          </div>
        </div>
      </div>

      <div className="p-8">
        <h4 className="font-headline font-bold text-xl mb-1 group-hover:text-primary transition-colors leading-tight">
          {property.title || property.address}
        </h4>
        <p className="text-gray-400 text-[11px] mb-6 uppercase tracking-[0.2em] font-bold">
          {property.suburb}
        </p>
        <div className="flex justify-between items-center pt-6 border-t border-gray-100">
          <p className="font-headline font-extrabold text-2xl text-[#111111]">
            ${property.price} <span className="text-xs font-bold text-gray-400">AUD</span>
          </p>
          <span className="text-[10px] font-bold text-primary tracking-widest uppercase group-hover:underline">VIEW GALLERY →</span>
        </div>
      </div>
    </Link>
  );
}
