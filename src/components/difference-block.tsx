
"use client";

import { MessageSquare, Target, Map } from "lucide-react";

const items = [
  {
    icon: <MessageSquare className="w-8 h-8 text-primary" />,
    title: "Supportive Expert Advice",
    description: "Our world-class team provides unparalleled strategic guidance for your real estate journey."
  },
  {
    icon: <Target className="w-8 h-8 text-primary" />,
    title: "Marketing Excellence",
    description: "Leveraging cutting-edge technology and design to present your property in its best light."
  },
  {
    icon: <Map className="w-8 h-8 text-primary" />,
    title: "Local Knowledge",
    description: "Decades of hyper-local data and insight across Australia's premier markets."
  }
];

export default function DifferenceBlock() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="font-headline font-extrabold text-4xl md:text-5xl mb-4 text-[#111111]">
          THE AETHER DIFFERENCE
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-16 font-body text-lg">
          We combine local heritage with global innovation to deliver results that exceed expectations.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {items.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group">
              <div className="w-24 h-24 rounded-full border-2 border-primary/20 flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:bg-primary/5">
                {item.icon}
              </div>
              <h3 className="font-headline font-bold text-xl mb-4 uppercase tracking-tight">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
