import React from "react";
import FacilityDetail from "@/components/facilities/facilityDetail";
import BackButton from "@/components/backButton";
import FacilityReviews from "@/components/facilities/facilityReviews";

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

interface Review {
  id: string;
  user: string;
  user_name: string;
  user_pfp: string;
  user_start: string;
  booking: string;
  facility: string;
  facility_name: string;
  rating: number;
  content: string;
  created_at: string;
  updated_at: string;
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

const getFacilityReviews = async (
  url: string,
  idFacility: string,
): Promise<Review[]> => {
  const response = await fetch(`${url}${idFacility}`, {
    credentials: "include",
    cache: "no-store",
  });
  const reviewsData: Review[] = await response.json();
  return reviewsData;
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

  const facilityReviews = await getFacilityReviews(
    "http://localhost:8000/facilities/reviews?facility=",
    params.idFacility,
  );

  return (
    <div className="relative flex w-full flex-col items-center justify-center">
      <BackButton href={`/sewa-tempat/`} />
      <FacilityDetail facility={facilityData} payment={true} />
      <div className="mt-8 h-[1px] w-full bg-[#E0E5F2]"></div>
      <FacilityReviews reviews={facilityReviews} editable={false} />
    </div>
  );
}
