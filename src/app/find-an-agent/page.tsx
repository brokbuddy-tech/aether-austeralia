"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, Home, DollarSign, Gavel, Sparkles, MessageSquare, ShieldCheck, Mail, Phone, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { toast } from "@/hooks/use-toast";

type Advisor = {
  name: string;
  title: string;
  category: string;
  image: string;
};

export default function FindAnAgentPage() {
  const [selectedAdvisor, setSelectedAdvisor] = useState<Advisor | null>(null);
  const heroImage = PlaceHolderImages.find(img => img.id === 'find-agent-hero');

  const adviceItems: Advisor[] = [
    {
      name: "Marcus Thorne",
      title: "How and when to sell your home for maximum value",
      category: "Selling",
      image: "https://picsum.photos/seed/marcus-headshot/400/400"
    },
    {
      name: "Sarah Jenkins",
      title: "Maximising rental yield in the 2026 Australian market",
      category: "Investing",
      image: "https://picsum.photos/seed/sarah-headshot/400/400"
    },
    {
      name: "David Beck",
      title: "The structural shift: Why coastal luxury is surging",
      category: "Market",
      image: "https://picsum.photos/seed/david-headshot/400/400"
    },
    {
      name: "Emma Wilson",
      title: "Navigating first home buyer grants across NSW & VIC",
      category: "Buying",
      image: "https://picsum.photos/seed/emma-headshot/400/400"
    }
  ];

  const handleContact = (type: string) => {
    toast({
      title: `Contacting via ${type}`,
      description: `Opening ${type} for ${selectedAdvisor?.name}...`,
    });
    setSelectedAdvisor(null);
  };

  return (
    <div className="bg-white min-h-screen pt-[72px]">
      {/* Tier 1: Immersive Hero Search */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImage?.imageUrl || "https://picsum.photos/seed/office-blur/1920/1080"}
            alt="Advisor Background"
            fill
            className="object-cover blur-[8px] brightness-[0.7] scale-105"
            priority
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        
        <div className="relative z-10 w-full max-w-3xl px-6 text-center">
          <h1 className="font-headline font-extrabold text-4xl md:text-6xl mb-8 tracking-tighter text-white uppercase leading-none">
            Find your local <br /> Real Estate Advisor
          </h1>
          
          <div className="bg-white/95 backdrop-blur-xl p-1.5 rounded-full flex items-center shadow-2xl border border-white/20">
            <div className="flex-1 px-6 flex items-center">
              <Search className="w-4 h-4 text-gray-400 mr-3" />
              <Input 
                className="border-none focus-visible:ring-0 text-base placeholder:text-gray-400 bg-transparent h-14" 
                placeholder="Search suburb, agent, or agency"
              />
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-full h-14 px-10 font-bold transition-all">
              <Search className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Tier 2: Icon-Based CTAs */}
      <section className="py-20 px-6 max-w-7xl mx-auto -mt-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-10 rounded-none border border-gray-100 shadow-xl hover:shadow-2xl transition-all group text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-primary/10 flex items-center justify-center mb-6 rounded-full group-hover:scale-110 transition-transform text-primary">
              <Home className="w-8 h-8" />
            </div>
            <h3 className="font-headline font-bold text-xl mb-2 text-[#111111]">Looking to sell?</h3>
            <p className="text-gray-500 text-sm font-medium">Get a free appraisal from our local specialists.</p>
          </div>

          <div className="bg-white p-10 rounded-none border border-gray-100 shadow-xl hover:shadow-2xl transition-all group text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-primary/10 flex items-center justify-center mb-6 rounded-full group-hover:scale-110 transition-transform text-primary">
              <DollarSign className="w-8 h-8" />
            </div>
            <h3 className="font-headline font-bold text-xl mb-2 text-[#111111]">Follow your property</h3>
            <p className="text-gray-500 text-sm font-medium">Understand your asset value in real-time.</p>
          </div>

          <div className="bg-white p-10 rounded-none border border-gray-100 shadow-xl hover:shadow-2xl transition-all group text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-primary/10 flex items-center justify-center mb-6 rounded-full group-hover:scale-110 transition-transform text-primary">
              <Gavel className="w-8 h-8" />
            </div>
            <h3 className="font-headline font-bold text-xl mb-2 text-[#111111]">See recently sold</h3>
            <p className="text-gray-500 text-sm font-medium">Research local results in your immediate area.</p>
          </div>
        </div>
      </section>

      {/* Tier 3: The Advice Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto border-t border-gray-100">
        <div className="flex items-center justify-between mb-12">
          <h2 className="font-headline font-extrabold text-3xl tracking-tighter uppercase text-[#111111]">Advice, guides and tips</h2>
          <Button variant="link" className="text-primary font-bold text-xs tracking-widest uppercase p-0">VIEW ALL GUIDES →</Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {adviceItems.map((item, idx) => (
            <div 
              key={idx} 
              onClick={() => setSelectedAdvisor(item)}
              className="group relative bg-white border border-gray-100 p-6 flex gap-8 items-start hover:bg-[#F7F6F2]/50 transition-all duration-300 cursor-pointer"
            >
              <div className="relative flex-shrink-0">
                <div className="relative h-28 w-28 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -top-2 -right-2 bg-primary text-white px-2.5 py-1 text-[8px] font-bold tracking-widest uppercase rounded-full shadow-md">
                  {item.category}
                </div>
                
                {/* SMS Agent Overlay on Hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <Button size="icon" className="bg-primary rounded-full shadow-xl">
                      <MessageSquare className="w-4 h-4 text-white" />
                   </Button>
                </div>
              </div>

              <div className="flex-1 pt-2">
                <div className="flex items-center gap-2 mb-2">
                   <span className="text-[9px] font-bold text-gray-400 tracking-[0.2em] uppercase">ADVISOR</span>
                   <span className="h-1 w-1 bg-gray-300 rounded-full" />
                   <div className="flex items-center gap-1 text-[9px] font-bold text-primary tracking-[0.2em] uppercase">
                     <ShieldCheck className="w-3 h-3" /> VERIFIED
                   </div>
                </div>
                <h4 className="font-headline font-bold text-lg mb-1.5 text-[#111111] group-hover:text-primary transition-colors">{item.name}</h4>
                <p className="text-gray-600 font-medium text-base leading-tight mb-4 line-clamp-2">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Advisor Contact Modal */}
      <Dialog open={!!selectedAdvisor} onOpenChange={(open) => !open && setSelectedAdvisor(null)}>
        <DialogContent className="max-w-md p-0 rounded-none border-none bg-white shadow-2xl overflow-hidden">
          <div className="relative h-48 bg-[#111111] flex flex-col items-center justify-center">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedAdvisor(null)}
              className="absolute top-4 right-4 text-white hover:bg-white/10 rounded-full p-2 h-auto"
            >
              <X className="w-5 h-5" />
            </Button>
            <div className="relative w-24 h-24 rounded-full border-4 border-white/10 shadow-2xl overflow-hidden mb-3">
              <Image 
                src={selectedAdvisor?.image || ""} 
                alt={selectedAdvisor?.name || ""} 
                fill 
                className="object-cover"
              />
            </div>
            <div className="text-center text-white">
              <h3 className="font-headline font-extrabold text-xl tracking-tighter uppercase leading-none">{selectedAdvisor?.name}</h3>
              <p className="text-[8px] font-bold uppercase tracking-[0.4em] text-primary mt-1">Licensed Advisor</p>
            </div>
          </div>
          
          <div className="p-8">
            <DialogHeader className="mb-6 text-center">
              <DialogTitle className="font-headline font-bold text-sm uppercase tracking-widest text-gray-400">Connect with Specialist</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-3">
              <Button 
                onClick={() => handleContact('SMS')}
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-14 rounded-none uppercase tracking-[0.2em] text-[11px] shadow-lg"
              >
                <MessageSquare className="w-4 h-4 mr-3" /> SEND SECURE SMS
              </Button>
              
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => handleContact('Email')}
                  className="border-gray-200 text-gray-600 hover:text-black hover:border-black rounded-none h-14 font-bold text-[10px] tracking-widest uppercase transition-all"
                >
                  <Mail className="w-4 h-4 mr-2" /> EMAIL
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleContact('WhatsApp')}
                  className="border-gray-200 text-gray-600 hover:text-black hover:border-black rounded-none h-14 font-bold text-[10px] tracking-widest uppercase transition-all"
                >
                  <Phone className="w-4 h-4 mr-2" /> WHATSAPP
                </Button>
              </div>
            </div>
            
            <p className="mt-8 text-[9px] text-gray-400 text-center leading-relaxed font-medium uppercase tracking-tighter">
              Aether Australia advisors are REIA certified and licensed according to 2026 state regulations.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Localized Footer Branding */}
      <section className="bg-[#111111] py-16 px-6 text-center border-t border-white/5">
         <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
            <div className="flex items-center gap-4 text-white/30 text-[10px] font-bold tracking-[0.3em] uppercase">
               <span>REIA CERTIFIED 2026</span>
               <span className="h-4 w-px bg-white/10" />
               <span>NATIONAL ADVISOR NETWORK</span>
            </div>
            <p className="text-gray-500 text-xs max-w-xl font-medium leading-relaxed">
               Aether Australia specialists are licensed according to state-specific 2026 regulatory standards. All appraisals are provided as professional estimates based on hyper-local $m^2$ data.
            </p>
            <div className="flex gap-8 text-[10px] font-bold tracking-widest uppercase text-primary">
              <a href="tel:+61290000000" className="hover:underline">CALL +61 2 9000 0000</a>
              <a href="#" className="hover:underline">WHATSAPP AGENT</a>
            </div>
         </div>
      </section>
    </div>
  );
}
