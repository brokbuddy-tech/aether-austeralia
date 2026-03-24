
"use client";

import Image from "next/image";
import { MessageSquare, Phone, Send, ShieldCheck, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AgentSidebar() {
  return (
    <div className="sticky top-24 space-y-6">
      <Card className="rounded-none border-none shadow-2xl overflow-hidden bg-white">
        <div className="relative h-64 w-full">
          {/* Professional Architectural Backdrop */}
          <div className="absolute inset-0 bg-[#004d4d]" />
          <Image 
            src="https://picsum.photos/seed/lux-arch-bg/800/600" 
            alt="Professional Backdrop" 
            fill 
            className="object-cover opacity-30 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
            <div className="relative h-32 w-32 rounded-full border-[8px] border-white shadow-2xl overflow-hidden mb-5 ring-4 ring-black/5">
              <Image
                src="https://picsum.photos/seed/marcus-agent/300/300"
                alt="Marcus Thorne"
                fill
                className="object-cover"
              />
            </div>
            <div className="text-center text-white">
              <h3 className="font-headline font-extrabold text-3xl tracking-tighter uppercase leading-none mb-1">Marcus Thorne</h3>
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-80">Principal Partner | Aether Sydney</p>
            </div>
          </div>
        </div>
        
        <CardContent className="pt-12 px-8 pb-10 text-center">
          <div className="flex justify-center gap-8 mb-12 pb-10 border-b border-gray-100">
             <div className="text-center">
                <span className="block text-2xl font-extrabold text-[#111111]">142</span>
                <span className="text-[9px] font-bold text-gray-400 tracking-widest uppercase">SOLD</span>
             </div>
             <div className="w-px h-12 bg-gray-100" />
             <div className="text-center">
                <span className="block text-2xl font-extrabold text-[#111111]">12y</span>
                <span className="text-[9px] font-bold text-gray-400 tracking-widest uppercase">LOCAL</span>
             </div>
             <div className="w-px h-12 bg-gray-100" />
             <div className="text-center">
                <span className="block text-2xl font-extrabold text-[#111111]">4.9</span>
                <span className="text-[9px] font-bold text-gray-400 tracking-widest uppercase">RATING</span>
             </div>
          </div>

          <div className="space-y-4">
            <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-16 rounded-none uppercase tracking-[0.3em] text-[12px] shadow-xl">
              <Phone className="w-5 h-5 mr-3" /> CALL AGENT
            </Button>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="border-gray-200 rounded-none h-14 font-extrabold text-[11px] tracking-[0.2em] uppercase hover:bg-gray-50">
                <MessageSquare className="w-4 h-4 mr-2" /> SMS
              </Button>
              <Button variant="outline" className="border-gray-200 rounded-none h-14 font-extrabold text-[11px] tracking-[0.2em] uppercase hover:bg-gray-50">
                <Mail className="w-4 h-4 mr-2" /> EMAIL
              </Button>
            </div>
            <button className="w-full mt-6 text-[10px] font-extrabold text-primary uppercase tracking-[0.4em] hover:underline transition-all">
              WHATSAPP DIRECT →
            </button>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-none border-none shadow-lg bg-[#111111] text-white">
        <CardContent className="p-10">
          <div className="flex items-start gap-4">
            <ShieldCheck className="w-7 h-7 text-primary flex-shrink-0" />
            <div>
              <h4 className="font-extrabold text-xs mb-3 tracking-[0.2em] uppercase">AETHER GUARANTEE</h4>
              <p className="text-[11px] text-gray-400 leading-relaxed font-medium">
                Our specialists have audited this residence for structural integrity and metadata accuracy in compliance with REIA 2026 standards.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
