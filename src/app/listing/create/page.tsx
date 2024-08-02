"use client";

import FirstPage from "@/components/createFacility/firstPage";
import SecondPage from "@/components/createFacility/secondPage";
import ThirdPage from "@/components/createFacility/thirdPage";
import { useUser } from "@/components/isomorphic/userContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Amenity {
  name: string;
}

export default function Page() {
  const { fetchWithCredentials } = useUser();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [errorMessage, setErrorMessage] = useState<string>("");

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

  const handleCreateFacility = async () => {
    const filteredAmenities = amenities.filter(
      (amenity) => amenity.name.trim() !== "",
    );

    const imagesComplete = images.every((image) => image !== null);

    const formData = new FormData();
    if (
      name !== "" &&
      category !== null &&
      description !== "" &&
      city !== "" &&
      location_link !== "" &&
      filteredAmenities.length > 0 &&
      imagesComplete
    ) {
      formData.append("name", name);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("city", city);
      formData.append("location_link", location_link);
      formData.append("price_per_day", String(price_per_day));

      formData.append("amenities", JSON.stringify(filteredAmenities));

      images.forEach((image) => {
        if (image !== null) {
          formData.append(`images`, image);
        }
      });
    } else {
      setErrorMessage("Form pendaftaran fasilitas belum diisi dengan lengkap");
      return;
    }

    setErrorMessage("");

    try {
      const response = await fetchWithCredentials(
        `${process.env.NEXT_PUBLIC_API_URL}/facilities/facility/create/`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error("Edit failed");
      }

      router.push(`/listing`);
    } catch (error) {
      console.error("Error creating facility", error);
    }
  };

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center">
      <h1 className="mt-10 text-center text-[36px] font-semibold text-[#4082E5] underline">
        Sewakan Properti Saya
      </h1>
      <div className="my-2 flex h-[16px] flex-col items-center justify-center">
        {errorMessage && (
          <p className="text-[16px] font-semibold text-red-500">
            {errorMessage}
          </p>
        )}
      </div>
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
            setError={setErrorMessage}
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
            setPricePerDay={setPricePerDay}
            price_per_day={price_per_day}
            handleCreateFacility={handleCreateFacility}
          />
        )}
      </div>
    </div>
  );
}
