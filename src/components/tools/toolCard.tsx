import { formatCurrency } from "@/utils/formatCurrency";
import Image from "next/image";

interface ToolProps {
  uuid: string;
  name: string;
  description: string;
  price_per_unit: number;
  location_link: string;
  stock: number;
  user_id: string;
  category: string[];
}

const locationIcon = "/navbarIcons/location.svg";

export default function FacilityCard({...props}: ToolProps) {
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
        <h2 className="text-xl font-semibold mb-1">{props.name}</h2>
        <div className="flex items-center my-1">
          <Image src={locationIcon} alt="locationIcon" width={24} height={24} />
          <span className="text-[#6F778C] ml-1">{props.location_link}</span>
        </div>
        <p className="mb-2 text-xs text-[#A7AFC4]">{props.description}</p>

        <div className="my-1 flex justify-between items-center">
          <div className="flex justify-between items-center space-x-3">
            <img
              src="/imgs/pfp.jpg"
              alt="Facility Image"
              className="object-cover w-8 h-8 rounded-full"
            />
            <p className="text-sm font-medium">Zoha Alatas</p>
          </div>
        </div>

        <div className="flex justify-start items-baseline">
          <span className="text-[#4082E5] text-base font-semibold">
            {formatCurrency(props.price_per_unit)}
          </span>
          <span className="ms-1 text-xs text-[#A7AFC4] font-medium">
            per item
          </span>
        </div>
      </div>
    </div>
  );
}