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
  const [lastNonAiTab, setLastNonAiTab] = useState("Buy");
  const [isFocused, setIsFocused] = useState(false);
  const [trending, setTrending] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [aiResponse, setAiResponse] = useState<AiSearchAgentOutput | null>(null);

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

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    // Ensure we are in AI mode if handleSearch is triggered (e.g., via Enter key)
    if (activeTab !== "AI Agent") {
      setLastNonAiTab(activeTab);
      setActiveTab("AI Agent");
    }

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
  };

  const isAiMode = activeTab === "AI Agent";

  const handleAiButtonClick = () => {
    if (!isAiMode) {
      setLastNonAiTab(activeTab);
      setActiveTab("AI Agent");
      setAiResponse(null);
      // If there's already text, trigger search immediately for better UX
      if (query.trim()) {
        handleSearch();
      }
    } else if (query.trim()) {
      // If already in AI mode and has text, act as a search button
      handleSearch();
    }
  };

  const toggleAiMode = () => {
    if (isAiMode) {
      setActiveTab(lastNonAiTab);
    } else {
      setLastNonAiTab(activeTab);
      setActiveTab("AI Agent");
    }
    setAiResponse(null);
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
                  setAiResponse(null);
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
                onKeyDown={(e) => e.key === 'Enter' && (isAiMode ? handleSearch() : null)}
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

              <Button
                onClick={handleAiButtonClick}
                variant={isAiMode ? "default" : "secondary"}
                className={cn(
                  "rounded-full font-bold h-9 px-4 transition-all text-[11px] flex items-center gap-2",
                  isAiMode ? "bg-accent text-white hover:bg-accent/90" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                )}
                disabled={isLoadingAi}
              >
                {isLoadingAi ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Sparkles className={cn("w-3.5 h-3.5", isAiMode && "animate-pulse")} />
                )}
                {isAiMode && query.trim() ? "Search with AI" : "AI Agent"}
              </Button>
              
              {!isAiMode && (
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

        {/* AI Response Display */}
        {aiResponse && (
          <div className="mt-4 p-6 bg-white/95 backdrop-blur-xl border border-primary/20 rounded-2xl shadow-2xl animate-in fade-in slide-in-from-top-2 duration-500 relative text-left">
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
                <h4 className="font-headline font-bold text-sm uppercase tracking-wider text-primary mb-2">AI Property Insights</h4>
                <p className="text-gray-700 text-sm leading-relaxed mb-4 whitespace-pre-wrap">
                  {aiResponse.answer}
                </p>
                {aiResponse.suggestedAreas && aiResponse.suggestedAreas.length > 0 && (
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Recommended Areas to Explore</p>
                    <div className="flex flex-wrap gap-2">
                      {aiResponse.suggestedAreas.map((area) => (
                        <Link 
                          key={area}
                          href={`/search?q=${area}`}
                          className="px-4 py-2 bg-gray-50 hover:bg-primary hover:text-white transition-all text-[11px] font-bold tracking-tight rounded-full border border-gray-200 shadow-sm"
                        >
                          {area}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Suggestions Dropdown */}
        {isFocused && !aiResponse && !isLoadingAi && (
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
                        handleSearch();
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
