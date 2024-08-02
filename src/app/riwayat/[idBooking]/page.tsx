"use client";

import React, { useEffect, useState } from "react";
import FacilityDetail from "@/components/facilities/facilityDetail";
import BackButton from "@/components/backButton";
import formatDateRange from "@/utils/formatDateRange";
import { formatCurrency } from "@/utils/formatCurrency";
import FacilityReviews from "@/components/facilities/facilityReviews";
import WriteReview from "@/components/facilities/writeReview";
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

interface FacilityBooking {
  uuid: string;
  facility: string;
  booker: string;
  start_date: string;
  end_date: string;
  duration: number;
  notes: string;
  is_approved: boolean;
  is_paid: boolean;
  user_rating: number | null;
  facility_name: string;
  city: string;
  price_per_day: number;
  image: FacilityImage;
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

export default function Page({ params }: { params: { idBooking: string } }) {
  const { fetchWithCredentials } = useUser();
  const [bookingData, setBookingData] = useState<FacilityBooking | null>(null);
  const [facilityData, setFacilityData] = useState<Facility | null>(null);
  const [facilityReviews, setFacilityReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookingResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/facilities/booking/${params.idBooking}/`,
          { credentials: "include", cache: "no-store" },
        );
        if (!bookingResponse.ok) {
          throw new Error("Failed to fetch booking details");
        }
        const bookingData: FacilityBooking = await bookingResponse.json();
        setBookingData(bookingData);

        const facilityResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/facilities/facility/${bookingData.facility}/`,
          { credentials: "include", cache: "no-store" },
        );
        if (!facilityResponse.ok) {
          throw new Error("Failed to fetch facility details");
        }
        const facilityData: Facility = await facilityResponse.json();
        setFacilityData(facilityData);

        const response = await fetchWithCredentials(
          `${process.env.NEXT_PUBLIC_API_URL}/facilities/reviews/?facility=${facilityData.uuid}`,
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
  }, [params.idBooking, fetchWithCredentials]);

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!facilityData || !bookingData) {
    return <div>Facility data not found</div>;
  }

  return (
    <div className="relative flex w-full flex-col items-center justify-center">
      <BackButton href={`/riwayat/`} />
      <div className="flex w-3/4 flex-col justify-start">
        <h1 className="text-[32px] font-bold text-[#4082E5]">
          Selamat, Booking Anda Berhasil!
        </h1>
        <p className="text-[24px] font-semibold">
          Anda berhasil menyewa fasilitas ini pada{" "}
          {formatDateRange(bookingData.start_date, bookingData.end_date)}{" "}
          seharga{" "}
          {formatCurrency(facilityData.price_per_day * bookingData.duration)}
        </p>
      </div>
      <div className="my-3 h-[1px] w-3/4 bg-[#E0E5F2]"></div>
      <FacilityDetail facility={facilityData} payment={false} />
      {bookingData.user_rating == null && bookingData.is_paid == true ? (
        <div className="flex w-full flex-col items-center justify-center">
          <div className="mt-8 h-[1px] w-full bg-[#E0E5F2]"></div>
          <WriteReview booking={bookingData} />
        </div>
      ) : null}
      <div className="mt-8 h-[1px] w-full bg-[#E0E5F2]"></div>
      <FacilityReviews reviews={facilityReviews} editable={false} />
    </div>
  );
}
