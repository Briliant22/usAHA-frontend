import { formatCurrency } from "@/utils/formatCurrency";
import Image from "next/image";
type FacilityProps = {
  id: string;
  name: string;
  description: string;
  location: string;
  price_per_day: number;
  owner: string;
  rating: number;
};

const locationIcon = "/navbarIcons/location.svg";
const starIcon = "/navbarIcons/reviewStar.svg";

export default function FacilityCard({
  id,
  name,
  description,
  location,
  price_per_day,
  owner,
  rating,
}: FacilityProps) {
  return (
    <div className="w-72 overflow-hidden">
      <div className="w-full h-64 relative">
        <img
          src="/imgs/tempbg2.jpg"
          alt="Facility Image"
          className="absolute inset-0 object-cover w-full h-full rounded-2xl"
        />
      </div>
      <div className="py-2">
        <h2 className="text-xl font-semibold mb-1">{name}</h2>
        <div className="flex items-center my-1">
          <Image src={locationIcon} alt="locationIcon" width={24} height={24} />
          <span className="text-[#6F778C] ml-1">{location}</span>
        </div>
        <p className="mb-2 text-xs text-[#A7AFC4]">{description}</p>
        <div className="my-1 flex justify-between items-center">
          <div className="flex justify-between items-center space-x-3">
            <img
              src="/imgs/pfp.jpg"
              alt="Facility Image"
              className="object-cover w-8 h-8 rounded-full"
            />
            <p className="text-sm font-medium">Zoha Alatas</p>
          </div>
          <div className="flex justify-end items-center space-x1">
            <Image
              src={starIcon}
              alt="reviewStar"
              width={24}
              height={24}
            />
            <span className="text-[#4082E5] text-sm font-medium">{rating}/5</span>
          </div>
        </div>
        <div className="flex justify-start items-baseline">
          <span className="text-[#4082E5] text-base font-semibold">
            {formatCurrency(price_per_day)}
          </span>
          <span className="ms-1 text-xs text-[#A7AFC4] font-medium">
            per hari
          </span>
        </div>
      </div>
    </div>
  );
}