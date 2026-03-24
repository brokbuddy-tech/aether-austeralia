
"use client";

import Image from "next/image";
import { MessageSquare, Phone, Send, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AgentSidebar() {
  return (
    <div className="sticky top-24 space-y-6">
      <Card className="rounded-none border-none shadow-xl overflow-hidden">
        <div className="relative h-48 w-full bg-gray-100">
          {/* Biophilic Background Simulation */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=1000&auto=format&fit=crop')] bg-cover opacity-20" />
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
            <div className="relative h-24 w-24 rounded-full border-4 border-white shadow-lg overflow-hidden mb-4">
              <Image
                src="https://picsum.photos/seed/agent-profile/200/200"
                alt="Agent"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
        <CardContent className="pt-2 text-center pb-8">
          <h3 className="font-headline font-bold text-xl mb-1">Marcus Thorne</h3>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Senior Partner | Sydney</p>
          
          <div className="space-y-3">
            <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12 rounded-none">
              <Phone className="w-4 h-4 mr-2" /> CALL AGENT
            </Button>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="border-gray-200 rounded-none h-12 font-bold">
                <MessageSquare className="w-4 h-4 mr-2" /> SMS
              </Button>
              <Button variant="outline" className="border-gray-200 rounded-none h-12 font-bold">
                <Send className="w-4 h-4 mr-2" /> EMAIL
              </Button>
            </div>
            <Button variant="ghost" className="w-full text-xs font-bold text-primary underline">
              WhatsApp Direct
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-none border-none shadow-lg bg-secondary/10">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-secondary mt-1" />
            <div>
              <h4 className="font-bold text-sm mb-1">VERIFIED LISTING</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                This property has been inspected and verified by REIA registered professionals for accuracy.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
