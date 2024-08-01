import React from "react";
import SewaTempatInput from "@/components/pembayaran/sewaTempatInput";
import DetailTempat from "@/components/pembayaran/detailTempat";
import formatDateRange from "@/utils/formatDateRange";

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
  user_rating: number;
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
    `${process.env.NEXT_PUBLIC_API_URL}/facilities/`,
    params.idBooking,
  );
  const facilityData = await getFacilityDetails(
    `${process.env.NEXT_PUBLIC_API_URL}/facilities/`,
    bookingData.facility,
  );
  const paymentProps = {
    uuid: bookingData.uuid,
    duration: bookingData.duration,
    price_per_day: facilityData.price_per_day,
  };

  return (
    <div className="relative flex w-full flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center pt-10">
        <h1 className="font-inter text-[36px] font-semibold">
          Request to Reserve
        </h1>
        <p className="text-[24px] font-semibold">
          {formatDateRange(bookingData.start_date, bookingData.end_date)}
        </p>
      </div>
      <div className="mt-10 flex justify-center space-x-10 px-20">
        <DetailTempat {...facilityData} />
        <SewaTempatInput {...paymentProps} />
      </div>
    </div>
  );
}
