import React from "react";
import FacilityDetail from "@/components/facilities/facilityDetail";
import BackButton from "@/components/backButton";

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
  const facilityData = await getFacilityDetails(
    "http://localhost:8000/facilities/",
    params.idFacility,
  );

  return (
    <div className="relative flex w-full flex-col items-center justify-center">
      <BackButton href={`/sewa-tempat/`} />
      <FacilityDetail facility={facilityData} payment={true} />
    </div>
  );
}
