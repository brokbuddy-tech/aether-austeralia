
"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { Bed, Bath, Car, Maximize, MapPin, Phone, MessageSquare, Globe, ChevronRight } from "lucide-react";
import Link from "next/link";

// Mock data fetcher (aligned with PDP)
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

export default function BrochurePage() {
  const params = useParams();
  const id = params.id as string;
  const property = getPropertyData(id);

  const images = [
    `https://picsum.photos/seed/prop-${id}-1/1600/900`,
    `https://picsum.photos/seed/prop-${id}-2/800/800`,
    `https://picsum.photos/seed/prop-${id}-3/800/800`,
    `https://picsum.photos/seed/prop-${id}-4/800/800`,
  ];

  return (
    <div className="bg-white min-h-screen flex flex-col items-center py-10">
      {/* A4 Container Simulation */}
      <div className="w-full max-w-[1000px] bg-white shadow-[0_0_50px_rgba(0,0,0,0.1)] flex flex-col min-h-[1414px] overflow-hidden">
        
        {/* Header (10%) */}
        <header className="h-[100px] flex items-center justify-center border-b border-gray-100">
          <div className="text-center">
            <span className="font-headline font-extrabold text-2xl tracking-tighter uppercase">
              AETHER<span className="text-primary">.</span> LUXURY PROPERTIES
            </span>
          </div>
        </header>

        {/* Hero Visual (50%) */}
        <section className="relative h-[50vh] min-h-[500px] w-full overflow-hidden">
          <Image
            src={images[0]}
            alt="Hero Exterior"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute top-6 left-6">
            <div className="bg-[#111111]/80 backdrop-blur-md text-white px-4 py-1 text-[10px] font-bold tracking-[0.2em] uppercase">
              EXCLUSIVELY LISTED
            </div>
          </div>
        </section>

        {/* Content Strip (40%) */}
        <section className="flex flex-1">
          {/* Left Column (40%): Detail Stack */}
          <div className="w-[40%] flex flex-col gap-2 p-2 border-r border-gray-100">
            <div className="relative aspect-square overflow-hidden bg-gray-100">
              <Image src={images[1]} alt="Interior 1" fill className="object-cover" />
            </div>
            <div className="relative aspect-square overflow-hidden bg-gray-100">
              <Image src={images[2]} alt="Interior 2" fill className="object-cover" />
            </div>
            <div className="relative aspect-square overflow-hidden bg-gray-100">
              <Image src={images[3]} alt="Interior 3" fill className="object-cover" />
            </div>
          </div>

          {/* Right Column (60%): Property Dossier */}
          <div className="w-[60%] p-12 flex flex-col">
            <div className="mb-8">
              <h1 className="font-headline font-extrabold text-3xl mb-2 tracking-tighter leading-tight uppercase">
                {property.beds} BEDROOM {property.type} <br /> {property.suburb}
              </h1>
              <p className="text-2xl font-headline font-extrabold text-[#B8860B] tracking-tighter">
                ${property.price.toLocaleString()} <span className="text-xs">AUD</span>
              </p>
            </div>

            {/* Property Highlights */}
            <div className="grid grid-cols-2 gap-y-6 mb-10 pb-8 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <Maximize className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">SIZE</p>
                  <p className="font-bold text-sm uppercase">{property.area} m²</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">STATUS</p>
                  <p className="font-bold text-sm uppercase">Available</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Bed className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">BEDROOMS</p>
                  <p className="font-bold text-sm uppercase">{property.beds} Primary</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Car className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">PARKING</p>
                  <p className="font-bold text-sm uppercase">{property.cars} Secure</p>
                </div>
              </div>
            </div>

            {/* Narrative */}
            <div className="mb-10">
              <h2 className="text-[10px] font-bold text-gray-400 tracking-[0.3em] uppercase mb-4">THE RESIDENCE</h2>
              <p className="text-gray-600 font-body text-sm leading-relaxed">
                An architectural masterpiece in the heart of {property.suburb}, this {property.beds}-bedroom sanctuary redefines modern luxury. Meticulously crafted with high-key natural light and sophisticated finishes, every square metre has been designed to offer an unparalleled Australian living experience.
              </p>
            </div>

            {/* Amenities Grid */}
            <div>
              <h2 className="text-[10px] font-bold text-gray-400 tracking-[0.3em] uppercase mb-6">AMENITIES & DETAILS</h2>
              <div className="grid grid-cols-2 gap-y-3">
                {[
                  "Private Beach Access",
                  "Smart Home Integrated",
                  "Designer Miele Kitchen",
                  "Wine Cellar",
                  "Infinity Pool",
                  "Solar Energy System"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#B8860B] rounded-full" />
                    <span className="text-[11px] font-bold text-gray-800 uppercase tracking-tight">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer (Agent Profile) */}
        <footer className="bg-[#F7F6F2] py-8 px-12 mt-auto border-t border-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-6">
              <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-white shadow-md">
                <Image
                  src="https://picsum.photos/seed/kieran-agent/100/100"
                  alt="Kieran Warriner"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-headline font-extrabold text-lg text-[#111111] uppercase tracking-tighter">Kieran Warriner</p>
                <p className="text-[9px] font-bold text-[#0047AB] uppercase tracking-widest">Commercial Consultant</p>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className="flex flex-col gap-2">
                <a href="tel:+61290000000" className="flex items-center gap-2 text-[10px] font-bold text-[#0047AB] tracking-widest hover:underline uppercase">
                  <Phone className="w-3 h-3" /> CALL +61 2 9000 0000
                </a>
                <button className="flex items-center gap-2 text-[10px] font-bold text-[#0047AB] tracking-widest hover:underline uppercase">
                  <MessageSquare className="w-3 h-3" /> WHATSAPP AGENT
                </button>
              </div>
              <div className="h-10 w-px bg-gray-200" />
              <Link href={`/property/${id}`} className="flex items-center gap-2 text-[10px] font-bold text-[#0047AB] tracking-widest hover:underline uppercase">
                <Globe className="w-3 h-3" /> VIEW ON WEBSITE <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </footer>
      </div>
      
      {/* Utility Print Action */}
      <div className="mt-8">
        <button 
          onClick={() => window.print()}
          className="bg-primary text-white px-8 h-12 font-bold text-[10px] tracking-widest uppercase rounded-none shadow-xl hover:opacity-90 transition-all"
        >
          Print to PDF
        </button>
      </div>
    </div>
  );
}
