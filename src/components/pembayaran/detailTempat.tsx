"use client";

import React from "react";
import Image from "next/image";
import { formatCurrency } from "@/utils/formatCurrency";
import { truncateText } from "@/utils/truncateText";

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

export default function DetailTempat({ ...facility }: Facility) {
  return (
    <div className="h-full w-1/2">
      <div className="relative mb-4 h-[500px] min-w-max items-center justify-center">
        <Image
          src={
            facility.images.find((img) => img.is_primary)?.image ||
            "/imgs/tempbg3.jpg"
          }
          alt="Foto Fasilitas"
          layout="fill"
          objectFit="cover"
          className="mx-auto rounded-[32px]"
        />
      </div>
      <div className="flex flex-col items-start justify-start gap-1">
        <p className="font-inter text-3xl font-semibold">{facility.name}</p>
        <div className="my-1 flex items-center">
          <Image
            src="/icons/location.svg"
            alt="locationIcon"
            width={24}
            height={24}
          />
          <span className="ml-1 text-xl text-[#6F778C]">
            {facility.location_link},
          </span>
          <span className="ml-1 text-xl text-[#6F778C]"> {facility.city}</span>
        </div>
      </div>
      <div className="flex justify-start gap-5">
        <div className="flex justify-center">
          <Image
            src="/icons/reviewStar.svg"
            alt="reviewStar"
            width={24}
            height={24}
          />
          <span className="pt-1 text-xl font-medium text-[#4082E5]">
            {facility.rating == 0 ? 0 : facility.rating}/5
          </span>
        </div>
      </div>
      <div className="mt-8 flex justify-between">
        <div className="flex gap-2">
          <div className="relative h-[42px] w-[42px]">
            <Image
              src={"/imgs/pfp.jpg"}
              alt="pfp"
              width={42}
              height={42}
              className="absolute inset-0 h-full w-full rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <p className="font-medium">{facility.owner_name}</p>
            <p className="text-xs font-medium text-[#4082E5]">
              Member sejak {new Date(facility.created_at).getFullYear() - 2023}{" "}
              tahun lalu
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
        <p className="text-xl font-semibold">Description</p>
        <p className="text-md text-gray-600">
          {truncateText(facility.description, 500)}
        </p>
      </div>
      <div className="mt-4">
        <p className="text-xl font-semibold">Price per Day</p>
        <p className="text-md text-gray-600">
          {formatCurrency(facility.price_per_day)}
        </p>
      </div>
      <div className="mt-4">
        <p className="text-xl font-semibold">Amenities</p>
        <ul className="list-inside list-disc">
          {facility.amenities.map((amenity, index) => (
            <li key={index} className="text-md text-gray-600">
              {amenity.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
