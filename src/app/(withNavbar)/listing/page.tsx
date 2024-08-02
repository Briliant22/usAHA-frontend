"use client";

import { useUser } from "@/components/isomorphic/userContext";
import { useEffect, useState } from "react";
import FacilityCard from "@/components/facilities/facilityCard";
import LoadingPage from "@/components/loadingPage";
import ProtectedRoute from "@/components/protectedRoute";

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

export default function Page() {
  const { isLoggedIn, fetchWithCredentials } = useUser();
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFacilities = async () => {
      if (isLoggedIn()) {
        try {
          const response = await fetchWithCredentials(
            `${process.env.NEXT_PUBLIC_API_URL}/facilities/owner/`,
          );
          if (response.ok) {
            const data: Facility[] = await response.json();
            setFacilities(data);
          } else {
            throw new Error("Gagal mengambil listing anda");
          }
        } catch (err) {
          setError("Gagal mengambil listing anda. Coba lagi di lain waktu.");
          console.error(err);
        }
      } else {
        setError("Anda harus login terlebih dahulu.");
      }
      setLoading(false);
    };

    fetchFacilities();
  }, [isLoggedIn, fetchWithCredentials]);

  if (loading)
    return (
      <ProtectedRoute>
        <LoadingPage />;
      </ProtectedRoute>
    );
  if (error)
    return (
      <ProtectedRoute>
        <div>Error: {error}</div>;
      </ProtectedRoute>
    );

  return (
    <ProtectedRoute>
      <div className="flex h-screen w-full flex-col items-center">
        <div className="flex flex-col items-center justify-center py-4">
          <h1 className="text-center text-[40px] font-semibold">
            Listing Anda
          </h1>
        </div>
        <div className="mx-auto grid grid-cols-1 gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
          {facilities.map((facility) => (
            <FacilityCard
              key={facility.uuid}
              facility={facility}
              isOwner={true}
            />
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
