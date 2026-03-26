"use client";

import Image from "next/image";
import { Search, Home, DollarSign, Gavel, Sparkles, MessageSquare, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function FindAnAgentPage() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'find-agent-hero');

  const adviceItems = [
    {
      name: "Marcus Thorne",
      title: "How and when to sell your home for maximum value",
      category: "Selling",
      readTime: "2 min read",
      image: "https://picsum.photos/seed/marcus-headshot/400/400"
    },
    {
      name: "Sarah Jenkins",
      title: "Maximising rental yield in the 2026 Australian market",
      category: "Investing",
      readTime: "3 min read",
      image: "https://picsum.photos/seed/sarah-headshot/400/400"
    },
    {
      name: "David Beck",
      title: "The structural shift: Why coastal luxury is surging",
      category: "Market",
      readTime: "4 min read",
      image: "https://picsum.photos/seed/david-headshot/400/400"
    },
    {
      name: "Emma Wilson",
      title: "Navigating first home buyer grants across NSW & VIC",
      category: "Buying",
      readTime: "2 min read",
      image: "https://picsum.photos/seed/emma-headshot/400/400"
    }
  ];

  return (
    <div className="bg-white min-h-screen">
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
              <Search className="w-5 h-5 text-gray-400 mr-3" />
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
            <div className="w-16 h-16 bg-primary/10 flex items-center justify-center mb-6 rounded-full group-hover:scale-110 transition-transform">
              <Home className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-headline font-bold text-xl mb-2 text-[#111111]">Looking to sell?</h3>
            <p className="text-gray-500 text-sm font-medium">Get a free appraisal from our local specialists.</p>
          </div>

          <div className="bg-white p-10 rounded-none border border-gray-100 shadow-xl hover:shadow-2xl transition-all group text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-[#0047AB]/10 flex items-center justify-center mb-6 rounded-full group-hover:scale-110 transition-transform">
              <DollarSign className="w-8 h-8 text-[#0047AB]" />
            </div>
            <h3 className="font-headline font-bold text-xl mb-2 text-[#111111]">Follow your property</h3>
            <p className="text-gray-500 text-sm font-medium">Understand your asset value in real-time.</p>
          </div>

          <div className="bg-white p-10 rounded-none border border-gray-100 shadow-xl hover:shadow-2xl transition-all group text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-primary/10 flex items-center justify-center mb-6 rounded-full group-hover:scale-110 transition-transform">
              <Gavel className="w-8 h-8 text-primary" />
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
          <Button variant="link" className="text-[#0047AB] font-bold text-xs tracking-widest uppercase p-0">VIEW ALL GUIDES →</Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {adviceItems.map((item, idx) => (
            <div key={idx} className="group relative bg-white border border-gray-100 p-6 flex gap-8 items-start hover:bg-[#F7F6F2]/50 transition-all duration-300">
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
                   <Button size="icon" className="bg-[#0047AB] rounded-full shadow-xl">
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
                <h4 className="font-headline font-bold text-lg mb-1.5 text-[#111111] group-hover:text-[#0047AB] transition-colors">{item.name}</h4>
                <p className="text-gray-600 font-medium text-base leading-tight mb-4 line-clamp-2">
                  {item.title}
                </p>
                <div className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">{item.readTime}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

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
         </div>
      </section>
    </div>
  );
}
