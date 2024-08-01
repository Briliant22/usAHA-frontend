"use client";

import { useUser } from "../isomorphic/userContext";
import ReviewCard from "./reviewCard";

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

interface FacilityReviewsProps {
  reviews: Review[];
  editable: boolean;
}

export default function FacilityReviews({
  reviews,
  editable,
}: FacilityReviewsProps) {
  const { user } = useUser();

  return (
    <div className="my-8 flex w-3/4 flex-col items-center justify-center">
      <h2 className="text-[32px] font-bold text-[#4082E5]">Ulasan</h2>
      <div className="2lg:grid-cols-2 mx-auto my-4 grid grid-cols-1 gap-8 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
        {reviews.map((review, index) => (
          <ReviewCard
            key={index}
            review={review}
            editable={user?.id === review.user ? true : editable}
          />
        ))}
      </div>
    </div>
  );
}
