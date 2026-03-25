
"use client";

import Image from "next/image";
import { ShieldCheck, Target, Users, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="pt-[72px] bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://picsum.photos/seed/about-heritage/1920/1080"
          alt="Aether Australia Heritage"
          fill
          className="object-cover z-0"
          priority
          data-ai-hint="Luxury Architecture"
        />
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="relative z-20 text-center px-6">
          <span className="text-white/80 font-bold text-xs tracking-[0.4em] mb-4 block uppercase">Our Heritage</span>
          <h1 className="font-headline font-extrabold text-5xl md:text-7xl mb-6 tracking-tighter text-white uppercase leading-none">
            A LEGACY IN <br /> THE MAKING
          </h1>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-[10px] font-bold text-primary tracking-[0.5em] uppercase mb-4 border-b-2 border-primary pb-1">
              OUR PHILOSOPHY
            </span>
            <h2 className="font-headline font-extrabold text-4xl md:text-5xl tracking-tighter uppercase leading-[1.1] mt-6 mb-8">
              Redefining the <br /><span className="text-gray-300">Australian standard.</span>
            </h2>
            <div className="space-y-6 text-gray-500 font-body text-lg leading-relaxed">
              <p>
                Founded in 2026, Aether Australia was born from a singular vision: to elevate the real estate experience through a harmonious blend of hyper-local data and global architectural heritage.
              </p>
              <p>
                We believe that a residence is more than just a structure—it's a sanctuary, an investment, and a testament to one's lifestyle. Our approach combines traditional expertise with 21st-century innovation, ensuring every client receives a 6-star service that is uniquely Aether.
              </p>
            </div>
          </div>
          <div className="relative aspect-square overflow-hidden shadow-2xl group">
            <Image
              src="https://picsum.photos/seed/philosophy-arch/800/800"
              alt="Modern Architecture"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              data-ai-hint="Modern Interior"
            />
            <div className="absolute inset-0 border-[20px] border-white/10 m-6 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-6 bg-[#F5F7FA]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-headline font-extrabold text-4xl mb-4 text-[#111111] uppercase tracking-tighter">THE AETHER STANDARD</h2>
            <div className="h-1 w-20 bg-primary mx-auto" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              {
                icon: <ShieldCheck className="w-10 h-10 text-primary" />,
                title: "INTEGRITY",
                desc: "Uncompromising ethical standards in every transaction and interaction."
              },
              {
                icon: <Target className="w-10 h-10 text-primary" />,
                title: "PRECISION",
                desc: "Hyper-local data-driven insights for accurate market positioning."
              },
              {
                icon: <Globe className="w-10 h-10 text-primary" />,
                title: "HERITAGE",
                desc: "Combining local expertise with global architectural influences."
              },
              {
                icon: <Users className="w-10 h-10 text-primary" />,
                title: "SERVICE",
                desc: "A dedicated 24/7 concierge experience for every proprietor."
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-10 border border-gray-100 shadow-sm text-center group hover:shadow-xl transition-all">
                <div className="mb-6 flex justify-center">{item.icon}</div>
                <h3 className="font-headline font-bold text-lg mb-4 tracking-widest">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team CTA */}
      <section className="py-32 bg-[#111111] text-white text-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 grayscale">
          <Image 
            src="https://picsum.photos/seed/about-team-bg/1920/1080" 
            alt="Team Background" 
            fill 
            className="object-cover" 
          />
        </div>
        <div className="relative z-30">
          <h2 className="font-headline font-extrabold text-4xl md:text-6xl mb-8 uppercase tracking-tighter">MEET THE SPECIALISTS</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-12 text-lg font-body">
            Our team of hand-picked experts is ready to guide you through your luxury property journey across Australia.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold px-12 h-16 text-lg rounded-none uppercase tracking-[0.2em]">
              CONNECT WITH US
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
