import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import FilterBar from "@/components/filter-bar";
import PropertyCard from "@/components/property-card";
import { Button } from "@/components/ui/button";
import { getListings } from "@/lib/api";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { getRequestAgencySlug } from "@/lib/server-agency";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    type?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    bedrooms?: string;
    bathrooms?: string;
    minArea?: string;
    maxArea?: string;
    page?: string;
  }>;
}) {
  const params = await searchParams;
  const agencySlug = await getRequestAgencySlug();
  const searchQuery = params.q || "";
  const searchType = params.type || "buy";

  const searchHeaderImage = PlaceHolderImages.find(img => img.id === 'search-header');
  const apiParams: Record<string, string> = {
    q: searchQuery,
    category: params.category || "",
    minPrice: params.minPrice || "",
    maxPrice: params.maxPrice || "",
    bedrooms: params.bedrooms || "",
    bathrooms: params.bathrooms || "",
    minArea: params.minArea || "",
    maxArea: params.maxArea || "",
    page: params.page || "1",
    limit: "12",
  };

  if (searchType === "rent") {
    apiParams.transactionType = "RENT";
    apiParams.status = "ACTIVE";
  } else if (searchType === "sold") {
    apiParams.status = "SOLD";
  } else {
    apiParams.transactionType = "SALE";
    apiParams.status = "ACTIVE";
  }

  if (searchType === "new-homes") {
    apiParams.readiness = "OFFPLAN";
  }

  const { properties, total, page, totalPages } = await getListings(apiParams, agencySlug);
  const nextPageParams = new URLSearchParams(
    Object.entries({ ...params, page: String(page + 1) })
      .filter(([, value]) => Boolean(value))
      .map(([key, value]) => [key, value as string])
  );

  return (
    <div className="pt-[72px] bg-gray-50 min-h-screen pb-20">
      {/* Header with Background Image */}
      <div className="relative py-16 px-6 border-b border-gray-100 overflow-hidden text-white">
        <Image
          src={searchHeaderImage?.imageUrl || "https://picsum.photos/seed/search-header-fallback/1920/400"}
          alt={searchHeaderImage?.description || "Search Results"}
          fill
          className="object-cover z-0"
          priority
          data-ai-hint={searchHeaderImage?.imageHint || "Luxury Street"}
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] z-10" />
        
        <div className="relative z-20 max-w-7xl mx-auto">
          <h1 className="font-headline font-extrabold text-3xl md:text-4xl mb-2 tracking-tighter uppercase">
            Properties for {searchType.toUpperCase()} {searchQuery && `in ${searchQuery}`}
          </h1>
          <p className="text-gray-200 font-body text-base">Found {total} results matching your search</p>
        </div>
      </div>
      
      <Suspense
        fallback={
          <div className="sticky top-[72px] z-40 bg-white border-b border-gray-100 shadow-sm py-3 px-6">
            <div className="max-w-7xl mx-auto h-10" />
          </div>
        }
      >
        <FilterBar total={total} />
      </Suspense>

      <div className="max-w-7xl mx-auto px-6 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>

        {page < totalPages && (
          <div className="mt-12 flex justify-center">
            <Link href={`/search?${nextPageParams.toString()}`}>
              <Button variant="outline" className="border-2 border-black rounded-none px-10 h-12 text-[11px] font-bold tracking-widest hover:bg-black hover:text-white transition-all">
                LOAD MORE PROPERTIES
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
