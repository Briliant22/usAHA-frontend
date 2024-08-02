"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import FacilityCard from "@/components/facilities/facilityCard";
import FilterCategoryInput from "@/components/navbar/filterCategoryInput";
import LoadingPage from "@/components/loadingPage";
import Link from "next/link";

interface Amenity {
  uuid: string;
  name: string;
  facility: string;
}

interface FacilityImage {
  uuid: string;
  facility: string;
  image: string;
  is_primary: boolean;
}

interface Facility {
  uuid: string;
  owner: string;
  owner_name: string;
  owner_pfp: string;
  owner_start: string;
  name: string;
  category: "kitchen" | "art studio" | "workshop" | "others" | null;
  description: string;
  city: string;
  location_link: string;
  price_per_day: number;
  rating: number;
  created_at: string;
  updated_at: string;
  amenities: Amenity[];
  images: FacilityImage[];
}

type FacilityResponse = Facility[];

const getSearchResults = async (url: string) => {
  const response = await fetch(url, {
    method: "GET",
  });
  const facilities: FacilityResponse = await response.json();
  return facilities;
};

export default function Page() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query") || "";
  const encodedSearchQuery = encodeURI(searchQuery);
  const { data, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/facilities/?name=${encodedSearchQuery}`,
    getSearchResults,
  );
  const [category, setCategory] = useState<
    "kitchen" | "art studio" | "workshop" | "others" | null
  >(null);

  if (isLoading) return <LoadingPage />;
  if (!data || data.length === 0)
    return (
      <div className="flex h-screen w-full flex-col items-center">
        <div className="w-4/5 px-10 py-4">
          <FilterCategoryInput
            setCategory={setCategory}
            activeCategory={category}
          />
        </div>
        <div className="flex w-full items-center justify-center">
          <p className="text-[20px] font-medium">No facilities found</p>
        </div>
      </div>
    );

  return (
    <div className="flex h-screen w-full flex-col items-center">
      <div className="w-4/5 px-10 py-4">
        <FilterCategoryInput
          setCategory={setCategory}
          activeCategory={category}
        />
      </div>
      <div className="flex flex-grow p-4">
        <div className="mx-auto grid grid-cols-1 gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
          {data
            .filter((facility) => !category || facility.category === category)
            .map((facility) => (
              <Link
                href={`/sewa-tempat/details/${facility.uuid}`}
                key={facility.uuid}
              >
                <FacilityCard
                  key={facility.uuid}
                  facility={facility}
                  isOwner={false}
                />
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
