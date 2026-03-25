
"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import AdvancedFilters from "@/components/advanced-filters";
import { cn } from "@/lib/utils";

export default function FilterBar() {
  return (
    <div className="sticky top-[72px] z-40 bg-white border-b border-gray-100 shadow-sm py-3 px-6 overflow-x-auto no-scrollbar">
      <div className="max-w-7xl mx-auto flex items-center gap-6 whitespace-nowrap min-w-max">
        {/* Location Filter */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">LOCATION</span>
          <Select defaultValue="sydney">
            <SelectTrigger className="w-[180px] rounded-none border-gray-200 h-10 focus:ring-0">
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

        {/* Price Filter */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">PRICE (AUD)</span>
          <Select defaultValue="any">
            <SelectTrigger className="w-[180px] rounded-none border-gray-200 h-10 focus:ring-0">
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

        {/* Property Type Filter */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">TYPE</span>
          <Select defaultValue="house">
            <SelectTrigger className="w-[150px] rounded-none border-gray-200 h-10 focus:ring-0">
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

        {/* Bedrooms Filter */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">BEDS</span>
          <Select defaultValue="3">
            <SelectTrigger className="w-[90px] rounded-none border-gray-200 h-10 focus:ring-0">
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

        {/* Bathrooms Filter */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">BATH</span>
          <Select defaultValue="any">
            <SelectTrigger className="w-[90px] rounded-none border-gray-200 h-10 focus:ring-0">
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

        {/* More Filters Component */}
        <div className="flex-shrink-0 ml-auto pl-4">
          <AdvancedFilters onApply={(filters) => console.log('Applying search bar filters:', filters)} />
        </div>
      </div>
    </div>
  );
}
