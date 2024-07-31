import { useState } from "react";
import GoBack from "./goBack";
import TextButton from "../textButton";

interface Amenity {
  name: string;
}

interface ThirdPageProps {
  setSecondPage: () => void;
  setAmenities: (amenities: Amenity[]) => void;
  amenities: Amenity[];
  setPricePerDay: (price_per_day: number) => void;
  price_per_day: number;
  handleCreateFacility: () => void;
}

export default function ThirdPage({
  setSecondPage,
  setAmenities,
  amenities,
  setPricePerDay,
  price_per_day,
  handleCreateFacility,
}: ThirdPageProps) {
  const handlePrevPage = () => {
    const filteredAmenities = facilityAmenities.filter(
      (amenity) => amenity.name.trim() !== "",
    );
    setFacilityAmenities(filteredAmenities);
    setAmenities(filteredAmenities);
    handlePrice(facilityPrice);
    setSecondPage();
  };

  const [facilityAmenities, setFacilityAmenities] =
    useState<Amenity[]>(amenities);

  const [facilityPrice, setFacilityPrice] = useState<string>(
    price_per_day.toString(),
  );

  const handleAmenityChange = (index: number, value: string) => {
    const newAmenities = [...facilityAmenities];
    newAmenities[index].name = value;
    setFacilityAmenities(newAmenities);
  };

  const addAmenity = () => {
    const lastAmenity = facilityAmenities[facilityAmenities.length - 1];
    if (facilityAmenities.length < 15 && lastAmenity.name.trim() !== "") {
      const newAmenities = [...facilityAmenities, { name: "" }];
      setFacilityAmenities(newAmenities);
    }
  };

  const handlePrice = (price: string) => {
    const reformattedPrice = price.replace(/[^0-9]/g, "");
    const numericValue = parseFloat(reformattedPrice);
    if (!isNaN(numericValue)) {
      setPricePerDay(numericValue);
    } else {
      setPricePerDay(0);
    }
  };

  const handleSubmit = () => {
    const filteredAmenities = facilityAmenities.filter(
      (amenity) => amenity.name.trim() !== "",
    );
    setFacilityAmenities(filteredAmenities);
    setAmenities(filteredAmenities);
    handlePrice(facilityPrice);
    handleCreateFacility();
  };

  return (
    <div className="mb-10 flex w-full flex-col pb-10">
      <GoBack onClick={handlePrevPage} />
      <div className="my-8 flex flex-col items-center space-y-4">
        <h2 className="text-[20px] font-semibold">
          Tulis fasilitas yang ada di properti Anda
        </h2>

        <div className="flex flex-col items-center justify-center space-y-4">
          {facilityAmenities.map((amenity, index) => (
            <div
              key={index}
              className="w-[30vw] gap-2 rounded-xl border-2 border-[#979DBD] px-4 py-3"
            >
              <input
                className="w-full font-inter text-[#000000]"
                type="text"
                value={amenity.name}
                onChange={(e) => handleAmenityChange(index, e.target.value)}
                placeholder="Nama Fasilitas"
                required
              />
            </div>
          ))}
        </div>
      </div>
      <div className="mb-8 flex justify-center">
        <TextButton
          label="Tambah amenity"
          size="large"
          type="secondary"
          onClick={addAmenity}
        />
      </div>
      <div className="my-8 flex flex-col items-center space-y-4">
        <h2 className="text-[20px] font-semibold">
          Tentukan harga dari properti Anda
        </h2>
        <div className="my-2 flex h-[68px] w-1/4 items-center justify-evenly rounded rounded-[20px] border-2 border-[#979DBD]">
          <div className="mx-2 flex flex-col items-center justify-center">
            <p className="text-[14px] font-bold text-[#4082E5]">PRICE</p>
            <input
              className="flex w-full text-center font-inter text-[24px] text-[#000000]"
              type="text"
              value={facilityPrice}
              onChange={(e) => setFacilityPrice(e.target.value)}
              required
            />
          </div>
        </div>
        <p className="text-[18px] font-normal">Per malam sebelum pajak</p>
      </div>
      <div className="flex justify-center">
        <TextButton
          label="Upload Listing"
          size="large"
          type="primary"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}
