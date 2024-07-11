import { formatCurrency } from "@/utils/formatCurrency";
import Image from "next/image";

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

const locationIcon = "/icons/location.svg";
const starIcon = "/icons/reviewStar.svg";

export default function FacilityCard({...props}: Facility) {
  return (
    <div className="w-72 overflow-hidden">
      <div className="w-full h-64 relative">
        <Image
          src={props.images[0].image}
          alt="Facility Image"
          className="absolute inset-0 object-cover w-full h-full rounded-2xl"
          width={275}
          height={275}
        />
      </div>

      <div className="py-2">
        <h2 className="text-xl font-semibold mb-1">{props.name}</h2>
        <div className="flex items-center my-1">
          <Image src={locationIcon} alt="locationIcon" width={24} height={24} />
          <span className="text-[#6F778C] ml-1">{props.city}</span>
        </div>
        <p className="mb-2 text-xs text-[#A7AFC4]">{props.description}</p>

        <div className="my-1 flex justify-between items-center">
          <div className="flex justify-between items-center space-x-3">
            <img
              src="/imgs/pfp.jpg"
              alt="Facility Image"
              className="object-cover w-8 h-8 rounded-full"
            />
            <p className="text-sm font-medium">{props.owner_username}</p>
          </div>
          <div className="flex justify-end items-center space-x1">
            <Image
              src={starIcon}
              alt="reviewStar"
              width={24}
              height={24}
            />
            <span className="text-[#4082E5] text-sm font-medium">belum/5</span>
          </div>
        </div>

        <div className="flex justify-start items-baseline">
          <span className="text-[#4082E5] text-base font-semibold">
            {formatCurrency(props.price_per_day)}
          </span>
          <span className="ms-1 text-xs text-[#A7AFC4] font-medium">
            per hari
          </span>
        </div>
      </div>
    </div>
  );
}
