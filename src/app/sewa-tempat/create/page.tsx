"use client";

import FirstPage from "@/components/createFacility/firstPage";
import SecondPage from "@/components/createFacility/secondPage";
import ThirdPage from "@/components/createFacility/thirdPage";
import { useEffect, useState } from "react";

interface Amenity {
  name: string;
}

export default function Page() {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<
    "kitchen" | "art studio" | "workshop" | "others" | null
  >(null);
  const [description, setDescription] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [location_link, setLocationLink] = useState<string>("");
  const [price_per_day, setPricePerDay] = useState<number>(0);
  const [amenities, setAmenities] = useState<Amenity[]>([
    { name: "" },
    { name: "" },
    { name: "" },
  ]);
  const [images, setImages] = useState<(File | null)[]>([null, null, null]);

  const openFirstPage = () => {
    setCurrentPage(1);
  };

  const openSecondPage = () => {
    setCurrentPage(2);
  };

  const openThirdPage = () => {
    setCurrentPage(3);
  };

  useEffect(() => {
    console.log("Name:", name);
    console.log("Category:", category);
    console.log("Description:", description);
    console.log("Location Link:", location_link);
    console.log("City:", city);
    console.log("Amenities:", amenities);
    console.log("Images:", images);
  }, [
    name,
    category,
    description,
    location_link,
    city,
    price_per_day,
    amenities,
    images,
  ]);

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center">
      <h1 className="mb-8 text-center text-[36px] font-semibold text-[#4082E5] underline">
        Sewakan Properti Saya
      </h1>
      <div className="flex h-full w-3/4">
        {currentPage === 1 && (
          <FirstPage
            setSecondPage={openSecondPage}
            setName={setName}
            name={name}
            setCategory={setCategory}
            category={category}
            setCity={setCity}
            city={city}
            setLocationLink={setLocationLink}
            locationLink={location_link}
          />
        )}
        {currentPage === 2 && (
          <SecondPage
            setFirstPage={openFirstPage}
            setThirdPage={openThirdPage}
            setDescription={setDescription}
            description={description}
            setImages={setImages}
            images={images}
          />
        )}
        {currentPage === 3 && (
          <ThirdPage
            setSecondPage={openSecondPage}
            setAmenities={setAmenities}
            amenities={amenities}
          />
        )}
      </div>
    </div>
  );
}
