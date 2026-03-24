
"use client";

import { useState, useEffect } from "react";
import { Search, MapPin, TrendingUp, History } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { suggestTrendingAreas } from "@/ai/flows/ai-property-search-trending-areas";
import Link from "next/link";

export default function HeroSearch() {
  const [activeTab, setActiveTab] = useState("BUY");
  const [isFocused, setIsFocused] = useState(false);
  const [trending, setTrending] = useState<string[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function loadTrending() {
      try {
        const res = await suggestTrendingAreas({ numberOfAreas: 6 });
        setTrending(res.areas);
      } catch (e) {
        console.error("Failed to load trending areas", e);
        setTrending(["Bondi", "Surry Hills", "Mosman", "Paddington", "Manly", "Bronte"]);
      }
    }
    loadTrending();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto z-10">
      <div className="flex justify-center gap-1 mb-4">
        {["BUY", "RENT", "SOLD"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-8 py-3 text-xs font-bold tracking-[0.2em] transition-all",
              activeTab === tab
                ? "bg-white text-black shadow-lg"
                : "bg-black/20 text-white backdrop-blur-md hover:bg-black/40"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="relative group">
        <div className={cn(
          "bg-white p-2 rounded-sm shadow-2xl flex items-center transition-all duration-300",
          isFocused ? "scale-[1.02]" : "scale-100"
        )}>
          <div className="flex-1 flex items-center px-4">
            <Search className="w-5 h-5 text-gray-400 mr-3" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              placeholder="Search by suburb, postcode or state..."
              className="border-none focus-visible:ring-0 text-lg py-6 placeholder:text-gray-300"
            />
          </div>
          <Link href={`/search?type=${activeTab.toLowerCase()}&q=${query}`}>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold px-10 h-14 rounded-none">
              SEARCH
            </Button>
          </Link>
        </div>

        {/* AI Suggestions Dropdown */}
        {isFocused && (
          <div className="absolute top-full left-0 w-full bg-white mt-1 shadow-2xl rounded-sm p-6 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-gray-400 mb-4 tracking-widest uppercase">
                  <TrendingUp className="w-4 h-4" />
                  Trending Areas
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {trending.map((area) => (
                    <Link
                      key={area}
                      href={`/search?q=${area}`}
                      className="flex items-center gap-2 p-3 hover:bg-gray-50 rounded-md transition-colors text-sm font-medium text-gray-700"
                    >
                      <MapPin className="w-3 h-3 text-primary" />
                      {area}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-gray-400 mb-4 tracking-widest uppercase">
                  <History className="w-4 h-4" />
                  Recent Searches
                </div>
                <div className="space-y-1">
                  {["Luxury Homes in Sydney", "Apartments Melbourne CBD", "Coastal Living NSW"].map((search) => (
                    <button
                      key={search}
                      className="w-full text-left p-3 hover:bg-gray-50 rounded-md transition-colors text-sm text-gray-600"
                    >
                      {search}
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
