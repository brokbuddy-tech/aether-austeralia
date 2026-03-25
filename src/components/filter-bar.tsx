
"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

export default function FilterBar() {
  return (
    <div className="sticky top-[72px] z-40 bg-white border-b border-gray-100 shadow-sm py-3 px-6 overflow-x-auto">
      <div className="max-w-7xl mx-auto flex items-center gap-4 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-gray-400 tracking-widest">LOCATION</span>
          <Select defaultValue="sydney">
            <SelectTrigger className="w-[180px] rounded-none border-gray-200">
              <SelectValue placeholder="All Australia" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sydney">Sydney, NSW</SelectItem>
              <SelectItem value="melbourne">Melbourne, VIC</SelectItem>
              <SelectItem value="brisbane">Brisbane, QLD</SelectItem>
              <SelectItem value="gold-coast">Gold Coast, QLD</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-gray-400 tracking-widest">PRICE (AUD)</span>
          <Select defaultValue="any">
            <SelectTrigger className="w-[180px] rounded-none border-gray-200">
              <SelectValue placeholder="Any Price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Price</SelectItem>
              <SelectItem value="1m">$1M - $2M</SelectItem>
              <SelectItem value="2m">$2M - $5M</SelectItem>
              <SelectItem value="5m">$5M+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-gray-400 tracking-widest">TYPE</span>
          <Select defaultValue="house">
            <SelectTrigger className="w-[150px] rounded-none border-gray-200">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="acreage">Acreage</SelectItem>
              <SelectItem value="townhouse">Townhouse</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-gray-400 tracking-widest">BEDS</span>
          <Select defaultValue="3">
            <SelectTrigger className="w-[100px] rounded-none border-gray-200">
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-gray-400 tracking-widest">BATH</span>
          <Select defaultValue="any">
            <SelectTrigger className="w-[100px] rounded-none border-gray-200">
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button variant="outline" className="ml-auto rounded-none border-gray-200 flex items-center gap-2 font-bold px-6">
          <Filter className="w-4 h-4" />
          MORE FILTERS
        </Button>
      </div>
    </div>
  );
}
