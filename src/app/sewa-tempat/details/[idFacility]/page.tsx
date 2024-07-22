import React from "react";
import Image from "next/image";
import { DatePickerInput } from "@/components/sewaTempat/datePicker";
import memberStart from "@/utils/memberStart";

const locationIcon = "/icons/location.svg";
const likeNonActiveIcon = "/icons/miscIcons/heart.svg";
const checkedBoxIcon = "/icons/miscIcons/checkedBox.svg";
const shareIcon = "/icons/miscIcons/share.svg";
const starIcon = "/icons/reviewStar.svg";

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
  params: { idFacility: string };
}) {
  const facilityData = await getFacilityDetails(
    "http://localhost:8000/facilities/",
    params.idFacility,
  );

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="my-8 flex w-3/4 justify-between">
        <div className="flex flex-col justify-start">
          <h1 className="text-[32px] font-semibold text-[#000000]">
            {facilityData.name}
          </h1>
          <div className="my-1 flex items-center">
            <Image
              src={locationIcon}
              alt="locationIcon"
              width={24}
              height={24}
            />
            <span className="ml-1 text-xl text-[#6F778C]">
              {facilityData.city}
            </span>
          </div>
        </div>
        <div className="flex items-start space-x-5">
          <div className="my-1 flex items-center">
            <Image
              src={likeNonActiveIcon}
              alt="likeNonActiveIcon"
              width={28}
              height={28}
            />
            <span className="ml-1 text-base text-[#1973F9] underline">
              Save
            </span>
          </div>
          <div className="my-1 flex items-center">
            <Image src={shareIcon} alt="shareIcon" width={28} height={28} />
            <span className="ml-1 text-base text-[#1973F9] underline">
              Share
            </span>
          </div>
        </div>
      </div>
      <div className="my-8 flex w-3/4 justify-around">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3">
          {facilityData.images &&
            facilityData.images.map((src, index) => (
              <div key={src.uuid} className="relative h-[484px] w-[460px]">
                <Image
                  src={src.image}
                  alt={`facilityImg${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-[32px]"
                />
              </div>
            ))}
        </div>
      </div>
      <div className="flex w-3/4 items-center justify-start space-x-6">
        <div className="space-x1 flex items-center">
          <Image src={starIcon} alt="reviewStar" width={31} height={31} />
          <span className="text-xl font-semibold text-[#4082E5]">
            {facilityData.rating == null ? 0 : facilityData.rating}/5
          </span>
        </div>
        <p className="text-xl font-normal text-[#4082E5] underline">
          200 reviews
        </p>
      </div>
      <div className="my-4 flex w-3/4 min-w-fit items-center justify-start">
        <p className="text-base font-normal leading-relaxed text-[#000000]">
          {facilityData.description}
        </p>
      </div>

      <div className="flex w-3/4 items-start justify-between space-x-4">
        <div className="flex min-w-fit flex-col space-y-10">
          <div className="flex items-center justify-start space-x-3">
            <Image
              src={facilityData.owner_pfp}
              alt="Owner Profile"
              width={43}
              height={43}
              className="h-[43px] w-[43px] rounded-full object-cover"
            />
            <div className="flex flex-col items-start justify-start">
              <p className="text-base font-medium">{facilityData.owner_name}</p>
              <p className="text-xs font-medium text-[#4082E5]">
                {memberStart(facilityData.owner_start)}
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-start space-y-3">
            <h2 className="text-xl font-semibold text-[#222020]">
              Fasilitas yang dapat dipakai peminjam:{" "}
            </h2>
            {facilityData.amenities &&
              facilityData.amenities.map((amenity, index) => (
                <div className="my-1 flex items-center" key={index}>
                  <Image
                    src={checkedBoxIcon}
                    alt="checkedBox"
                    width={24}
                    height={24}
                  />
                  <span className="text-normal ml-3 text-base">{amenity}</span>
                </div>
              ))}
          </div>
        </div>
        <DatePickerInput
          price_per_day={facilityData.price_per_day}
          facility={params.idFacility}
        />
      </div>
    </div>
  );
}
