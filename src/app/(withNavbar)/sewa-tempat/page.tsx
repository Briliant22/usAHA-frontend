import FacilityCard from "@/components/facilities/facilityCard";
import { FilterCategoryInput } from "@/components/navbar/filterCategoryInput";
import Link from "next/link";
import React from "react";

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
  category: string;
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

const getFacility = async (url: string) => {
  const response = await fetch(url, {
    cache: "no-store",
  });
  const data: Facility[] = await response.json();
  return data;
};

export default async function Page() {
  const facilities = await getFacility("http://localhost:8000/facilities/");

  return (
    <div className="flex h-screen w-full flex-col">
      <div className="w-full px-10 py-4">
        <FilterCategoryInput />
      </div>
      <div className="flex flex-grow p-4">
        <div className="mx-auto grid grid-cols-1 gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {facilities.map((facility) => (
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
