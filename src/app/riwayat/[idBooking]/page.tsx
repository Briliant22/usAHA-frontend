import React from "react";
import FacilityDetail from "@/components/facilities/facilityDetail";
import BackButton from "@/components/backButton";
import formatDateRange from "@/utils/formatDateRange";
import { formatCurrency } from "@/utils/formatCurrency";

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
  rating: number | null;
  created_at: string;
  updated_at: string;
  amenities: string[];
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

const getBookingDetails = async (
  url: string,
  idBooking: string,
): Promise<FacilityBooking> => {
  const response = await fetch(`${url}booking/${idBooking}/`, {
    credentials: "include",
    cache: "no-store",
  });
  const bookingData: FacilityBooking = await response.json();
  return bookingData;
};

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
  params: { idBooking: string };
}) {
  const bookingData = await getBookingDetails(
    "http://localhost:8000/facilities/",
    params.idBooking,
  );

  const facilityData = await getFacilityDetails(
    "http://localhost:8000/facilities/",
    bookingData.facility,
  );

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
    </div>
  );
}
