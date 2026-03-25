
"use client";

import * as React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "The Aether team didn't just sell our house; they curated an experience. Their local knowledge of the Northern Beaches is unparalleled in the 2026 market.",
    author: "Sarah & James Miller",
    suburb: "MOSMAN, NSW",
    avatar: "https://picsum.photos/seed/testimonial-1/100/100"
  },
  {
    quote: "Exceptional service from start to finish. The digital tour and virtual staging were world-class, attracting international interest we never expected.",
    author: "David Chen",
    suburb: "TOORAK, VIC",
    avatar: "https://picsum.photos/seed/testimonial-2/100/100"
  },
  {
    quote: "Aether Australia redefined what premium real estate management looks like. Their proprietor portal provides clarity we've never had with other agencies.",
    author: "Elizabeth Sterling",
    suburb: "BRIGHTON, SA",
    avatar: "https://picsum.photos/seed/testimonial-3/100/100"
  }
];

export default function TestimonialSlider() {
  return (
    <section className="relative py-20 px-6 overflow-hidden bg-white border-t border-gray-50">
      {/* Parallax Background Layer */}
      <div className="absolute inset-0 z-0 opacity-[0.05] grayscale pointer-events-none">
        <Image 
          src="https://picsum.photos/seed/coastal-sunrise-premium/1920/1080" 
          alt="Coastal Backdrop" 
          fill 
          className="object-cover scale-110"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-[10px] font-bold text-[#111111] tracking-[0.5em] uppercase border-b border-primary pb-2">Client Testimonials</span>
        </div>

        <Carousel 
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {testimonials.map((t, idx) => (
              <CarouselItem key={idx}>
                <div className="relative p-10 md:p-16 bg-white/5 backdrop-blur-md border border-white/20 shadow-2xl text-center group transition-all duration-700">
                  {/* Oversized Teal Quotation Mark Accents */}
                  <div className="absolute top-6 left-6 opacity-10 text-primary">
                    <Quote className="w-12 h-12 rotate-180" />
                  </div>
                  
                  <blockquote className="relative z-20 font-serif italic text-2xl md:text-3xl text-[#111111] leading-[1.3] mb-10 max-w-3xl mx-auto tracking-tight">
                    "{t.quote}"
                  </blockquote>

                  <div className="flex flex-col items-center">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20 p-1 mb-5 bg-white/10 backdrop-blur-sm">
                      <Image 
                        src={t.avatar} 
                        alt={t.author} 
                        fill
                        className="object-cover rounded-full" 
                      />
                    </div>
                    <div className="space-y-1">
                      <p className="font-headline font-extrabold text-xs tracking-tight uppercase text-[#111111]">{t.author}</p>
                      <p className="text-[9px] font-bold text-gray-400 tracking-[0.3em] uppercase">{t.suburb}</p>
                    </div>
                  </div>

                  <div className="absolute bottom-6 right-6 opacity-10 text-primary">
                    <Quote className="w-12 h-12" />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <div className="hidden md:block">
            <CarouselPrevious className="absolute -left-16 h-10 w-10 border-none bg-white/50 backdrop-blur-sm hover:bg-primary hover:text-white transition-all rounded-none" />
            <CarouselNext className="absolute -right-16 h-10 w-10 border-none bg-white/50 backdrop-blur-sm hover:bg-primary hover:text-white transition-all rounded-none" />
          </div>
        </Carousel>

        {/* Minimalist Indicators Placeholder */}
        <div className="flex justify-center gap-2 mt-10">
          {testimonials.map((_, i) => (
            <div key={i} className={`h-1 w-1 rounded-full transition-all duration-500 ${i === 0 ? 'bg-primary w-6' : 'bg-gray-200'}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
