"use client";

import React from "react";
import FacilityDetail from "@/components/facilities/facilityDetail";
import BackButton from "@/components/backButton";
import Link from "next/link";
import TextButton from "@/components/textButton";
import { useUser } from "@/components/isomorphic/userContext";
import { useRouter } from "next/navigation";

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

const getFacilityDetails = async (
  url: string,
  idFacility: string,
): Promise<Facility> => {
  const response = await fetch(`${url}facility/${idFacility}/`, {
    credentials: "include",
    cache: "no-store",
  });
  const facilityData: Facility = await response.json();
  return facilityData;
};

export default async function Page({
  params,
}: {
  params: { idFacility: string };
}) {
  const { user, fetchWithCredentials } = useUser();
  const router = useRouter();

  const facilityData = await getFacilityDetails(
    "http://localhost:8000/facilities/",
    params.idFacility,
  );

  const handleDelete = async () => {
    try {
      if (user?.id === facilityData.owner) {
        const response = await fetchWithCredentials(
          `http://localhost:8000/facilities/facility/${facilityData.uuid}/`,
          {
            method: "DELETE",
          },
        );

        if (!response.ok) {
          throw new Error("Delete failed");
        }
        router.push(`/listing/`);
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  return (
    <div className="relative flex w-full flex-col items-center justify-center">
      <BackButton href={`/listing/`} />
      <div className="flex w-3/4 items-center justify-between">
        <div className="flex flex-col justify-start">
          <h1 className="text-[32px] font-bold text-[#4082E5]">Selamat!</h1>
          <p className="text-[24px] font-semibold">
            Properti Anda berhasil di-listing
          </p>
        </div>
        <div className="flex items-center justify-center">
          <Link href={`/listing/update/${facilityData.uuid}/`}>
            <TextButton
              label="Update informasi listing"
              size="large"
              type="secondary"
            />
          </Link>
          <TextButton
            label="Delete listing"
            size="large"
            type="negative"
            onClick={handleDelete}
          />
        </div>
      </div>
      <div className="my-3 h-[1px] w-3/4 bg-[#E0E5F2]"></div>
      <FacilityDetail facility={facilityData} payment={false} />
    </div>
  );
}
