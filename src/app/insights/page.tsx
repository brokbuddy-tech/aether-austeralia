
import Image from "next/image";
import Link from "next/link";
import { generateMarketInsight } from "@/ai/flows/ai-powered-market-insights";

export default async function InsightsPage() {
  const topics = [
    "Sydney property market trends for 2026",
    "First-home buyer tips for the Melbourne market",
    "Impact of interest rates on Australian housing assets",
    "Why regional NSW is the new luxury frontier",
    "Sustainability in Australian architectural design"
  ];

  const insights = await Promise.all(
    topics.map(async (topic) => {
      const insight = await generateMarketInsight({ topic });
      return {
        ...insight,
        image: `https://picsum.photos/seed/${topic.length}/600/400`,
        category: "MARKET REPORT"
      };
    })
  );

  return (
    <div className="pt-[72px] bg-white pb-24">
      {/* Header */}
      <section className="bg-secondary/10 py-24 px-6 border-b border-secondary/20">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-secondary font-bold text-xs tracking-[0.4em] mb-4 block">THE INSIGHTS CENTRE</span>
          <h1 className="font-headline font-extrabold text-5xl md:text-7xl mb-6 tracking-tighter">EXPERT VOICES. <br /> LOCAL DATA.</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Stay ahead of the market with exclusive analysis from Aether Australia's top strategists and industry experts.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {insights.map((insight, idx) => (
            <Link key={idx} href="#" className="group">
              <div className="relative aspect-[16/10] overflow-hidden mb-6">
                <Image
                  src={insight.image}
                  alt={insight.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 text-[10px] font-bold tracking-widest text-secondary shadow-sm">
                  {insight.readingTime.toUpperCase()}
                </div>
              </div>
              <span className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-3 block">{insight.category}</span>
              <h3 className="font-headline font-bold text-2xl mb-4 group-hover:text-primary transition-colors leading-tight">
                {insight.title}
              </h3>
              <div className="text-gray-500 text-sm line-clamp-3 mb-6 font-body">
                {insight.content.replace(/[#*]/g, '').slice(0, 180)}...
              </div>
              <div className="flex items-center gap-4 border-t border-gray-100 pt-6">
                <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                   <Image src={`https://picsum.photos/seed/auth${idx}/100/100`} alt="Author" width={40} height={40} />
                </div>
                <div>
                  <p className="text-xs font-bold">John Aether</p>
                  <p className="text-[10px] text-gray-400">Managing Director</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
