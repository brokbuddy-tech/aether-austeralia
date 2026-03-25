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
  onApply?: (filters: any) => void;
  resultCount?: number;
}

export default function AdvancedFilters({ onApply, resultCount = 142 }: AdvancedFiltersProps) {
  const [open, setOpen] = React.useState(false);
  const [beds, setBeds] = React.useState<string>("any");
  const [baths, setBaths] = React.useState<string>("any");
  const [cars, setCars] = React.useState<string>("any");
  const [propertyTypes, setPropertyTypes] = React.useState<string[]>([]);
  
  const [minPrice, setMinPrice] = React.useState("");
  const [maxPrice, setMaxPrice] = React.useState("");
  const [minLand, setMinLand] = React.useState("");
  const [maxLand, setMaxLand] = React.useState("");

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
      beds, 
      baths, 
      cars, 
      propertyTypes, 
      minPrice, 
      maxPrice, 
      minLand, 
      maxLand 
    });
    setOpen(false);
  };

  const FilterSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="py-8 border-b border-gray-100 last:border-0">
      <h3 className="font-headline font-bold text-sm tracking-[0.2em] uppercase mb-6 text-[#111111]">
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
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        {Icon && <Icon className="w-4 h-4 text-gray-400" />}
        <Label className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">{label}</Label>
      </div>
      <div className="flex gap-2">
        {options.map((opt) => (
          <Button
            key={opt}
            variant={value === opt ? "default" : "outline"}
            onClick={() => onChange(opt)}
            className={cn(
              "flex-1 rounded-none h-12 font-bold text-xs transition-all focus-visible:ring-0 focus-visible:ring-offset-0 outline-none",
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
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        {Icon && <Icon className="w-4 h-4 text-gray-400" />}
        <Label className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">{label}</Label>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          {prefix && <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xs">{prefix}</span>}
          <Input 
            type="number"
            placeholder="Min" 
            value={minVal}
            onChange={(e) => onMinChange(e.target.value)}
            className={cn("rounded-none h-14 border-gray-200 bg-white focus-visible:ring-0 focus-visible:ring-offset-0 outline-none", prefix && "pl-8", suffix && "pr-10")}
          />
          {suffix && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-[10px]">{suffix}</span>}
        </div>
        <div className="w-4 h-px bg-gray-200" />
        <div className="relative flex-1">
          {prefix && <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xs">{prefix}</span>}
          <Input 
            type="number"
            placeholder="Max" 
            value={maxVal}
            onChange={(e) => onMaxChange(e.target.value)}
            className={cn("rounded-none h-14 border-gray-200 bg-white focus-visible:ring-0 focus-visible:ring-offset-0 outline-none", prefix && "pl-8", suffix && "pr-10")}
          />
          {suffix && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-[10px]">{suffix}</span>}
        </div>
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="rounded-full border-gray-300 bg-transparent text-black font-bold h-9 px-4 hover:bg-gray-100 hover:text-black transition-all text-[11px] focus-visible:ring-0 focus-visible:ring-offset-0 outline-none"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 mr-2" />
          More Filters
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl h-[90vh] p-0 rounded-none border-none bg-white/95 backdrop-blur-xl shadow-2xl flex flex-col">
        <DialogHeader className="p-8 border-b border-gray-100 flex-shrink-0">
          <div className="flex justify-between items-center">
            <DialogTitle className="font-headline font-extrabold text-3xl tracking-tighter uppercase text-[#111111]">Advanced Filters</DialogTitle>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 px-8">
          <div className="pb-12">
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
              <div className="flex flex-wrap gap-3">
                {["House", "Apartment", "Townhouse", "Terrace", "Acreage", "Villa", "Duplex", "Land"].map((type) => (
                  <button
                    key={type}
                    onClick={() => togglePropertyType(type)}
                    className={cn(
                      "px-6 py-3 rounded-full text-[11px] font-bold tracking-widest uppercase transition-all border focus-visible:ring-0 focus-visible:ring-offset-0 outline-none",
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
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
                      className="text-sm font-bold text-gray-600 cursor-pointer group-hover:text-black flex items-center gap-2 transition-colors"
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: "Pet Friendly", icon: Dog },
                  { label: "Wheelchair Accessible", icon: Move },
                  { label: "Furnished", icon: Sofa },
                  { label: "Elite School Catchment", icon: Shield, highlight: true },
                ].map((item) => (
                  <div key={item.label} className="flex items-center space-x-3 p-4 bg-gray-50 border border-transparent hover:border-gray-200 transition-all cursor-pointer group">
                    <Checkbox id={item.label} className="rounded-none border-gray-300 data-[state=checked]:bg-primary focus-visible:ring-0 focus-visible:ring-offset-0 outline-none" />
                    <label htmlFor={item.label} className="text-xs font-bold text-gray-500 cursor-pointer flex-1 flex items-center gap-2 group-hover:text-black transition-colors">
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
        <div className="p-8 border-t border-gray-100 bg-white/95 backdrop-blur-md flex items-center justify-between flex-shrink-0">
          <button 
            onClick={clearAll}
            className="text-[11px] font-bold text-gray-400 hover:text-black tracking-widest uppercase underline underline-offset-4 focus-visible:ring-0 focus-visible:ring-offset-0 outline-none"
          >
            Clear All
          </button>
          <Button 
            onClick={handleShowProperties}
            className="bg-[#111111] hover:bg-black text-white px-10 h-14 rounded-none font-bold text-xs tracking-[0.2em] uppercase transition-all shadow-xl focus-visible:ring-0 focus-visible:ring-offset-0 outline-none"
          >
            Show {resultCount} Properties
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}