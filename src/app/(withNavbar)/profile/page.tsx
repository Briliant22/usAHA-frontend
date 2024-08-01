"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@/components/isomorphic/userContext";
import ProfileDetail from "@/components/account/profileDetail";
import EditProfile from "@/components/account/editProfile";
import FacilityReviews from "@/components/facilities/facilityReviews";
import LoadingPage from "@/components/loadingPage";

interface Review {
  id: string;
  user: string;
  user_name: string;
  user_pfp: string;
  user_start: string;
  booking: string;
  facility: string;
  facility_name: string;
  rating: number;
  content: string;
  created_at: string;
  updated_at: string;
}

export default function Page() {
  const { user, fetchWithCredentials } = useUser();
  const [editProfile, setEditProfile] = useState<boolean>(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const startEditing = () => {
    setEditProfile(true);
  };

  const stopEditing = () => {
    setEditProfile(false);
  };

  useEffect(() => {
    const fetchReviews = async () => {
      if (user) {
        try {
          const response = await fetchWithCredentials(
            `http://localhost:8000/facilities/reviews/?user=${user.id}`,
          );
          if (response.ok) {
            const data = await response.json();
            setReviews(data);
          } else {
            throw new Error("Failed to fetch reviews");
          }
        } catch (error) {
          setError("Failed to fetch reviews");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchReviews();
  }, [user]);

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex h-full w-full flex-col items-center">
      <h1 className="mb-8 text-center text-[40px] font-semibold underline">
        Akun Saya
      </h1>
      {!editProfile ? (
        <div className="flex w-full flex-col items-center justify-center space-y-10">
          <div className="flex w-3/5 flex-col justify-center space-y-10">
            <ProfileDetail onEditProfile={startEditing} />
            <div className="h-[1px] w-full bg-[#E0E5F2]"></div>
          </div>
          <FacilityReviews reviews={reviews} editable={true} />
        </div>
      ) : (
        <EditProfile onCancel={stopEditing} />
      )}
    </div>
  );
}
