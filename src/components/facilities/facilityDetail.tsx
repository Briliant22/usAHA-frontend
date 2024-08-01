import memberStart from "@/utils/memberStart";
import Image from "next/image";
import { DatePickerInput } from "../sewaTempat/datePicker";
import { formatCurrency } from "@/utils/formatCurrency";

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

interface FacilityDetailProps {
  facility: Facility;
  payment: boolean;
}

const locationIcon = "/icons/location.svg";
const likeNonActiveIcon = "/icons/miscIcons/heart.svg";
const checkedBoxIcon = "/icons/miscIcons/checkedBox.svg";
const shareIcon = "/icons/miscIcons/share.svg";
const starIcon = "/icons/reviewStar.svg";

export default function FacilityDetail({
  facility,
  payment,
}: FacilityDetailProps) {
  const createBookingCard =
    payment == true ? (
      <DatePickerInput
        price_per_day={facility.price_per_day}
        facility={facility.uuid}
      />
    ) : null;

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="my-4 flex w-3/4 justify-between">
        <div className="flex flex-col justify-start">
          <h1 className="text-[32px] font-semibold text-[#000000]">
            {facility.name}
          </h1>
          <div className="my-1 flex items-center">
            <Image
              src={locationIcon}
              alt="locationIcon"
              width={24}
              height={24}
            />
            <span className="ml-1 text-xl text-[#6F778C]">{facility.city}</span>
          </div>
          <span className="mt-1 flex items-baseline text-[24px] font-semibold">
            {formatCurrency(facility.price_per_day)}{" "}
            <p className="ml-1 text-[20px] font-medium text-[#A7AFC4]">
              per hari
            </p>
          </span>
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
          {facility.images &&
            facility.images.map((src, index) => (
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
            {facility.rating == 0 ? 0 : facility.rating}/5
          </span>
        </div>
      </div>
      <div className="my-4 flex min-h-20 w-3/4 items-start justify-start">
        <p className="text-base font-normal leading-relaxed text-[#000000]">
          {facility.description}
        </p>
      </div>

      <div className="flex w-3/4 items-start justify-between space-x-4">
        <div className="flex min-w-fit flex-col space-y-10">
          <div className="flex items-center justify-start space-x-3">
            <Image
              src={facility.owner_pfp}
              alt="Owner Profile"
              width={60}
              height={60}
              className="h-[60px] w-[60px] rounded-full object-cover"
            />
            <div className="flex flex-col items-start justify-start">
              <p className="text-[20px] font-medium">{facility.owner_name}</p>
              <p className="text-[16px] font-medium text-[#4082E5]">
                {memberStart(facility.owner_start)}
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-start space-y-3">
            <h2 className="text-xl font-semibold text-[#222020]">
              Fasilitas yang dapat dipakai peminjam:{" "}
            </h2>
            {facility.amenities &&
              facility.amenities.map((amenity, index) => (
                <div className="my-1 flex items-center" key={index}>
                  <Image
                    src={checkedBoxIcon}
                    alt="checkedBox"
                    width={24}
                    height={24}
                  />
                  <span className="text-normal ml-3 text-base">
                    {amenity.name}
                  </span>
                </div>
              ))}
          </div>
        </div>
        {createBookingCard}
      </div>
    </div>
  );
}
