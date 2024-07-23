"use client";

import Image from "next/image";
import { formatCurrency } from "@/utils/formatCurrency";
import formatDateRange from "@/utils/formatDateRange";

interface FacilityImage {
  uuid: string;
  facility: string;
  image: string;
  is_primary: boolean;
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

const locationIcon = "/icons/location.svg";
const starIcon = "/icons/reviewStar.svg";

export default function BookingCard({ ...booking }: FacilityBooking) {
  const userReview =
    booking.user_rating == null ? (
      <div className="flex items-center justify-start space-x-1">
        <span className="text-sm font-medium text-[#4082E5]">
          Belum buat ulasan
        </span>
      </div>
    ) : (
      <div className="flex items-center justify-start space-x-1">
        <Image src={starIcon} alt="reviewStar" width={24} height={24} />
        <span className="text-sm font-medium text-[#4082E5]">
          {booking.user_rating}/5
        </span>
      </div>
    );

  const totalCost = formatCurrency(booking.duration * booking.price_per_day);

  return (
    <div className="flex h-[200px] w-full min-w-fit items-center justify-start space-x-4 rounded-[20px] p-3 shadow-md hover:bg-gray-100">
      <div className="relative h-[170px] w-[190px]">
        <Image
          src={booking.image.image}
          alt="Facility Image"
          className="absolute inset-0 h-full w-full rounded-[20px] object-cover"
          width={275}
          height={275}
        />
      </div>
      <div className="flex h-[170px] flex-col items-start justify-center space-y-3">
        <p className="text-[14px] font-medium">
          {formatDateRange(booking.start_date, booking.end_date)}
        </p>
        <div className="flex flex-col space-y-1">
          <h2 className="text-[20px] font-semibold">{booking.facility_name}</h2>
          <div className="my-1 flex items-center">
            <Image
              src={locationIcon}
              alt="locationIcon"
              width={20}
              height={20}
            />
            <span className="ml-1 text-[14px] font-normal text-[#6F778C]">
              {booking.city}
            </span>
          </div>
          {userReview}
          <div className="flex items-center justify-start space-x-1">
            <h3 className="text-[16px] font-semibold">{totalCost}</h3>
            <span className="text-[12px] font-medium text-[#A7AFC4]">
              paid in full
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
