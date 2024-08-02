"use client";

import React, { useEffect, useState } from "react";
import FacilityDetail from "@/components/facilities/facilityDetail";
import BackButton from "@/components/backButton";
import FacilityReviews from "@/components/facilities/facilityReviews";
import { useUser } from "@/components/isomorphic/userContext";
import LoadingPage from "@/components/loadingPage";

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

export default function Page({ params }: { params: { idFacility: string } }) {
  const { fetchWithCredentials } = useUser();
  const [facilityData, setFacilityData] = useState<Facility | null>(null);
  const [facilityReviews, setFacilityReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const facilityResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/facilities/facility/${params.idFacility}/`,
          { credentials: "include", cache: "no-store" },
        );
        if (!facilityResponse.ok) {
          throw new Error("Failed to fetch facility details");
        }
        const facilityData: Facility = await facilityResponse.json();
        setFacilityData(facilityData);

        const response = await fetchWithCredentials(
          `${process.env.NEXT_PUBLIC_API_URL}/facilities/reviews/?facility=${params.idFacility}`,
        );
        if (response.ok) {
          const data = await response.json();
          setFacilityReviews(data);
        } else {
          throw new Error("Failed to fetch reviews");
        }
      } catch (error) {
        setError("Failed to fetch facility reviews");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.idFacility]);

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!facilityData) {
    return <div>Facility data not found</div>;
  }

  return (
    <div className="relative flex w-full flex-col items-center justify-center">
      <BackButton href={`/sewa-tempat/`} />
      <FacilityDetail facility={facilityData} payment={true} />
      <div className="mt-8 h-[1px] w-full bg-[#E0E5F2]"></div>
      <FacilityReviews reviews={facilityReviews} editable={false} />
    </div>
  );
}
