"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import FacilityCard from "@/components/facilities/facilityCard";
import { FilterCategoryInput } from "@/components/navbar/filterCategoryInput";

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
  name: string;
  category: string;
  description: string;
  city: string;
  location_link: string;
  price_per_day: number;
  rating: number;
  created_at: string;
  updated_at: string;
  amenities: string[];
  images: FacilityImage[];
}

const categories = [
    { label: "Cooking", icon: "cooking", value:"Cooking"},
    { label: "Cleaning", icon: "cleaning", value:"Cleaning"},
    { label: "Textile", icon: "textile", value:"Textile"},
    { label: "Automotive", icon: "automotive", value:"Automotive"},
    { label: "Furniture", icon: "furniture", value:"Furniture"},
    { label: "Others", icon: "others", value:"Others"},
  ];

const fetchFacilities = (url: string) => fetch(url).then(res => res.json());

export default function FacilitySearchPage() {
  const searchQuery = useSearchParams().get("query") || "";
  const { data, isLoading } = useSWR<Facility[]>(
    `http://localhost:8000/facilities/?category=${encodeURIComponent(searchQuery)}`,
    fetchFacilities
  );

  return (
    <div className="flex h-screen w-full flex-col">
        <FilterCategoryInput categories={categories} />
      <div className="flex-grow p-4">
        {isLoading ? (
          <div>Loading...</div>
        ) : !data || data.length === 0 ? (
          <div>No facilities found</div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data.map((facility) => (
              <FacilityCard key={facility.uuid} {...facility} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}