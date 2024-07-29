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
}

export default function ThirdPage({
  setSecondPage,
  setAmenities,
  amenities,
}: ThirdPageProps) {
  
  const handlePrevPage = () => {
    const filteredAmenities = facilityAmenities.filter(
      (amenity) => amenity.name.trim() !== "",
    );
    setFacilityAmenities(filteredAmenities);
    setAmenities(filteredAmenities);
    setSecondPage();
  };

  const [facilityAmenities, setFacilityAmenities] =
    useState<Amenity[]>(amenities);

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
          <TextButton
            label="Tambah amenity"
            size="large"
            type="secondary"
            onClick={addAmenity}
          />
        </div>
      </div>
      <div className="my-8 flex flex-col items-center space-y-4">
        <h2 className="text-[20px] font-semibold">
          Tentukan harga dari properti Anda
        </h2>
        <div className="flex items-center justify-center space-x-8"></div>
      </div>
    </div>
  );
}
