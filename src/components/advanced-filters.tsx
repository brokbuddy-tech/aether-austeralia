"use client";

import * as React from "react";
import { X, SlidersHorizontal, Info, Car, Bed, Bath, Trees, Waves, Sun, Shield, Dog, Move, Sofa, DollarSign } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface AdvancedFiltersProps {
  initialFilters?: {
    bedrooms?: string;
    bathrooms?: string;
    minPrice?: string;
    maxPrice?: string;
    minArea?: string;
    maxArea?: string;
    categories?: string[];
  };
  onApply?: (filters: {
    bedrooms?: string;
    bathrooms?: string;
    minPrice?: string;
    maxPrice?: string;
    minArea?: string;
    maxArea?: string;
    categories?: string[];
  }) => void;
  resultCount?: number;
}

export default function AdvancedFilters({ initialFilters, onApply, resultCount = 142 }: AdvancedFiltersProps) {
  const [open, setOpen] = React.useState(false);
  const [beds, setBeds] = React.useState<string>(initialFilters?.bedrooms || "any");
  const [baths, setBaths] = React.useState<string>(initialFilters?.bathrooms || "any");
  const [cars, setCars] = React.useState<string>("any");
  const [propertyTypes, setPropertyTypes] = React.useState<string[]>(initialFilters?.categories || []);
  
  const [minPrice, setMinPrice] = React.useState(initialFilters?.minPrice || "");
  const [maxPrice, setMaxPrice] = React.useState(initialFilters?.maxPrice || "");
  const [minLand, setMinLand] = React.useState(initialFilters?.minArea || "");
  const [maxLand, setMaxLand] = React.useState(initialFilters?.maxArea || "");

  React.useEffect(() => {
    setBeds(initialFilters?.bedrooms || "any");
    setBaths(initialFilters?.bathrooms || "any");
    setPropertyTypes(initialFilters?.categories || []);
    setMinPrice(initialFilters?.minPrice || "");
    setMaxPrice(initialFilters?.maxPrice || "");
    setMinLand(initialFilters?.minArea || "");
    setMaxLand(initialFilters?.maxArea || "");
  }, [initialFilters]);

  const togglePropertyType = (type: string) => {
    setPropertyTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const clearAll = () => {
    setBeds("any");
    setBaths("any");
    setCars("any");
    setPropertyTypes([]);
    setMinPrice("");
    setMaxPrice("");
    setMinLand("");
    setMaxLand("");
  };

  const handleShowProperties = () => {
    onApply?.({ 
      bedrooms: beds !== "any" ? beds : undefined,
      bathrooms: baths !== "any" ? baths : undefined,
      categories: propertyTypes.length > 0 ? propertyTypes : undefined,
      minPrice: minPrice || undefined,
      maxPrice: maxPrice || undefined,
      minArea: minLand || undefined,
      maxArea: maxLand || undefined,
    });
    setOpen(false);
  };

  const FilterSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="py-6 border-b border-gray-100 last:border-0">
      <h3 className="font-headline font-bold text-[10px] tracking-[0.2em] uppercase mb-4 text-[#111111]">
        {title}
      </h3>
      {children}
    </div>
  );

  const ToggleGroup = ({ 
    label, 
    value, 
    onChange, 
    options,
    icon: Icon
  }: { 
    label: string; 
    value: string; 
    onChange: (val: string) => void; 
    options: string[];
    icon?: any;
  }) => (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        {Icon && <Icon className="w-3.5 h-3.5 text-gray-400" />}
        <Label className="text-[9px] font-bold text-gray-400 tracking-widest uppercase">{label}</Label>
      </div>
      <div className="flex gap-1.5">
        {options.map((opt) => (
          <Button
            key={opt}
            variant={value === opt ? "default" : "outline"}
            onClick={() => onChange(opt)}
            className={cn(
              "flex-1 rounded-none h-10 font-bold text-[10px] transition-all focus-visible:ring-0 focus-visible:ring-offset-0 outline-none",
              value === opt ? "bg-primary text-white" : "border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-black"
            )}
          >
            {opt === "any" ? "ANY" : opt === options[options.length - 1] ? `${opt}+` : opt}
          </Button>
        ))}
      </div>
    </div>
  );

  const RangeInputs = ({ 
    label, 
    minVal, 
    maxVal, 
    onMinChange, 
    onMaxChange, 
    prefix, 
    suffix,
    icon: Icon 
  }: { 
    label: string; 
    minVal: string; 
    maxVal: string; 
    onMinChange: (val: string) => void; 
    onMaxChange: (val: string) => void; 
    prefix?: string;
    suffix?: string;
    icon?: any;
  }) => (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        {Icon && <Icon className="w-3.5 h-3.5 text-gray-400" />}
        <Label className="text-[9px] font-bold text-gray-400 tracking-widest uppercase">{label}</Label>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          {prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-[10px]">{prefix}</span>}
          <Input 
            type="number"
            placeholder="Min" 
            value={minVal}
            onChange={(e) => onMinChange(e.target.value)}
            className={cn("rounded-none h-11 border-gray-200 bg-white focus-visible:ring-0 focus-visible:ring-offset-0 outline-none text-xs", prefix && "pl-7", suffix && "pr-8")}
          />
          {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-[9px]">{suffix}</span>}
        </div>
        <div className="w-3 h-px bg-gray-200" />
        <div className="relative flex-1">
          {prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-[10px]">{prefix}</span>}
          <Input 
            type="number"
            placeholder="Max" 
            value={maxVal}
            onChange={(e) => onMaxChange(e.target.value)}
            className={cn("rounded-none h-11 border-gray-200 bg-white focus-visible:ring-0 focus-visible:ring-offset-0 outline-none text-xs", prefix && "pl-7", suffix && "pr-8")}
          />
          {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-[9px]">{suffix}</span>}
        </div>
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="rounded-full border-gray-300 bg-transparent text-black font-bold h-8 px-3.5 hover:bg-gray-100 hover:text-black transition-all text-[10px] focus-visible:ring-0 focus-visible:ring-offset-0 outline-none"
        >
          <SlidersHorizontal className="w-3 h-3 mr-1.5" />
          More Filters
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md h-[80vh] p-0 rounded-none border-none bg-white/95 backdrop-blur-xl shadow-2xl flex flex-col">
        <DialogHeader className="p-6 border-b border-gray-100 flex-shrink-0">
          <div className="flex justify-between items-center">
            <DialogTitle className="font-headline font-extrabold text-2xl tracking-tighter uppercase text-[#111111]">Advanced Filters</DialogTitle>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 px-6">
          <div className="pb-8">
            {/* Price Range */}
            <FilterSection title="Price Range">
              <RangeInputs 
                label="Property Price (AUD)" 
                minVal={minPrice} 
                maxVal={maxPrice} 
                onMinChange={setMinPrice} 
                onMaxChange={setMaxPrice} 
                prefix="$"
                icon={DollarSign}
              />
            </FilterSection>

            {/* Property Specifications */}
            <FilterSection title="The Essentials">
              <ToggleGroup 
                label="Bedrooms" 
                value={beds} 
                onChange={setBeds} 
                options={["any", "1", "2", "3", "4", "5"]} 
                icon={Bed}
              />
              <ToggleGroup 
                label="Bathrooms" 
                value={baths} 
                onChange={setBaths} 
                options={["any", "1", "2", "3", "4"]} 
                icon={Bath}
              />
              <ToggleGroup 
                label="Car Spaces" 
                value={cars} 
                onChange={setCars} 
                options={["any", "1", "2", "3"]} 
                icon={Car}
              />
              
              <RangeInputs 
                label="Land Size" 
                minVal={minLand} 
                maxVal={maxLand} 
                onMinChange={setMinLand} 
                onMaxChange={setMaxLand} 
                suffix="m²"
                icon={Move}
              />
            </FilterSection>

            {/* Property Types */}
            <FilterSection title="Property Type">
              <div className="flex flex-wrap gap-2">
                {["House", "Apartment", "Townhouse", "Terrace", "Acreage", "Villa", "Duplex", "Land"].map((type) => (
                  <button
                    key={type}
                    onClick={() => togglePropertyType(type)}
                    className={cn(
                      "px-4 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all border focus-visible:ring-0 focus-visible:ring-offset-0 outline-none",
                      propertyTypes.includes(type)
                        ? "bg-primary text-white border-primary"
                        : "bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-black"
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </FilterSection>

            {/* Key Features */}
            <FilterSection title="Key Features & Amenities">
              <div className="grid grid-cols-1 gap-y-4">
                {[
                  { label: "Swimming Pool", icon: Waves },
                  { label: "Air Conditioning", icon: Sun },
                  { label: "Solar Panels", icon: Sun, highlight: true },
                  { label: "Waterfront", icon: Waves },
                  { label: "Outdoor Entertaining", icon: Trees },
                  { label: "Built-in Robes", icon: Sofa },
                  { label: "Study / Home Office", icon: Shield },
                  { label: "Fully Fenced", icon: Shield },
                ].map((item) => (
                  <div key={item.label} className="flex items-center space-x-3 group cursor-pointer">
                    <Checkbox id={item.label} className="rounded-none border-gray-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:ring-0 focus-visible:ring-offset-0 outline-none" />
                    <label 
                      htmlFor={item.label}
                      className="text-xs font-bold text-gray-600 cursor-pointer group-hover:text-black flex items-center gap-2 transition-colors"
                    >
                      {item.label}
                      {item.highlight && <Badge variant="secondary" className="bg-primary/10 text-primary text-[8px] px-1.5 h-4 rounded-none">ECO</Badge>}
                    </label>
                  </div>
                ))}
              </div>
            </FilterSection>

            {/* Requirements */}
            <FilterSection title="Requirements">
              <div className="grid grid-cols-1 gap-4">
                {[
                  { label: "Pet Friendly", icon: Dog },
                  { label: "Wheelchair Accessible", icon: Move },
                  { label: "Furnished", icon: Sofa },
                  { label: "Elite School Catchment", icon: Shield, highlight: true },
                ].map((item) => (
                  <div key={item.label} className="flex items-center space-x-3 p-3 bg-gray-50 border border-transparent hover:border-gray-200 transition-all cursor-pointer group">
                    <Checkbox id={item.label} className="rounded-none border-gray-300 data-[state=checked]:bg-primary focus-visible:ring-0 focus-visible:ring-offset-0 outline-none" />
                    <label htmlFor={item.label} className="text-[10px] font-bold text-gray-500 cursor-pointer flex-1 flex items-center gap-2 group-hover:text-black transition-colors">
                      {item.label}
                      {item.highlight && <Info className="w-3 h-3 text-primary" />}
                    </label>
                  </div>
                ))}
              </div>
            </FilterSection>
          </div>
        </ScrollArea>

        {/* Sticky Footer */}
        <div className="p-6 border-t border-gray-100 bg-white/95 backdrop-blur-md flex items-center justify-between flex-shrink-0">
          <button 
            onClick={clearAll}
            className="text-[10px] font-bold text-gray-400 hover:text-black tracking-widest uppercase underline underline-offset-4 focus-visible:ring-0 focus-visible:ring-offset-0 outline-none"
          >
            Clear All
          </button>
          <Button 
            onClick={handleShowProperties}
            className="bg-[#111111] hover:bg-black text-white px-8 h-12 rounded-none font-bold text-[10px] tracking-[0.2em] uppercase transition-all shadow-xl focus-visible:ring-0 focus-visible:ring-offset-0 outline-none"
          >
            Show {resultCount} Properties
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
