
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
import { replaceTemplateBranding } from "@/lib/public-site";

type TestimonialSlide = {
  id: string;
  quote: string;
  author: string;
  meta: string;
  avatar?: string | null;
  badgeLabel?: string | null;
  message?: string | null;
  clientName?: string | null;
  name?: string | null;
  location?: string | null;
  property?: string | null;
  image?: string | null;
  imageUrl?: string | null;
};

function getInitials(name: string) {
  return (
    name
      .split(/[\s&-]+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("") || "AG"
  );
}

export default function TestimonialSlider({
  agencyName = "Agency Website",
  testimonials = [],
}: {
  agencyName?: string;
  testimonials?: TestimonialSlide[];
}) {
  const plugin = React.useRef(
    Autoplay({ delay: 2500, stopOnInteraction: true })
  );
  const normalizedTestimonials = testimonials
    .map<TestimonialSlide | null>((testimonial, index) => {
      const quote = testimonial.message?.trim() || testimonial.quote?.trim();
      const author = testimonial.clientName?.trim() || testimonial.author?.trim() || testimonial.name?.trim();

      if (!quote || !author) return null;

      return {
        id: testimonial.id || `${author}-${index}`,
        quote: replaceTemplateBranding(quote, agencyName),
        author,
        meta: testimonial.badgeLabel?.trim() || testimonial.location?.trim() || testimonial.property?.trim() || testimonial.meta || "Client Testimonial",
        avatar: testimonial.imageUrl || testimonial.avatar || testimonial.image || null,
      };
    })
    .filter((testimonial): testimonial is TestimonialSlide => Boolean(testimonial));
  const resolvedTestimonials = normalizedTestimonials;

  if (!resolvedTestimonials.length) return null;

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
            {resolvedTestimonials.map((t) => (
              <CarouselItem key={t.id}>
                <div className="relative p-8 md:p-16 bg-white/5 backdrop-blur-md border border-white/20 shadow-2xl text-center group transition-all duration-700">
                  {/* Oversized Teal Quotation Mark Accents */}
                  <div className="absolute top-6 left-6 opacity-10 text-primary">
                    <Quote className="w-12 h-12 rotate-180" />
                  </div>
                  
                  <blockquote className="relative z-20 font-serif italic text-xl md:text-3xl text-[#111111] leading-[1.3] mb-8 max-w-4xl mx-auto tracking-tight">
                    "{t.quote}"
                  </blockquote>

                  <div className="flex flex-col items-center">
                    {t.avatar ? (
                      <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20 p-1 mb-4 bg-white/10 backdrop-blur-sm">
                        <Image
                          src={t.avatar}
                          alt={t.author}
                          fill
                          className="object-cover rounded-full"
                        />
                      </div>
                    ) : (
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary/20 bg-white text-sm font-bold tracking-[0.2em] text-primary">
                        {getInitials(t.author)}
                      </div>
                    )}
                    <div className="space-y-1">
                      <p className="font-headline font-extrabold text-base tracking-tight uppercase text-[#111111]">{t.author}</p>
                      <p className="text-[9px] font-bold text-gray-400 tracking-[0.4em] uppercase">{t.meta}</p>
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
          {resolvedTestimonials.map((_, i) => (
            <div key={i} className={`h-1 rounded-full transition-all duration-500 ${i === 0 ? 'bg-primary w-10' : 'bg-gray-200 w-2.5'}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
