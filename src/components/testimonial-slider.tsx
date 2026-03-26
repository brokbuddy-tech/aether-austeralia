
"use client";

import * as React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
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
  const plugin = React.useRef(
    Autoplay({ delay: 2500, stopOnInteraction: true })
  );

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

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-[11px] font-bold text-[#111111] tracking-[0.6em] uppercase border-b-2 border-primary pb-3">Client Testimonials</span>
        </div>

        <Carousel 
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          className="w-full"
        >
          <CarouselContent>
            {testimonials.map((t, idx) => (
              <CarouselItem key={idx}>
                <div className="relative p-8 md:p-16 bg-white/5 backdrop-blur-md border border-white/20 shadow-2xl text-center group transition-all duration-700">
                  {/* Oversized Teal Quotation Mark Accents */}
                  <div className="absolute top-6 left-6 opacity-10 text-primary">
                    <Quote className="w-12 h-12 rotate-180" />
                  </div>
                  
                  <blockquote className="relative z-20 font-serif italic text-xl md:text-3xl text-[#111111] leading-[1.3] mb-8 max-w-4xl mx-auto tracking-tight">
                    "{t.quote}"
                  </blockquote>

                  <div className="flex flex-col items-center">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20 p-1 mb-4 bg-white/10 backdrop-blur-sm">
                      <Image 
                        src={t.avatar} 
                        alt={t.author} 
                        fill
                        className="object-cover rounded-full" 
                      />
                    </div>
                    <div className="space-y-1">
                      <p className="font-headline font-extrabold text-base tracking-tight uppercase text-[#111111]">{t.author}</p>
                      <p className="text-[9px] font-bold text-gray-400 tracking-[0.4em] uppercase">{t.suburb}</p>
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
            <CarouselPrevious className="absolute -left-16 h-12 w-12 border-none bg-white/50 backdrop-blur-sm hover:bg-primary hover:text-white transition-all rounded-none" />
            <CarouselNext className="absolute -right-16 h-12 w-12 border-none bg-white/50 backdrop-blur-sm hover:bg-primary hover:text-white transition-all rounded-none" />
          </div>
        </Carousel>

        {/* Minimalist Indicators Placeholder */}
        <div className="flex justify-center gap-3 mt-10">
          {testimonials.map((_, i) => (
            <div key={i} className={`h-1 rounded-full transition-all duration-500 ${i === 0 ? 'bg-primary w-10' : 'bg-gray-200 w-2.5'}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
