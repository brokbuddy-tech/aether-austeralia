"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AdvancedFilters from "@/components/advanced-filters";

type FilterBarProps = {
  total: number;
};

const LOCATION_OPTIONS = [
  { value: "all", label: "All Australia" },
  { value: "Sydney, NSW", label: "Sydney, NSW" },
  { value: "Melbourne, VIC", label: "Melbourne, VIC" },
  { value: "Brisbane, QLD", label: "Brisbane, QLD" },
  { value: "Gold Coast, QLD", label: "Gold Coast, QLD" },
];

const PRICE_OPTIONS = [
  { value: "any", label: "Any Price" },
  { value: "1000000-2000000", label: "$1M - $2M" },
  { value: "2000000-5000000", label: "$2M - $5M" },
  { value: "5000000+", label: "$5M+" },
];

const TYPE_OPTIONS = [
  { value: "all", label: "All Types" },
  { value: "House", label: "House" },
  { value: "Apartment", label: "Apartment" },
  { value: "Acreage", label: "Acreage" },
  { value: "Townhouse", label: "Townhouse" },
  { value: "Land", label: "Land" },
];

function setOrDelete(params: URLSearchParams, key: string, value?: string) {
  if (!value || value === "any" || value === "all") {
    params.delete(key);
    return;
  }
  params.set(key, value);
}

export default function FilterBar({ total }: FilterBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedPrice = useMemo(() => {
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    if (!minPrice && !maxPrice) return "any";
    if (minPrice === "1000000" && maxPrice === "2000000") return "1000000-2000000";
    if (minPrice === "2000000" && maxPrice === "5000000") return "2000000-5000000";
    if (minPrice === "5000000" && !maxPrice) return "5000000+";
    return "any";
  }, [searchParams]);

  const applyParams = (updater: (params: URLSearchParams) => void) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");
    updater(params);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="sticky top-[72px] z-40 bg-white border-b border-gray-100 shadow-sm py-3 px-6 overflow-x-auto no-scrollbar">
      <div className="max-w-7xl mx-auto flex items-center gap-6 whitespace-nowrap min-w-max">
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">LOCATION</span>
          <Select
            value={searchParams.get("q") || "all"}
            onValueChange={(value) => applyParams((params) => setOrDelete(params, "q", value))}
          >
            <SelectTrigger className="w-[180px] rounded-none border-gray-200 h-10 focus:ring-0">
              <SelectValue placeholder="All Australia" />
            </SelectTrigger>
            <SelectContent>
              {LOCATION_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">PRICE (AUD)</span>
          <Select
            value={selectedPrice}
            onValueChange={(value) => applyParams((params) => {
              params.delete("minPrice");
              params.delete("maxPrice");
              if (value === "1000000-2000000") {
                params.set("minPrice", "1000000");
                params.set("maxPrice", "2000000");
              } else if (value === "2000000-5000000") {
                params.set("minPrice", "2000000");
                params.set("maxPrice", "5000000");
              } else if (value === "5000000+") {
                params.set("minPrice", "5000000");
              }
            })}
          >
            <SelectTrigger className="w-[180px] rounded-none border-gray-200 h-10 focus:ring-0">
              <SelectValue placeholder="Any Price" />
            </SelectTrigger>
            <SelectContent>
              {PRICE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">TYPE</span>
          <Select
            value={searchParams.get("category") || "all"}
            onValueChange={(value) => applyParams((params) => setOrDelete(params, "category", value))}
          >
            <SelectTrigger className="w-[150px] rounded-none border-gray-200 h-10 focus:ring-0">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              {TYPE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">BEDS</span>
          <Select
            value={searchParams.get("bedrooms") || "any"}
            onValueChange={(value) => applyParams((params) => setOrDelete(params, "bedrooms", value))}
          >
            <SelectTrigger className="w-[90px] rounded-none border-gray-200 h-10 focus:ring-0">
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
              <SelectItem value="5+">5+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">BATH</span>
          <Select
            value={searchParams.get("bathrooms") || "any"}
            onValueChange={(value) => applyParams((params) => setOrDelete(params, "bathrooms", value))}
          >
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

        <div className="flex-shrink-0 ml-auto pl-4">
          <AdvancedFilters
            resultCount={total}
            initialFilters={{
              bedrooms: searchParams.get("bedrooms") || undefined,
              bathrooms: searchParams.get("bathrooms") || undefined,
              minPrice: searchParams.get("minPrice") || undefined,
              maxPrice: searchParams.get("maxPrice") || undefined,
              minArea: searchParams.get("minArea") || undefined,
              maxArea: searchParams.get("maxArea") || undefined,
              categories: searchParams.get("category") ? [searchParams.get("category") as string] : undefined,
            }}
            onApply={(filters) => applyParams((params) => {
              setOrDelete(params, "bedrooms", filters.bedrooms);
              setOrDelete(params, "bathrooms", filters.bathrooms);
              setOrDelete(params, "minPrice", filters.minPrice);
              setOrDelete(params, "maxPrice", filters.maxPrice);
              setOrDelete(params, "minArea", filters.minArea);
              setOrDelete(params, "maxArea", filters.maxArea);
              setOrDelete(params, "category", filters.categories?.[0]);
            })}
          />
        </div>
      </div>
    </div>
  );
}
