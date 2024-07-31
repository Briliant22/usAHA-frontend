import { useState, useEffect } from "react";
import GoBack from "../createFacility/goBack";
import TextButton from "../textButton";
import { useUser } from "../isomorphic/userContext";

interface Amenity {
  uuid?: string;
  name: string;
}

interface ThirdPageUpdateProps {
  setSecondPage: () => void;
  uuid: string;
  setAmenities: (amenities: Amenity[]) => void;
  amenities: Amenity[];
  handleUpdateFacility: () => void;
}

export default function ThirdPageUpdate({
  setSecondPage,
  uuid,
  setAmenities,
  amenities,
  handleUpdateFacility,
}: ThirdPageUpdateProps) {
  const { fetchWithCredentials } = useUser();

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

  const handleNewAmenity = async (name: string) => {
    const formData = new FormData();
    formData.append("facility", uuid);
    formData.append("name", name);
    try {
      const response = await fetchWithCredentials(
        `http://localhost:8000/facilities/amenity/create/`,
        {
          method: "POST",
          body: formData,
        },
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const newAmenity = await response.json();
      return newAmenity;
    } catch (error) {
      console.error("Error creating new amenity:", error);
    }
  };

  const handleUpdateAmenity = async (amenityId: string, name: string) => {
    const formData = new FormData();
    formData.append("facility", uuid);
    formData.append("name", name);
    try {
      const response = await fetchWithCredentials(
        `http://localhost:8000/facilities/amenity/${amenityId}/`,
        {
          method: "PUT",
          body: formData,
        },
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error updating amenity:", error);
    }
  };

  const handleDeleteAmenity = async (amenityId: string) => {
    try {
      const response = await fetchWithCredentials(
        `http://localhost:8000/facilities/amenity/${amenityId}/`,
        {
          method: "DELETE",
        },
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error deleting amenity:", error);
    }
  };

  const handleSubmit = async () => {
    const filteredAmenities = facilityAmenities.filter(
      (amenity) => amenity.name.trim() !== "",
    );
    setFacilityAmenities(filteredAmenities);
    setAmenities(filteredAmenities);

    for (const amenity of filteredAmenities) {
      if (amenity.uuid) {
        await handleUpdateAmenity(amenity.uuid, amenity.name);
      } else {
        await handleNewAmenity(amenity.name);
      }
    }

    handleUpdateFacility();
  };

  const handleRemoveAmenity = (index: number) => {
    const newAmenities = [...facilityAmenities];
    const [removedAmenity] = newAmenities.splice(index, 1);
    if (removedAmenity.uuid) {
      handleDeleteAmenity(removedAmenity.uuid);
    }
    setFacilityAmenities(newAmenities);
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
              <button
                onClick={() => handleRemoveAmenity(index)}
                className="text-red-500"
              >
                Remove
              </button>
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
      <div className="flex justify-center">
        <TextButton
          label="Update Listing"
          size="large"
          type="primary"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}
