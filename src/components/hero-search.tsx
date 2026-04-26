"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, TrendingUp, History, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { suggestTrendingAreas } from "@/ai/flows/ai-property-search-trending-areas";
import Link from "next/link";
import AdvancedFilters from "@/components/advanced-filters";

export default function HeroSearch() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Buy");
  const [lastNonAiTab, setLastNonAiTab] = useState("Buy");
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

  const getSearchType = () => {
    const sourceTab = activeTab === "AI Agent" ? lastNonAiTab : activeTab;
    return sourceTab.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  };

  const isAiMode = activeTab === "AI Agent";

  const navigateToSearch = (overrides?: Record<string, string | undefined>) => {
    const params = new URLSearchParams();
    params.set("type", overrides?.type || getSearchType());

    const nextQuery = overrides?.q ?? query.trim();
    if (nextQuery) {
      params.set("q", nextQuery);
    }

    Object.entries(overrides || {}).forEach(([key, value]) => {
      if (key === "type" || key === "q") return;
      if (value) {
        params.set(key, value);
      }
    });

    if (isAiMode) {
      params.set("ai", "1");
    }

    router.push(`/search?${params.toString()}`);
  };

  const handleAiButtonClick = () => {
    if (!isAiMode) {
      setLastNonAiTab(activeTab);
      setActiveTab("AI Agent");
      return;
    }

    if (query.trim()) {
      navigateToSearch();
    }
  };

  const toggleAiMode = () => {
    if (isAiMode) {
      setActiveTab(lastNonAiTab);
    } else {
      setLastNonAiTab(activeTab);
      setActiveTab("AI Agent");
    }
  };

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
                onClick={() => {
                  setActiveTab(tab);
                }}
                className={cn(
                  "px-4 py-1.5 text-[13px] font-bold tracking-tight rounded-full transition-all duration-300 flex items-center gap-2",
                  activeTab === tab && !isAiMode
                    ? "bg-primary text-white shadow-lg"
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
                placeholder={isAiMode ? "Describe your ideal lifestyle or area..." : "Try a location or a school..."}
                className="border-none focus-visible:ring-0 text-sm py-3 placeholder:text-gray-400 bg-transparent h-auto"
                onKeyDown={(e) => e.key === 'Enter' && navigateToSearch()}
              />
            </div>
            
            <div className="flex items-center gap-2 pr-1">
              {!isAiMode && (
                <AdvancedFilters 
                  onApply={(filters) => navigateToSearch({
                    bedrooms: filters.bedrooms,
                    bathrooms: filters.bathrooms,
                    minPrice: filters.minPrice,
                    maxPrice: filters.maxPrice,
                    minArea: filters.minArea,
                    maxArea: filters.maxArea,
                    category: filters.categories?.[0],
                  })} 
                  resultCount={142} 
                />
              )}

              <Button
                onClick={handleAiButtonClick}
                variant={isAiMode ? "default" : "secondary"}
                className={cn(
                  "rounded-full font-bold h-9 px-4 transition-all text-[11px] flex items-center gap-2",
                  isAiMode ? "bg-accent text-white hover:bg-accent/90" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                )}
              >
                <Sparkles className={cn("w-3.5 h-3.5", isAiMode && "animate-pulse")} />
                {isAiMode && query.trim() ? "Search with AI" : "AI Agent"}
              </Button>
              
              {!isAiMode && (
                <Button 
                  size="sm" 
                  onClick={() => navigateToSearch()}
                  className="bg-primary hover:opacity-90 text-white font-bold px-6 h-9 rounded-full flex items-center gap-2"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span className="font-headline tracking-widest uppercase text-[10px]">SEARCH</span>
                </Button>
              )}

              {isAiMode && (
                <Button 
                  onClick={toggleAiMode}
                  variant="ghost" 
                  size="icon"
                  className="rounded-full w-9 h-9 text-gray-400 hover:text-black"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Suggestions Dropdown */}
        {isFocused && (
          <div className="absolute top-[calc(100%+10px)] left-0 w-full bg-white/95 backdrop-blur-xl mt-1 shadow-2xl rounded-3xl p-6 z-50 animate-in fade-in slide-in-from-top-4 duration-500 border border-white/40 text-left">
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
                      href={`/search?q=${encodeURIComponent(area)}&type=${getSearchType()}`}
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
                  Expert Inquiries
                </div>
                <div className="space-y-1.5">
                  {isAiMode ? [
                    "What are the best schools in Sydney?",
                    "Where should I invest for long-term growth?",
                    "Best beach suburbs for young families"
                  ].map((search) => (
                    <button
                      key={search}
                      onClick={() => {
                        setQuery(search);
                        navigateToSearch({ q: search });
                      }}
                      className="w-full text-left p-2.5 hover:bg-primary/5 rounded-lg transition-all text-xs font-medium text-gray-600 flex items-center justify-between group"
                    >
                      {search}
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity text-primary">→</span>
                    </button>
                  )) : [
                    "Luxury Waterfront Estates", 
                    "Melbourne CBD Penthouse", 
                    "Byron Bay Coastal Living"
                  ].map((search) => (
                    <button
                      key={search}
                      onClick={() => navigateToSearch({ q: search })}
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
