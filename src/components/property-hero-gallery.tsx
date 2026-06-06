"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Images, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";

interface PropertyHeroGalleryProps {
  images: string[];
  virtualTourUrl?: string | null;
}

export function PropertyHeroGallery({
  images,
  virtualTourUrl,
}: PropertyHeroGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) {
    return null;
  }

  const activeImage = images[activeIndex] || images[0];

  const openGallery = (index: number) => {
    setActiveIndex(index);
    setIsOpen(true);
  };

  return (
    <>
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-1 px-1 md:h-[65vh] min-h-[450px]">
        <div
          className="md:col-span-8 relative group overflow-hidden bg-gray-100 cursor-zoom-in"
          role="button"
          tabIndex={0}
          aria-label={`Open gallery image 1 of ${images.length}`}
          onClick={() => openGallery(0)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              openGallery(0);
            }
          }}
        >
          <div className="absolute inset-0 z-0">
            <Image
              src={images[0]}
              alt="Main hero shot"
              fill
              className="object-cover transition-transform duration-[10000ms] ease-linear scale-110 group-hover:scale-100"
              priority
              data-ai-hint="Luxury Australian Architecture"
            />
          </div>
          <div className="absolute inset-0 bg-black/5 transition-opacity group-hover:opacity-0" />
          {virtualTourUrl ? (
            <div className="absolute bottom-4 left-4 z-10">
              <Button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  window.open(virtualTourUrl, "_blank", "noopener,noreferrer");
                }}
                className="bg-white text-slate-900 hover:bg-white/90 font-semibold rounded-full px-5 h-12 text-sm shadow-xl border border-white/80"
              >
                <Video className="w-4 h-4 mr-2" /> Virtual Tour
              </Button>
            </div>
          ) : null}
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge className="bg-primary text-white rounded-none px-2 py-0.5 font-bold text-[7px] tracking-widest border-none shadow-lg uppercase">
              AETHER EXCLUSIVE
            </Badge>
          </div>
        </div>

        <div className="hidden md:grid md:col-span-4 grid-rows-2 gap-1">
          <button
            type="button"
            onClick={() => openGallery(1)}
            className="relative group overflow-hidden bg-gray-100 text-left cursor-zoom-in"
            aria-label={`Open gallery image 2 of ${images.length}`}
          >
            <Image
              src={images[1] || images[0]}
              alt="Interior view"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </button>
          <div
            className="relative group overflow-hidden bg-gray-100 cursor-zoom-in"
            role="button"
            tabIndex={0}
            aria-label={`Open gallery image 3 of ${images.length}`}
            onClick={() => openGallery(2)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openGallery(2);
              }
            }}
          >
            <Image
              src={images[2] || images[0]}
              alt="Master bedroom"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span className="pointer-events-none absolute bottom-4 right-4 z-10 inline-flex items-center gap-2 bg-white/85 px-4 py-2 text-[8px] font-bold uppercase tracking-widest text-black shadow-lg backdrop-blur-md">
              <Images className="h-4 w-4" />
              View More
            </span>
          </div>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogPortal>
          <DialogOverlay className="bg-black/95 z-[9999]" />
          <DialogContent className="fixed inset-0 z-[10000] flex flex-col items-center justify-center w-screen h-screen max-w-none m-0 p-0 border-none bg-transparent shadow-none !translate-x-0 !translate-y-0 !top-0 !left-0 [&>button:last-child]:hidden">
            <DialogHeader className="sr-only">
              <DialogTitle>Property gallery</DialogTitle>
              <DialogDescription>
                Fullscreen gallery view for this property.
              </DialogDescription>
            </DialogHeader>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-6 left-6 text-white bg-black/50 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-black/70 transition-colors z-[101]"
            >
              <ChevronLeft size={20} /> Back to gallery
            </button>

            <div className="relative w-full h-full flex items-center justify-center p-4 md:p-16">
              <div className="relative w-full h-full">
                <Image
                  src={activeImage}
                  alt={`Gallery image ${activeIndex + 1}`}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority={isOpen}
                />
              </div>

              {images.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveIndex(
                        (prev) => (prev - 1 + images.length) % images.length,
                      )
                    }
                    aria-label="Show previous image"
                    className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-4 rounded-full text-white transition-colors backdrop-blur-sm z-[101]"
                  >
                    <ChevronLeft size={32} />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveIndex((prev) => (prev + 1) % images.length)
                    }
                    aria-label="Show next image"
                    className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-4 rounded-full text-white transition-colors backdrop-blur-sm z-[101]"
                  >
                    <ChevronRight size={32} />
                  </button>
                </>
              ) : null}
            </div>

            <div className="absolute bottom-6 right-6 text-white bg-black/50 px-4 py-2 rounded-lg backdrop-blur-md text-sm font-medium z-[101]">
              {activeIndex + 1} / {images.length}
            </div>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </>
  );
}
