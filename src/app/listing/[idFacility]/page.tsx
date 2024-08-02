"use client";

import React, { useEffect, useState } from "react";
import FacilityDetail from "@/components/facilities/facilityDetail";
import BackButton from "@/components/backButton";
import Link from "next/link";
import TextButton from "@/components/textButton";
import { useUser } from "@/components/isomorphic/userContext";
import { useRouter } from "next/navigation";
import FacilityReviews from "@/components/facilities/facilityReviews";
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
  const { user, fetchWithCredentials } = useUser();
  const router = useRouter();
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
  }, [params.idFacility, fetchWithCredentials]);

  const handleDelete = async () => {
    try {
      if (user?.id === facilityData?.owner) {
        const response = await fetchWithCredentials(
          `${process.env.NEXT_PUBLIC_API_URL}/facilities/facility/${facilityData?.uuid}/`,
          {
            method: "DELETE",
          },
        );

        if (!response.ok) {
          throw new Error("Delete failed");
        }
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
    router.push(`/listing/`);
  };

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
      <div className="mt-8 h-[1px] w-full bg-[#E0E5F2]"></div>
      <FacilityReviews reviews={facilityReviews} editable={false} />
    </div>
  );
}
