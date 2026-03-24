
"use client";

import Image from "next/image";
import { MessageSquare, Phone, Send, Info, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AgentSidebar() {
  return (
    <div className="sticky top-24 space-y-6">
      <Card className="rounded-none border-none shadow-2xl overflow-hidden bg-white">
        <div className="relative h-56 w-full">
          {/* Biophilic Background Simulation */}
          <div className="absolute inset-0 bg-[#004d4d]" />
          <Image 
            src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=1000&auto=format&fit=crop" 
            alt="Biophilic Backdrop" 
            fill 
            className="object-cover opacity-40 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-6">
            <div className="relative h-28 w-28 rounded-full border-[6px] border-white shadow-2xl overflow-hidden mb-4 ring-4 ring-black/10">
              <Image
                src="https://picsum.photos/seed/agent-profile/200/200"
                alt="Marcus Thorne"
                fill
                className="object-cover"
              />
            </div>
            <div className="text-center text-white">
              <h3 className="font-headline font-extrabold text-2xl tracking-tighter">Marcus Thorne</h3>
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] opacity-80">Managing Partner | Sydney</p>
            </div>
          </div>
        </div>
        
        <CardContent className="pt-10 px-8 pb-10 text-center">
          <div className="flex justify-center gap-6 mb-10 pb-10 border-b border-gray-100">
             <div className="text-center">
                <span className="block text-xl font-extrabold text-[#111111]">142</span>
                <span className="text-[9px] font-bold text-gray-400 tracking-widest uppercase">SOLD</span>
             </div>
             <div className="w-px h-10 bg-gray-100" />
             <div className="text-center">
                <span className="block text-xl font-extrabold text-[#111111]">12yr</span>
                <span className="text-[9px] font-bold text-gray-400 tracking-widest uppercase">LOCAL</span>
             </div>
             <div className="w-px h-10 bg-gray-100" />
             <div className="text-center">
                <span className="block text-xl font-extrabold text-[#111111]">4.9</span>
                <span className="text-[9px] font-bold text-gray-400 tracking-widest uppercase">RATING</span>
             </div>
          </div>

          <div className="space-y-3">
            <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-14 rounded-none uppercase tracking-[0.2em] text-[11px] shadow-lg">
              <Phone className="w-4 h-4 mr-3" /> CALL AGENT
            </Button>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="border-gray-200 rounded-none h-14 font-extrabold text-[11px] tracking-[0.2em] uppercase hover:bg-gray-50">
                <MessageSquare className="w-4 h-4 mr-2" /> SMS
              </Button>
              <Button variant="outline" className="border-gray-200 rounded-none h-14 font-extrabold text-[11px] tracking-[0.2em] uppercase hover:bg-gray-50">
                <Send className="w-4 h-4 mr-2" /> EMAIL
              </Button>
            </div>
            <button className="w-full mt-4 text-[10px] font-extrabold text-primary uppercase tracking-[0.3em] hover:underline transition-all">
              WHATSAPP DIRECT
            </button>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-none border-none shadow-lg bg-[#F5F7FA] border-l-4 border-primary">
        <CardContent className="p-8">
          <div className="flex items-start gap-4">
            <ShieldCheck className="w-6 h-6 text-primary flex-shrink-0" />
            <div>
              <h4 className="font-extrabold text-xs mb-2 tracking-widest uppercase">AETHER VERIFIED</h4>
              <p className="text-[11px] text-gray-500 leading-relaxed font-medium">
                Our specialists have audited this property for structural integrity and metadata accuracy as per REIA standards.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
