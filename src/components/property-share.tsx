'use client';

/**
 * @fileOverview A client-side component for sharing property details.
 * Features options for Email, WhatsApp, and Copying the URL.
 */

import { Share2, Mail, MessageSquare, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

export default function PropertyShare({ address }: { address: string }) {
  const { toast } = useToast();
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(currentUrl);
      toast({
        title: "Link Copied",
        description: "The property link has been copied to your clipboard.",
      });
    }
  };

  const shareText = `Check out this property at ${address}: ${currentUrl}`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="rounded-none border-gray-200 text-[8px] font-bold tracking-widest uppercase h-7 px-3">
          <Share2 className="w-2.5 h-2.5 mr-1.5" /> SHARE
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="rounded-none border-gray-200 p-1 min-w-[140px] z-[150] bg-white">
        <DropdownMenuItem 
          onClick={() => window.location.href = `mailto:?subject=Luxury Property Insight: ${address}&body=${encodeURIComponent(shareText)}`}
          className="rounded-none text-[9px] font-bold tracking-widest uppercase cursor-pointer hover:bg-gray-50 focus:bg-gray-50"
        >
          <Mail className="w-3 h-3 mr-2 text-primary" /> EMAIL
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank')}
          className="rounded-none text-[9px] font-bold tracking-widest uppercase cursor-pointer hover:bg-gray-50 focus:bg-gray-50"
        >
          <MessageSquare className="w-3 h-3 mr-2 text-primary" /> WHATSAPP
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={handleCopyLink}
          className="rounded-none text-[9px] font-bold tracking-widest uppercase cursor-pointer hover:bg-gray-50 focus:bg-gray-50"
        >
          <LinkIcon className="w-3 h-3 mr-2 text-primary" /> COPY LINK
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
