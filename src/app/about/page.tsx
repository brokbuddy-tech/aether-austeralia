"use client";

import Image from "next/image";
import { ShieldCheck, Target, Users, Globe, ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function AboutPage() {
  return (
    <div className="pt-[72px] bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://picsum.photos/seed/about-heritage-2/1920/1080"
          alt="Aether Australia Heritage"
          fill
          className="object-cover z-0 brightness-[0.7]"
          priority
          data-ai-hint="Luxury Architecture"
        />
        <div className="absolute inset-0 bg-black/30 z-10" />
        <div className="relative z-20 text-center px-6 max-w-4xl">
          <span className="text-white/80 font-bold text-[10px] tracking-[0.5em] mb-4 block uppercase animate-in fade-in slide-in-from-bottom-2 duration-700">Our Heritage</span>
          <h1 className="font-headline font-extrabold text-5xl md:text-7xl mb-6 tracking-tighter text-white uppercase leading-none animate-in fade-in slide-in-from-bottom-4 duration-1000">
            A LEGACY IN <br /> THE MAKING
          </h1>
          <div className="h-1 w-24 bg-primary mx-auto" />
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1">
            <span className="text-[9px] font-bold text-primary tracking-[0.5em] uppercase mb-4 border-b-2 border-primary pb-1">
              OUR PHILOSOPHY
            </span>
            <h2 className="font-headline font-extrabold text-4xl md:text-5xl tracking-tighter uppercase leading-[1.1] mt-6 mb-8 text-[#111111]">
              Redefining the <br /><span className="text-gray-300">Australian standard.</span>
            </h2>
            <div className="space-y-6 text-gray-500 font-body text-base leading-relaxed">
              <p>
                Founded in 2026, Aether Australia was born from a singular vision: to elevate the real estate experience through a harmonious blend of hyper-local data and global architectural heritage.
              </p>
              <p>
                We believe that a residence is more than just a structure—it's a sanctuary, an investment, and a testament to one's lifestyle. Our approach combines traditional expertise with 21st-century innovation, ensuring every client receives a 6-star service that is uniquely Aether.
              </p>
            </div>
          </div>
          <div className="relative aspect-square overflow-hidden shadow-2xl group order-1 lg:order-2">
            <Image
              src="https://picsum.photos/seed/philosophy-arch/1000/1000"
              alt="Modern Architecture"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              data-ai-hint="Modern Interior"
            />
            <div className="absolute inset-0 border-[20px] border-white/10 m-6 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Values Section: THE AETHER STANDARD */}
      <section className="py-24 px-6 bg-[#F5F7FA]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-headline font-extrabold text-3xl md:text-4xl mb-4 text-[#111111] uppercase tracking-tighter">THE AETHER STANDARD</h2>
            <div className="h-1 w-16 bg-primary mx-auto" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              {
                icon: <ShieldCheck className="w-8 h-8 text-primary" />,
                title: "INTEGRITY",
                desc: "Uncompromising ethical standards in every transaction and interaction."
              },
              {
                icon: <Target className="w-8 h-8 text-primary" />,
                title: "PRECISION",
                desc: "Hyper-local data-driven insights for accurate market positioning."
              },
              {
                icon: <Globe className="w-8 h-8 text-primary" />,
                title: "HERITAGE",
                desc: "Combining local expertise with global architectural influences."
              },
              {
                icon: <Users className="w-8 h-8 text-primary" />,
                title: "SERVICE",
                desc: "A dedicated 24/7 concierge experience for every proprietor."
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-10 border border-gray-100 shadow-sm text-center group hover:shadow-xl transition-all relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                <div className="mb-6 flex justify-center transform group-hover:-translate-y-1 transition-transform">{item.icon}</div>
                <h3 className="font-headline font-bold text-lg mb-4 tracking-widest text-[#111111]">{item.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed font-medium uppercase tracking-tight">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Our Regional Footprint (Interactive Map) */}
      <section className="py-32 px-6 bg-white overflow-hidden relative">
        <div className="absolute inset-0 z-0 opacity-[0.08] flex items-center justify-center">
          <svg
            viewBox="0 0 1000 800"
            className="w-full h-full max-w-5xl transition-transform duration-1000"
            style={{ transform: 'scale(1.1)' }}
            fill="currentColor"
          >
            <path d="M834.4,264.4c-4.4-3.3-8.8-6.6-13.3-9.8c-12.2-8.8-24.5-17.5-36.8-26.3c-1.8-1.2-3.5-2.5-5.3-3.7c-5-3.5-10-6.9-15.1-10.4 c-2.9-2-5.9-4-8.8-6c-13.9-9.5-27.8-18.9-41.8-28.3c-2.8-1.9-5.6-3.8-8.4-5.7c-5.7-3.9-11.4-7.8-17.1-11.6c-4.1-2.8-8.2-5.5-12.2-8.3 c-16.7-11.3-33.3-22.5-50.1-33.6c-2.3-1.5-4.5-3-6.8-4.5c-4.5-3-9.1-6-13.6-9c-2.2-1.5-4.5-2.9-6.7-4.4 c-17.5-11.5-35.1-22.9-52.7-34.3c-1.9-1.2-3.7-2.5-5.6-3.7c-5.7-3.7-11.5-7.4-17.2-11--2.7-1.7-5.4-3.5-8.1-5.2 c-15.7-10.1-31.4-20.1-47.2-30.1c-3.1-2-6.2-3.9-9.3-5.9c-4.7-3-9.4-5.9-14.1-8.9c-2.6-1.6-5.2-3.3-7.7-4.9c-0.1-0.1-0.2-0.1-0.3-0.2 L411.5,0l-16.2,10.2L150.9,165.7l-41,26.4L16.2,274.9L0,285.4l24.9,23.3l124.5,116.5l24.9,23.3l13.5-8.7l217.4-140.2l203.9-131.5 l184,118.7l30.3,19.5l14.7,9.5L834.4,264.4z" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h2 className="font-headline font-extrabold text-4xl md:text-6xl mb-16 tracking-tighter uppercase text-[#111111]">
            LOCAL EXPERTISE, <br /> NATIONAL REACH.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { metric: "15+", label: "Strategic Locations Across Australia" },
              { metric: "$4.2B+", label: "Property Transacted (2025)" },
              { metric: "200+", label: "Specialized Local Advisors" }
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="bg-white/10 backdrop-blur-[12px] border border-white/20 p-12 shadow-2xl flex flex-col items-center group hover:bg-white/20 transition-all duration-500"
              >
                <span className="text-5xl md:text-6xl font-headline font-extrabold text-primary mb-4 tracking-tighter transition-transform group-hover:scale-110 duration-500">
                  {item.metric}
                </span>
                <p className="text-[#111111] font-bold text-xs tracking-[0.3em] uppercase max-w-[200px] leading-relaxed">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Meet Our Team */}
      <section className="py-24 px-6 bg-[#F9F9F9]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="font-headline font-extrabold text-3xl md:text-4xl tracking-tighter uppercase text-[#111111]">
              Meet Our <br /><span className="text-gray-300">Team.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                name: "KIERAN WARRINER", 
                role: "MANAGING DIRECTOR", 
                desc: "Strategic visionary with 20+ years in Australian real estate.", 
                img: "https://picsum.photos/seed/kieran-team/600/800" 
              },
              { 
                name: "MARCUS THORNE", 
                role: "SENIOR SALES EXECUTIVE", 
                desc: "Specialist in luxury Sydney residential and coastal assets.", 
                img: "https://picsum.photos/seed/marcus-team/600/800" 
              },
              { 
                name: "SARAH JENKINS", 
                role: "INVESTMENT SPECIALIST", 
                desc: "Expert in rental yield optimization and asset management.", 
                img: "https://picsum.photos/seed/sarah-team/600/800" 
              },
              { 
                name: "DAVID BECK", 
                role: "PROJECT MARKETING", 
                desc: "Leading high-end off-plan developments across the East Coast.", 
                img: "https://picsum.photos/seed/david-team/600/800" 
              }
            ].map((item, idx) => (
              <div key={idx} className="group relative aspect-[3/4] overflow-hidden shadow-xl">
                <Image 
                  src={item.img} 
                  alt={item.name} 
                  fill 
                  className="object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute bottom-0 left-0 w-full p-6 bg-white/10 backdrop-blur-[8px] border-t border-white/20 transition-all duration-500 group-hover:h-full flex flex-col justify-end">
                  <h4 className="font-headline font-extrabold text-xl text-white mb-1 tracking-widest uppercase leading-tight">{item.name}</h4>
                  <p className="text-primary font-bold text-[10px] tracking-[0.2em] uppercase mb-2">{item.role}</p>
                  <p className="text-white/70 text-xs font-medium uppercase tracking-tight mb-4 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                    {item.desc}
                  </p>
                  <div className="h-10 w-10 bg-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 duration-500">
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career CTA: Join the Extraordinary */}
      <section className="relative py-40 px-6 overflow-hidden bg-[#111111] text-white">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="https://picsum.photos/seed/career-office/1920/1080"
            alt="Modern Office Space"
            fill
            className="object-cover"
            data-ai-hint="Luxury Office"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="font-headline font-extrabold text-4xl md:text-6xl mb-12 tracking-tighter uppercase leading-none">
            BE PART OF THE <br /> FUTURE OF REAL ESTATE.
          </h2>
          <Link href="/contact">
            <Button 
              variant="outline" 
              size="lg" 
              className="bg-transparent border-white/40 text-white hover:bg-white hover:text-[#111111] backdrop-blur-md rounded-none px-12 h-16 font-bold text-xs tracking-[0.4em] uppercase transition-all duration-500"
            >
              EXPLORE CAREERS AT AETHER
            </Button>
          </Link>
          
          <div className="mt-16 flex justify-center gap-12 text-white/40 text-[9px] font-bold tracking-[0.5em] uppercase">
             <span>SYDNEY</span>
             <span>MELBOURNE</span>
             <span>BRISBANE</span>
             <span>PERTH</span>
          </div>
        </div>
      </section>

      {/* Original Team CTA Footer Area (Simplified) */}
      <section className="py-20 px-6 bg-white text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-gray-400 text-xs leading-relaxed font-medium uppercase tracking-widest mb-8">
            Aether Australia advisors are hand-picked experts ready to guide you through your luxury property journey.
          </p>
          <div className="flex justify-center items-center gap-4 grayscale opacity-40">
            <span className="text-[10px] font-black border-2 border-black px-2 py-1 leading-none">REIA 2026</span>
            <span className="h-4 w-px bg-gray-200" />
            <span className="text-[10px] font-black border-2 border-black px-2 py-1 leading-none">NSW GOV CERTIFIED</span>
          </div>
        </div>
      </section>
    </div>
  );
}
