
"use client";

import { useState, useEffect } from "react";
import { Search, MapPin, TrendingUp, History, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { suggestTrendingAreas } from "@/ai/flows/ai-property-search-trending-areas";
import Link from "next/link";

export default function HeroSearch() {
  const [activeTab, setActiveTab] = useState("Buy");
  const [isFocused, setIsFocused] = useState(false);
  const [trending, setTrending] = useState<string[]>([]);
  const [query, setQuery] = useState("");

  const tabs = [
    "Buy", "Rent", "House & Land", "New Homes", "Sold", "Retirement", "Rural"
  ];

  useEffect(() => {
    async function loadTrending() {
      try {
        const res = await suggestTrendingAreas({ numberOfAreas: 6 });
        setTrending(res.areas);
      } catch (e) {
        setTrending(["Bondi", "Surry Hills", "Mosman", "Paddington", "Manly", "Bronte"]);
      }
    }
    loadTrending();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto z-10 transition-all duration-300 ease-in-out">
      {/* Glass Container */}
      <div 
        className="p-4 md:p-6 rounded-3xl md:rounded-full border border-white/30 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] backdrop-blur-[15px] bg-white/15"
        style={{ backdropFilter: 'blur(15px) saturate(150%)' }}
      >
        <div className="flex flex-col gap-3">
          {/* Global Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 px-2 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-4 py-1.5 text-[13px] font-bold tracking-tight rounded-full transition-all duration-300",
                  activeTab === tab
                    ? "bg-[#0047AB] text-white shadow-lg"
                    : "text-white hover:bg-white/20"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Functional Search Module */}
          <div className="bg-white/90 backdrop-blur-md rounded-2xl md:rounded-full p-1 flex flex-col md:flex-row items-stretch md:items-center shadow-xl border border-black/5 gap-2">
            <div className="flex-1 flex items-center px-4">
              <Search className="w-4 h-4 text-gray-400 mr-3" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                placeholder="Try a location or a school..."
                className="border-none focus-visible:ring-0 text-sm py-3 placeholder:text-gray-400 bg-transparent h-auto"
              />
            </div>
            
            <div className="flex items-center gap-2 pr-1">
              <Button 
                variant="outline" 
                className="rounded-full border-gray-300 bg-transparent text-black font-bold h-9 px-4 hover:bg-gray-100 transition-all text-[11px]"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 mr-2" />
                Filters
              </Button>
              
              <Link href={`/search?type=${activeTab.toLowerCase()}&q=${query}`}>
                <Button 
                  size="sm" 
                  className="bg-[#005555] hover:bg-[#004444] text-white font-bold px-6 h-9 rounded-full flex items-center gap-2"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span className="font-headline tracking-widest uppercase text-[10px]">SEARCH</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* AI Suggestions Dropdown */}
        {isFocused && (
          <div className="absolute top-[calc(100%+10px)] left-0 w-full bg-white/95 backdrop-blur-xl mt-1 shadow-2xl rounded-3xl p-6 z-50 animate-in fade-in slide-in-from-top-4 duration-500 border border-white/40">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-2 text-[9px] font-bold text-gray-400 mb-4 tracking-[0.2em] uppercase">
                  <TrendingUp className="w-3.5 h-3.5" />
                  Trending Areas
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {trending.map((area) => (
                    <Link
                      key={area}
                      href={`/search?q=${area}`}
                      className="flex items-center gap-2 p-2.5 hover:bg-primary/5 rounded-lg transition-all text-xs font-semibold text-gray-700 group"
                    >
                      <MapPin className="w-3 h-3 text-primary group-hover:scale-110 transition-transform" />
                      {area}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-[9px] font-bold text-gray-400 mb-4 tracking-[0.2em] uppercase">
                  <History className="w-3.5 h-3.5" />
                  Recent Searches
                </div>
                <div className="space-y-1.5">
                  {["Luxury Homes in Sydney", "Apartments Melbourne CBD", "Coastal Living NSW"].map((search) => (
                    <button
                      key={search}
                      className="w-full text-left p-2.5 hover:bg-primary/5 rounded-lg transition-all text-xs font-medium text-gray-600 flex items-center justify-between group"
                    >
                      {search}
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity text-primary">→</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
