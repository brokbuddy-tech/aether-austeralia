"use client";

import { useState, useEffect } from "react";
import { Search, MapPin, TrendingUp, History, SlidersHorizontal, Sparkles, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { suggestTrendingAreas } from "@/ai/flows/ai-property-search-trending-areas";
import { searchWithAi, type AiSearchAgentOutput } from "@/ai/flows/ai-search-agent";
import Link from "next/link";

export default function HeroSearch() {
  const [activeTab, setActiveTab] = useState("Buy");
  const [isFocused, setIsFocused] = useState(false);
  const [trending, setTrending] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [aiResponse, setAiResponse] = useState<AiSearchAgentOutput | null>(null);

  const tabs = [
    "Buy", "Rent", "AI Agent", "House & Land", "New Homes", "Sold", "Retirement", "Rural"
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

  const handleSearch = async () => {
    if (activeTab === "AI Agent") {
      if (!query.trim()) return;
      setIsLoadingAi(true);
      setAiResponse(null);
      try {
        const response = await searchWithAi({ query });
        setAiResponse(response);
      } catch (error) {
        console.error("AI Search failed:", error);
      } finally {
        setIsLoadingAi(false);
      }
    }
  };

  const isAiMode = activeTab === "AI Agent";

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
                  setAiResponse(null);
                }}
                className={cn(
                  "px-4 py-1.5 text-[13px] font-bold tracking-tight rounded-full transition-all duration-300 flex items-center gap-2",
                  activeTab === tab
                    ? "bg-primary text-white shadow-lg"
                    : "text-white hover:bg-white/20"
                )}
              >
                {tab === "AI Agent" && <Sparkles className="w-3.5 h-3.5" />}
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
                placeholder={isAiMode ? "Ask our AI about the market, schools, or lifestyle..." : "Try a location or a school..."}
                className="border-none focus-visible:ring-0 text-sm py-3 placeholder:text-gray-400 bg-transparent h-auto"
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            
            <div className="flex items-center gap-2 pr-1">
              {!isAiMode && (
                <Button 
                  variant="outline" 
                  className="rounded-full border-gray-300 bg-transparent text-black font-bold h-9 px-4 hover:bg-gray-100 transition-all text-[11px]"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 mr-2" />
                  Filters
                </Button>
              )}
              
              {isAiMode ? (
                <Button 
                  onClick={handleSearch}
                  disabled={isLoadingAi || !query.trim()}
                  size="sm" 
                  className="bg-primary hover:opacity-90 text-white font-bold px-6 h-9 rounded-full flex items-center gap-2"
                >
                  {isLoadingAi ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                  <span className="font-headline tracking-widest uppercase text-[10px]">ASK AI</span>
                </Button>
              ) : (
                <Link href={`/search?type=${activeTab.toLowerCase()}&q=${query}`}>
                  <Button 
                    size="sm" 
                    className="bg-primary hover:opacity-90 text-white font-bold px-6 h-9 rounded-full flex items-center gap-2"
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span className="font-headline tracking-widest uppercase text-[10px]">SEARCH</span>
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* AI Response Display */}
        {aiResponse && (
          <div className="mt-4 p-6 bg-white/95 backdrop-blur-xl border border-primary/20 rounded-2xl shadow-2xl animate-in fade-in slide-in-from-top-2 duration-500 relative">
            <button 
              onClick={() => setAiResponse(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-headline font-bold text-sm uppercase tracking-wider text-primary mb-2">AI Agent Response</h4>
                <p className="text-gray-700 text-sm leading-relaxed mb-4 whitespace-pre-wrap">
                  {aiResponse.answer}
                </p>
                {aiResponse.suggestedAreas && aiResponse.suggestedAreas.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {aiResponse.suggestedAreas.map((area) => (
                      <Link 
                        key={area}
                        href={`/search?q=${area}`}
                        className="px-3 py-1 bg-gray-100 hover:bg-primary/10 hover:text-primary transition-all text-[10px] font-bold tracking-tight rounded-full border border-gray-200"
                      >
                        {area}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* AI Suggestions Dropdown (Only when focused and no AI response) */}
        {isFocused && !aiResponse && (
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
                  {isAiMode ? [
                    "Where are the best schools in Sydney?",
                    "What's the market outlook for Melbourne?",
                    "Best beach suburbs for families in NSW"
                  ].map((search) => (
                    <button
                      key={search}
                      onClick={() => {
                        setQuery(search);
                        handleSearch();
                      }}
                      className="w-full text-left p-2.5 hover:bg-primary/5 rounded-lg transition-all text-xs font-medium text-gray-600 flex items-center justify-between group"
                    >
                      {search}
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity text-primary">→</span>
                    </button>
                  )) : [
                    "Luxury Homes in Sydney", 
                    "Apartments Melbourne CBD", 
                    "Coastal Living NSW"
                  ].map((search) => (
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
