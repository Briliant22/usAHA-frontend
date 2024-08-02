"use client";

import FacilityCard from "@/components/facilities/facilityCard";
import LoadingPage from "@/components/loadingPage";
import FilterCategoryInput from "@/components/navbar/filterCategoryInput";
import Link from "next/link";
import React, { useEffect, useState } from "react";

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

export default function Page() {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<
    "kitchen" | "art studio" | "workshop" | "others" | null
  >(null);

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/facilities/`,
          {
            cache: "no-store",
          },
        );
        if (response.ok) {
          const data: Facility[] = await response.json();
          setFacilities(data);
        } else {
          throw new Error("Gagal mengambil fasilitas");
        }
      } catch (err) {
        setError("Gagal mengambil fasilitas. Coba lagi di lain waktu.");
        console.error(err);
      }
      setLoading(false);
    };

    fetchFacilities();
  }, []);

  if (loading) return <LoadingPage />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex h-screen w-full flex-col items-center">
      <div className="w-4/5 px-10 py-4">
        <FilterCategoryInput
          setCategory={setCategory}
          activeCategory={category}
        />
      </div>
      <div className="flex flex-grow p-4">
        <div className="mx-auto grid grid-cols-1 gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {facilities
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
