"use client";

import Image from "next/image";
import { formatCurrency } from "@/utils/formatCurrency";
import { truncateText } from "@/utils/truncateText";

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
  name: string;
  category: string;
  description: string;
  city: string;
  location_link: string;
  price_per_day: number;
  rating: number;
  created_at: string;
  updated_at: string;
  amenities: string[];
  images: FacilityImage[];
}

const locationIcon = "/icons/location.svg";
const starIcon = "/icons/reviewStar.svg";

export default function FacilityCard({ ...facility }: Facility) {


  return (
    <div className="w-72 overflow-hidden">
      <div className="relative h-64 w-full">
        <Image
          src={
            facility.images.find((img) => img.is_primary)?.image ||
            "/imgs/tempbg3.jpg"
          }
          alt="Facility Image"
          className="absolute inset-0 h-full w-full rounded-2xl object-cover"
          width={275}
          height={275}
        />
      </div>

      <div className="py-2">
        <h2 className="mb-1 text-xl font-semibold">{facility.name}</h2>
        <div className="my-1 flex items-center">
          <Image src={locationIcon} alt="locationIcon" width={24} height={24} />
          <span className="ml-1 text-[#6F778C]">{facility.city}</span>
        </div>
        <div className="flex h-[6vh] flex-col">
          <p className="mb-2 text-xs text-[#A7AFC4]">
            {truncateText(facility.description, 100)}
          </p>
        </div>
        <div className="my-1 flex items-center justify-between">
          <div className="flex items-center justify-between space-x-3">
            {facility.owner_pfp ? (
              <Image
                src={facility.owner_pfp}
                alt="Owner Profile"
                className="h-8 w-8 rounded-full object-cover"
                width={32}
                height={32}
              />
            ) : (
              <Image
                src="icons/miscIcons/defPfp.svg"
                alt="Default Profile"
                className="h-8 w-8 rounded-full object-cover"
                width={32}
                height={32}
              />
            )}
            <p className="text-sm font-medium">{facility.owner_name}</p>
          </div>
          <div className="flex items-center justify-end space-x-1">
            <Image src={starIcon} alt="reviewStar" width={24} height={24} />
            <span className="text-sm font-medium text-[#4082E5]">
              {facility.rating}/5
            </span>
          </div>
        </div>

        <div className="flex items-baseline justify-start">
          <span className="text-base font-semibold text-[#4082E5]">
            {formatCurrency(facility.price_per_day)}
          </span>
          <span className="ms-1 text-xs font-medium text-[#A7AFC4]">
            per hari
          </span>
        </div>
      </div>
    </div>
  );
}
