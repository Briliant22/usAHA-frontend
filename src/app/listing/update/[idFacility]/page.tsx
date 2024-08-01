"use client";

import { useUser } from "@/components/isomorphic/userContext";
import FirstPageUpdate from "@/components/updateComponents/firstPageUpdate";
import SecondPageUpdate from "@/components/updateComponents/secondPageUpdate";
import ThirdPageUpdate from "@/components/updateComponents/thirdPageUpdate";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Amenity {
  name: string;
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
  category: "kitchen" | "art studio" | "workshop" | "others" | null;
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

export default function Page({ params }: { params: { idFacility: string } }) {
  const { fetchWithCredentials } = useUser();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [facilityData, setFacilityData] = useState<Facility | null>(null);

  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<
    "kitchen" | "art studio" | "workshop" | "others" | null
  >(null);
  const [description, setDescription] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [location_link, setLocationLink] = useState<string>("");
  const [price_per_day, setPricePerDay] = useState<number>(0);
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [previousImages, setPreviousImages] = useState<FacilityImage[]>([]);
  const [images, setImages] = useState<(File | null)[]>([null, null, null]);

  useEffect(() => {
    const fetchFacilityDetails = async () => {
      const data = await getFacilityDetails(
        "http://localhost:8000/facilities/",
        params.idFacility,
      );
      setFacilityData(data);
      setName(data.name);
      setCategory(data.category);
      setDescription(data.description);
      setCity(data.city);
      setLocationLink(data.location_link);
      setPricePerDay(data.price_per_day);

      setAmenities(data.amenities);
      setPreviousImages(data.images);
    };

    fetchFacilityDetails();
  }, [params.idFacility]);

  const openFirstPage = () => {
    setCurrentPage(1);
  };

  const openSecondPage = () => {
    setCurrentPage(2);
  };

  const openThirdPage = () => {
    setCurrentPage(3);
  };

  const handleUpdateFacility = async () => {
    const formData = new FormData();
    if (
      name !== "" &&
      category !== null &&
      description !== "" &&
      city !== "" &&
      location_link !== ""
    ) {
      formData.append("name", name);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("city", city);
      formData.append("location_link", location_link);
      formData.append("price_per_day", String(price_per_day));
    } else {
      setErrorMessage("Form update fasilitas belum diisi dengan lengkap");
      return;
    }

    try {
      const response = await fetchWithCredentials(
        `http://localhost:8000/facilities/facility/${params.idFacility}/`,
        {
          method: "PUT",
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error("Edit failed");
      }

      router.push(`/listing/${facilityData?.uuid}`);
    } catch (error) {
      console.error("Error updating facility", error);
    }
  };

  if (!facilityData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center">
      <h1 className="mb-8 text-center text-[36px] font-semibold text-[#4082E5] underline">
        Sewakan Properti Saya
      </h1>
      <div className="my-4 flex h-[16px] flex-col items-center justify-center">
        {errorMessage && (
          <p className="text-[16px] font-semibold text-red-500">
            {errorMessage}
          </p>
        )}
      </div>
      <div className="flex h-full w-3/4">
        {currentPage === 1 && (
          <FirstPageUpdate
            setSecondPage={openSecondPage}
            uuid={params.idFacility}
            setName={setName}
            name={name}
            setCategory={setCategory}
            category={category}
            setCity={setCity}
            city={city}
            setLocationLink={setLocationLink}
            locationLink={location_link}
            setDescription={setDescription}
            description={description}
            setPricePerDay={setPricePerDay}
            price_per_day={price_per_day}
            setErrorMessage={setErrorMessage}
          />
        )}
        {currentPage === 2 && (
          <SecondPageUpdate
            setFirstPage={openFirstPage}
            setThirdPage={openThirdPage}
            uuid={params.idFacility}
            setImages={setImages}
            images={images}
            previousImages={previousImages}
          />
        )}
        {currentPage === 3 && (
          <ThirdPageUpdate
            setSecondPage={openSecondPage}
            uuid={params.idFacility}
            setAmenities={setAmenities}
            amenities={amenities}
            handleUpdateFacility={handleUpdateFacility}
          />
        )}
      </div>
    </div>
  );
}
