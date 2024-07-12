import React from "react";
import Image from "next/image";
import { formatCurrency } from "@/utils/formatCurrency";
import { DatePickerInput } from "@/components/sewaTempat/datePicker";
import { useUser } from "@/components/isomorphic/userContext";

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

const getDetails = async (url: string, id: string): Promise<Facility> => {
  const response = await fetch(`${url}facility/${id}`, {
    cache: "no-store",
  });
  const data: Facility = await response.json();
  return data;
};

export default async function Page({ params }: { params: { id: string } }) {
  const data = await getDetails("http://localhost:8000/facilities/", params.id);

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="flex justify-between w-3/4 my-8">
        <div className="flex flex-col justify-start">
          <h1 className="text-[#000000] text-[32px] font-semibold">
            {data.name}
          </h1>
          <div className="flex items-center my-1">
            <Image
              src={locationIcon}
              alt="locationIcon"
              width={24}
              height={24}
            />
            <span className="text-[#6F778C] text-xl ml-1">{data.city}</span>
          </div>
        </div>
        <div className="flex space-x-5 items-start">
          <div className="flex items-center my-1">
            <Image
              src={likeNonActiveIcon}
              alt="likeNonActiveIcon"
              width={28}
              height={28}
            />
            <span className="text-[#1973F9] text-base ml-1 underline">
              Save
            </span>
          </div>
          <div className="flex items-center my-1">
            <Image src={shareIcon} alt="shareIcon" width={28} height={28} />
            <span className="text-[#1973F9] text-base ml-1 underline">
              Share
            </span>
          </div>
        </div>
      </div>
      <div className="flex w-3/4 justify-around my-8">
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
          {data.images &&
            data.images.map((src, index) => (
              <div key={index} className="relative w-[460px] h-[484px]">
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
      <div className="flex w-3/4 justify-start items-center space-x-6">
        <div className="flex items-center space-x1">
          <Image src={starIcon} alt="reviewStar" width={31} height={31} />
          <span className="text-[#4082E5] text-xl font-semibold">4.9/5</span>
        </div>
        <p className="text-[#4082E5] text-xl font-normal underline">
          200 reviews
        </p>
      </div>
      <div className="flex w-3/4 justify-start items-center my-4">
        <p className="text-[#000000] text-base font-normal leading-relaxed">
          {data.description}
        </p>
      </div>

      <div className="flex w-3/4 justify-between space-x-4 items-start">
        <div className="flex flex-col space-y-10">
          <div className="flex justify-start items-center space-x-3">
            <Image
              src="/imgs/pfp.jpg"
              alt="Facility Image"
              width={43}
              height={43}
              className="w-[43px] h-[43px] object-cover rounded-full"
            />
            <div className="flex flex-col justify-start items-start">
              <p className="text-base font-medium">{data.owner_username}</p>
              <p className="text-[#4082E5] text-xs font-medium">
                Member sejak 3 tahun lalu
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-start space-y-3">
            <h2 className="text-[#222020] text-xl font-semibold">
              Fasilitas yang dapat dipakai peminjam :{" "}
            </h2>
            {data.amenities.map((src, index) => (
              <div className="flex items-center my-1" key={index}>
                <Image
                  src={checkedBoxIcon}
                  alt="checkedBox"
                  width={24}
                  height={24}
                />
                <span className="text-normal text-base ml-3">{src}</span>
              </div>
            ))}
          </div>
        </div>
        <DatePickerInput
          price_per_day={data.price_per_day}
          facility={params.id}
        />
      </div>
    </div>
  );
}
