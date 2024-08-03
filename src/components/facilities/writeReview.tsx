"use client";

import { useState } from "react";
import { useUser } from "../isomorphic/userContext";
import TextButton from "../textButton";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface FacilityImage {
  uuid: string;
  facility: string;
  image: string;
  is_primary: boolean;
}

interface FacilityBooking {
  uuid: string;
  facility: string;
  booker: string;
  start_date: string;
  end_date: string;
  duration: number;
  notes: string;
  is_approved: boolean;
  is_paid: boolean;
  user_rating: number | null;
  facility_name: string;
  city: string;
  price_per_day: number;
  image: FacilityImage;
}

interface WriteReviewProps {
  booking: FacilityBooking;
}

const starIcon = "/icons/reviewStar.svg";
const starIconNonActive = "/icons/reviewStarNonActive.svg";

export default function WriteReview({ booking }: WriteReviewProps) {
  const { fetchWithCredentials, isLoggedIn } = useUser();
  const router = useRouter();
  const [rating, setRating] = useState<number>(0);
  const [content, setContent] = useState<string>("");

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleCreateReview = async () => {
    const formData = new FormData();
    formData.append("booking", booking.uuid);
    formData.append("facility", booking.facility);
    formData.append("rating", String(rating));
    formData.append("content", content);

    try {
      const response = await fetchWithCredentials(
        `${process.env.NEXT_PUBLIC_API_URL}/facilities/review/create/`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error("Edit failed");
      }

      window.location.reload();
    } catch (error) {
      console.error("Error creating review:", error);
    }
  };

  return (
    <div className="my-8 flex w-3/4 flex-col items-center justify-center">
      {isLoggedIn() ? (
        <div className="flex h-[400px] w-full flex-col items-start justify-center space-y-4 rounded-[20px] p-8 shadow-md">
          <div className="flex flex-col items-start">
            <label htmlFor="rating" className="text-[20px] font-semibold">
              Rating (1-5):
            </label>
            <div className="mt-2 flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingChange(star)}
                  className="focus:outline-none"
                >
                  <Image
                    src={star <= rating ? starIcon : starIconNonActive}
                    alt={`${star} star`}
                    width={32}
                    height={32}
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="flex w-full flex-col items-start">
            <label htmlFor="content" className="text-[20px] font-semibold">
              Review:
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="mt-2 w-full rounded-md border border-gray-300 p-2"
              rows={5}
            />
          </div>
          <div className="flex w-full items-center justify-center p-2">
            <TextButton
              label="Buat Review"
              size="large"
              type="secondary"
              onClick={handleCreateReview}
            />
          </div>
        </div>
      ) : (
        <p>User belum login...</p>
      )}
    </div>
  );
}
