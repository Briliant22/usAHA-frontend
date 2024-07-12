"use client";

import React from "react";
import Image from "next/image";
import { formatCurrency } from "@/utils/formatCurrency";
import useSWR from "swr";

interface FacilityImage {
  uuid: string;
  facility: string;
  image: string;
  is_primary: boolean;
}

interface Facility {
  uuid: string;
  owner: string;
  owner_username: string;
  name: string;
  category: string;
  description: string;
  city: string;
  location_link: string;
  price_per_day: number;
  created_at: string;
  updated_at: string;
  amenities: string[];
  images: FacilityImage[];
}

interface Owner {
  id: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  bio: string;
  contact_number: string;
  profile_pic: string;
}

interface FacilityBooking {
  uuid: string;
  facility: string;
  booker: string;
  start_date: string;
  end_date: string;
  duration: string;
  notes: string;
  is_approved: boolean;
  is_paid: boolean;
}

interface DetailTempatProps {
  booking: FacilityBooking | null;
}

const getFacility = async (url: string) => {
  const response = await fetch(url, {
    cache: "no-store",
  });
  const data: Facility = await response.json();
  return data;
};

export function DetailTempat({ booking }: DetailTempatProps) {
  const { data, error } = useSWR(
    booking ? `http://localhost:8000/facilities/booking/${booking.facility}/` : null,
    getFacility
  );

  if (error) return <div>Error loading facility details</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="h-full">
      <div className="h-72 relative w-72 mb-4">
        <Image
          src={data.images.find(img => img.is_primary)?.image || "/imgs/tempbg3.jpg"} // Primary image
          alt="Foto Fasilitas"
          width={290}
          height={300}
          className="absolute inset-0 object-cover w-full h-full rounded-2xl"
        />
      </div>
      <div className="flex flex-col justify-center items-center gap-1">
        <p className="font-inter font-semibold text-3xl">{data.name}</p>
        <div className="flex items-center my-1">
          <Image
            src="/icons/location.svg"
            alt="locationIcon"
            width={24}
            height={24}
          />
          <span className="text-[#6F778C] ml-1 text-xl">
            {data.city}, {data.location_link}
          </span>
        </div>
      </div>
      <div className="flex justify-center gap-5">
        <div className="flex justify-center">
          <Image
            src="/icons/reviewStar.svg"
            alt="reviewStar"
            width={24}
            height={24}
          />
          <span className="text-[#4082E5] text-xl font-medium pt-1">4.9/5</span> {/* Replace with dynamic rating if available */}
        </div>
        <p className="text-lg font-inter text-[#4082E5] font-medium my-auto underline">
          {data.amenities.length} reviews {/* Adjust based on your actual reviews count */}
        </p>
      </div>
      <div className="flex justify-between mt-8">
        <div className="flex gap-2">
          <div className="w-[42px] h-[42px] relative">
            <Image
              src={"/imgs/pfp.jpg"}
              alt="pfp"
              width={42}
              height={42}
              className="absolute inset-0 object-cover w-full h-full rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <p className="font-medium">{data.owner_username}</p>
            <p className="text-xs font-medium text-[#4082E5]">
              Member sejak {new Date(data.created_at).getFullYear() - 2023} tahun lalu
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <Image
            src="/icons/socmedIcons/bluePhone.svg"
            alt="Phone"
            width={18}
            height={18}
          />
          <Image
            src="/icons/socmedIcons/chat.svg"
            alt="chat Icon"
            width={20}
            height={18}
          />
        </div>
      </div>
      <div className="mt-4">
        <p className="font-semibold text-xl">Description</p>
        <p className="text-md text-gray-600">{data.description}</p>
      </div>
      <div className="mt-4">
        <p className="font-semibold text-xl">Price per Day</p>
        <p className="text-md text-gray-600">{formatCurrency(data.price_per_day)}</p>
      </div>
      <div className="mt-4">
        <p className="font-semibold text-xl">Amenities</p>
        <ul className="list-disc list-inside">
          {data.amenities.map((amenity, index) => (
            <li key={index} className="text-md text-gray-600">{amenity}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
