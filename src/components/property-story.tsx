"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface PropertyStoryProps {
  story: string;
}

export default function PropertyStory({ story }: PropertyStoryProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 500; // Character limit for the truncated view

  const shouldTruncate = story.length > maxLength;
  const displayedStory = isExpanded || !shouldTruncate 
    ? story 
    : story.slice(0, maxLength).trim() + "...";

  return (
    <div className="mb-16">
      <h2 className="font-headline font-extrabold text-base uppercase tracking-tighter mb-6 text-primary">THE PROPERTY STORY</h2>
      <div className="text-gray-600 leading-relaxed font-body text-sm whitespace-pre-wrap transition-all duration-300">
        {displayedStory}
      </div>
      {shouldTruncate && (
        <Button 
          variant="link" 
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-0 h-auto mt-4 text-[10px] font-bold tracking-[0.3em] uppercase text-primary hover:no-underline hover:text-[#111111] transition-colors"
        >
          {isExpanded ? "READ LESS —" : "READ MORE +"}
        </Button>
      )}
    </div>
  );
}
