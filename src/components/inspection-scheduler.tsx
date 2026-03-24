
"use client";

import { useState } from "react";
import { Calendar as CalendarIcon, Clock, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

export default function InspectionScheduler() {
  const [date, setDate] = useState<Date>();
  const [selectedSlot, setSelectedSlot] = useState<string>();

  const slots = [
    "09:00 AM", "09:15 AM", "09:30 AM", "09:45 AM",
    "10:00 AM", "10:15 AM", "10:30 AM", "10:45 AM",
    "02:00 PM", "02:15 PM", "02:30 PM", "02:45 PM"
  ];

  const handleBook = () => {
    if (!date || !selectedSlot) {
      toast({
        title: "Selection Required",
        description: "Please select both a date and a time slot.",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Inspection Requested",
      description: `Your inspection for ${format(date, "PPP")} at ${selectedSlot} has been sent to the agent.`,
    });
  };

  return (
    <div className="bg-gray-50 p-8 border border-gray-100">
      <h3 className="font-headline font-bold text-2xl mb-2">Book an Inspection</h3>
      <p className="text-gray-500 text-sm mb-8">Select a 15-minute private viewing slot that works for you.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <label className="block text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-2">SELECT DATE</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal rounded-none h-14 border-gray-200",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-2">AVAILABLE SLOTS</label>
          <div className="grid grid-cols-2 gap-2 max-h-[160px] overflow-y-auto pr-2">
            {slots.map((slot) => (
              <Button
                key={slot}
                variant={selectedSlot === slot ? "default" : "outline"}
                onClick={() => setSelectedSlot(slot)}
                className={cn(
                  "rounded-none h-10 text-xs font-bold",
                  selectedSlot === slot ? "bg-primary" : "border-gray-200"
                )}
              >
                <Clock className="w-3 h-3 mr-2" /> {slot}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <Button 
        onClick={handleBook}
        className="w-full bg-[#111111] hover:bg-black text-white font-bold h-16 text-lg rounded-none"
      >
        REQUEST PRIVATE VIEWING <ChevronRight className="ml-2 w-5 h-5" />
      </Button>
    </div>
  );
}
