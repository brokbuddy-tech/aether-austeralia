
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
    <div className="w-full max-w-6xl mx-auto z-10 transition-all duration-300 ease-in-out">
      {/* Glass Container */}
      <div 
        className="p-10 rounded-full border border-white/30 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] backdrop-blur-[15px] bg-white/15"
        style={{ backdropFilter: 'blur(15px) saturate(150%)' }}
      >
        <div className="flex flex-col gap-6">
          {/* Global Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-2 px-4 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-6 py-2.5 text-sm font-bold tracking-tight rounded-full transition-all duration-300",
                  activeTab === tab
                    ? "bg-[#0047AB] text-white shadow-lg"
                    : "text-gray-600 hover:text-black hover:bg-white/10"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Functional Search Module */}
          <div className="bg-white/90 backdrop-blur-md rounded-full p-2 flex items-center shadow-xl border border-black/5">
            <div className="flex-1 flex items-center px-6">
              <Search className="w-5 h-5 text-gray-400 mr-4" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                placeholder="Try a location or a school or project name"
                className="border-none focus-visible:ring-0 text-lg py-6 placeholder:text-gray-400 bg-transparent"
              />
            </div>
            
            <div className="flex items-center gap-3 pr-2">
              <Button 
                variant="outline" 
                className="rounded-full border-gray-300 bg-transparent text-black font-bold h-14 px-6 hover:bg-gray-100 transition-all"
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
              </Button>
              
              <Link href={`/search?type=${activeTab.toLowerCase()}&q=${query}`}>
                <Button 
                  size="lg" 
                  className="bg-[#005555] hover:bg-[#004444] text-white font-bold px-10 h-14 rounded-full flex items-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  <span className="font-headline tracking-widest uppercase text-sm">SEARCH</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* AI Suggestions Dropdown */}
        {isFocused && (
          <div className="absolute top-[calc(100%+10px)] left-0 w-full bg-white/95 backdrop-blur-xl mt-1 shadow-2xl rounded-3xl p-8 z-50 animate-in fade-in slide-in-from-top-4 duration-500 border border-white/40">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 mb-6 tracking-[0.2em] uppercase">
                  <TrendingUp className="w-4 h-4" />
                  Trending Areas
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {trending.map((area) => (
                    <Link
                      key={area}
                      href={`/search?q=${area}`}
                      className="flex items-center gap-2 p-3.5 hover:bg-primary/5 rounded-xl transition-all text-sm font-semibold text-gray-700 group"
                    >
                      <MapPin className="w-3 h-3 text-primary group-hover:scale-110 transition-transform" />
                      {area}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 mb-6 tracking-[0.2em] uppercase">
                  <History className="w-4 h-4" />
                  Recent Searches
                </div>
                <div className="space-y-2">
                  {["Luxury Homes in Sydney", "Apartments Melbourne CBD", "Coastal Living NSW"].map((search) => (
                    <button
                      key={search}
                      className="w-full text-left p-3.5 hover:bg-primary/5 rounded-xl transition-all text-sm font-medium text-gray-600 flex items-center justify-between group"
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
