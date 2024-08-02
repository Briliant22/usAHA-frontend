"use client";

import Image from "next/image";
import { formatCurrency } from "@/utils/formatCurrency";
import { truncateText } from "@/utils/truncateText";
import TextButton from "../textButton";
import Link from "next/link";

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
  category: "kitchen" | "art studio" | "workshop" | "others" | null;
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

interface FacilityCardProps {
  facility: Facility;
  isOwner: boolean;
}

const locationIcon = "/icons/location.svg";
const starIcon = "/icons/reviewStar.svg";

export default function FacilityCard({ facility, isOwner }: FacilityCardProps) {
  return (
    <div className="w-72 overflow-hidden rounded-2xl p-3 hover:bg-gray-100">
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

      <div className="flex flex-col space-y-1 py-2">
        <h2 className="text-xl font-semibold">{facility.name}</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-end space-x-1">
            <Image
              src={locationIcon}
              alt="locationIcon"
              width={24}
              height={24}
            />
            <span className="ml-1 text-[#6F778C]">
              {truncateText(facility.city, 15)}
            </span>
          </div>
          <div className="flex items-center justify-end space-x-1">
            <Image src={starIcon} alt="reviewStar" width={24} height={24} />
            <span className="text-sm font-medium text-[#4082E5]">
              {facility.rating == 0 ? 0 : facility.rating}/5
            </span>
          </div>
        </div>
        <div className="flex h-[6vh] flex-col">
          <p className="mb-2 text-xs text-[#A7AFC4]">
            {truncateText(facility.description, 100)}
          </p>
        </div>
        <div className="flex items-baseline justify-start">
          <span className="text-base font-semibold text-[#4082E5]">
            {formatCurrency(facility.price_per_day)}
          </span>
          <span className="ms-1 text-xs font-medium text-[#A7AFC4]">
            per hari
          </span>
        </div>
        {isOwner ? (
          <div className="flex w-full items-center justify-center py-4">
            <Link href={`/listing/${facility.uuid}/`}>
              <TextButton
                label="Informasi detail listing"
                size="large"
                type="secondary"
              />
            </Link>
          </div>
        ) : (
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
          </div>
        )}
      </div>
    </div>
  );
}
