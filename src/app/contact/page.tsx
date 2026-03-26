"use client";

import Image from "next/image";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "Our concierge team will contact you shortly.",
    });
  };

  return (
    <div className="pt-[72px] bg-white min-h-screen">
      {/* Header */}
      <section className="relative py-32 px-6 border-b border-[#111111]/10 overflow-hidden text-white">
        <Image
          src="https://picsum.photos/seed/contact-beach/1920/1080"
          alt="Australian Coastal Header"
          fill
          className="object-cover z-0"
          priority
          data-ai-hint="Coastal Landscape"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-10" />
        
        <div className="relative z-20 max-w-7xl mx-auto text-center">
          <span className="text-white/80 font-bold text-xs tracking-[0.4em] mb-4 block uppercase">Get in Touch</span>
          <h1 className="font-headline font-extrabold text-5xl md:text-7xl mb-6 tracking-tighter uppercase leading-none">Connect with<br /> Aether Australia</h1>
          <p className="text-white/90 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
            Experience the difference in premium service. Our specialists are ready to guide you through your luxury property journey.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Contact Information */}
          <div className="space-y-12">
            <div>
              <h2 className="font-headline font-extrabold text-3xl mb-8 uppercase tracking-tight">Our Headquarters</h2>
              <div className="space-y-6">
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 rounded-none bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Sydney Flagship</h3>
                    <p className="text-gray-500 font-medium">Level 42, 100 Barangaroo Avenue<br />Sydney NSW 2000, Australia</p>
                  </div>
                </div>
                
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 rounded-none bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Concierge Line</h3>
                    <p className="text-gray-500 font-medium">+61 2 9000 0000</p>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 rounded-none bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">General Inquiries</h3>
                    <p className="text-gray-500 font-medium">concierge@aetheraustralia.com.au</p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="rounded-none border border-gray-100 bg-white text-[#111111] shadow-xl">
              <CardContent className="p-10">
                <h3 className="font-headline font-bold text-xl mb-4 text-primary">Media & Corporate</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  For press inquiries or corporate partnerships, please contact our strategic communications team directly at media@aetheraustralia.com.au
                </p>
                <div className="h-px bg-gray-100 w-full mb-6" />
                <p className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">AETHER GLOBAL NETWORK</p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 p-12 border border-gray-100 shadow-sm">
            <h2 className="font-headline font-extrabold text-3xl mb-8 uppercase tracking-tight">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">First Name</label>
                  <Input className="rounded-none h-14 bg-white border-gray-200" required />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Last Name</label>
                  <Input className="rounded-none h-14 bg-white border-gray-200" required />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Email Address</label>
                <Input type="email" className="rounded-none h-14 bg-white border-gray-200" required />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Phone Number</label>
                <Input type="tel" className="rounded-none h-14 bg-white border-gray-200" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Your Message</label>
                <Textarea className="rounded-none min-h-[150px] bg-white border-gray-200" required />
              </div>
              <Button type="submit" className="w-full bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold h-16 rounded-none uppercase tracking-widest transition-all">
                Submit Inquiry <Send className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
