"use client";

import Image from "next/image";
import { MessageSquare, Phone, ShieldCheck, Mail, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";

export default function AgentSidebar({ propertyId }: { propertyId: string }) {
  return (
    <div className="space-y-6">
      <Card className="rounded-none border-none shadow-2xl overflow-hidden bg-white/15 backdrop-blur-xl border border-white/20">
        <div className="relative h-56 w-full overflow-hidden">
          {/* Professional Architectural Backdrop */}
          <div className="absolute inset-0 bg-[#111111]" />
          <Image 
            src="https://picsum.photos/seed/lux-arch-bg/800/600" 
            alt="Professional Backdrop" 
            fill 
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-4">
            <div className="relative h-28 w-28 rounded-full border-[6px] border-white/10 shadow-2xl overflow-hidden mb-4">
              <Image
                src="https://picsum.photos/seed/marcus-agent/300/300"
                alt="Marcus Thorne"
                fill
                className="object-cover"
              />
            </div>
            <div className="text-center text-white">
              <h3 className="font-headline font-extrabold text-2xl tracking-tighter uppercase leading-none mb-1">Marcus Thorne</h3>
              <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-primary">Senior Sales Executive</p>
            </div>
          </div>
        </div>
        
        <CardContent className="pt-8 px-6 pb-8 text-center bg-white">
          <div className="flex justify-center gap-6 mb-8 pb-8 border-b border-gray-100">
             <div className="text-center">
                <span className="block text-xl font-extrabold text-[#111111]">142+</span>
                <span className="text-[8px] font-bold text-gray-400 tracking-widest uppercase">SOLD</span>
             </div>
             <div className="w-px h-10 bg-gray-100" />
             <div className="text-center">
                <span className="block text-xl font-extrabold text-[#111111]">12y</span>
                <span className="text-[8px] font-bold text-gray-400 tracking-widest uppercase">EXP</span>
             </div>
             <div className="w-px h-10 bg-gray-100" />
             <div className="text-center">
                <span className="block text-xl font-extrabold text-[#111111]">4.9</span>
                <span className="text-[8px] font-bold text-gray-400 tracking-widest uppercase">RATING</span>
             </div>
          </div>

          <div className="space-y-3">
            <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-14 rounded-none uppercase tracking-[0.2em] text-[11px] shadow-xl">
              BOOK PRIVATE INSPECTION
            </Button>
            
            <Link href={`/property/${propertyId}/brochure`} target="_blank">
              <Button 
                variant="outline" 
                className="w-full border-black text-black hover:bg-black hover:text-white transition-all font-bold h-12 rounded-none uppercase tracking-[0.2em] text-[10px]"
              >
                <FileDown className="w-3.5 h-3.5 mr-2" /> VIEW DIGITAL BROCHURE
              </Button>
            </Link>

            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="border-gray-200 rounded-none h-12 font-bold text-[10px] tracking-widest uppercase hover:bg-gray-50">
                <MessageSquare className="w-3.5 h-3.5 mr-2" /> SMS
              </Button>
              <Button variant="outline" className="border-gray-200 rounded-none h-12 font-bold text-[10px] tracking-widest uppercase hover:bg-gray-50">
                <Mail className="w-3.5 h-3.5 mr-2" /> EMAIL
              </Button>
            </div>
            <button className="w-full mt-4 text-[9px] font-extrabold text-primary uppercase tracking-[0.3em] hover:underline transition-all">
              WHATSAPP AGENT →
            </button>
          </div>
        </CardContent>
      </Card>

      <div className="p-6 bg-gray-50 border border-gray-100">
        <div className="flex items-start gap-4">
          <ShieldCheck className="w-6 h-6 text-primary flex-shrink-0" />
          <div>
            <h4 className="font-extrabold text-[10px] mb-2 tracking-[0.2em] uppercase">AETHER VERIFIED</h4>
            <p className="text-[10px] text-gray-400 leading-relaxed font-medium">
              This residence has been audited for structural integrity and metadata accuracy in compliance with REIA 2026 standards.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
