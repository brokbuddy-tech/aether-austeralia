"use client";

import { CalendarPlus } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function AuctionBlock() {
  const handleAddToCalendar = () => {
    toast({
      title: "Added to Calendar",
      description: "The auction event has been added to your schedule.",
    });
  };

  return (
    <div className="mt-16 pt-16 border-t border-gray-100">
      <div className="max-w-md">
        <h3 className="text-[11px] font-bold text-gray-400 tracking-[0.4em] uppercase mb-2">
          AUCTION
        </h3>
        <p className="text-xl font-medium text-gray-700 mb-6">On Site</p>

        <button
          onClick={handleAddToCalendar}
          className="flex items-center gap-8 border border-gray-200 rounded-sm p-6 bg-white hover:border-primary transition-all duration-300 group w-full md:w-auto shadow-sm hover:shadow-md"
        >
          <div className="text-left">
            <p className="font-headline font-extrabold text-xl text-[#111111]">
              Saturday, 11 Apr
            </p>
            <p className="text-gray-500 font-medium text-sm">9:00am</p>
          </div>
          <div className="h-12 w-px bg-gray-100 hidden md:block" />
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-50 group-hover:bg-primary/10 transition-colors ml-auto md:ml-0">
            <CalendarPlus className="w-6 h-6 text-gray-400 group-hover:text-primary transition-colors" />
          </div>
        </button>
      </div>
    </div>
  );
}
