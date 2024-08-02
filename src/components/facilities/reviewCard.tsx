"use client";

import memberStart from "@/utils/memberStart";
import reviewCreated from "@/utils/reviewCreated";
import Image from "next/image";
import { useState } from "react";
import { useUser } from "../isomorphic/userContext";

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

interface ReviewCardProps {
  review: Review;
  editable: boolean;
}

const starIcon = "/icons/reviewStar.svg";
const starIconNonActive = "/icons/reviewStarNonActive.svg";

export default function ReviewCard({ review, editable }: ReviewCardProps) {
  const { fetchWithCredentials } = useUser();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(review.rating);
  const [content, setContent] = useState<string>(review.content);

  const toggleEdit = () => {
    setEditMode(!editMode);
  };

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleCancelEdit = () => {
    toggleEdit();
    setRating(review.rating);
    setContent(review.content);
  };

  const handleEditReview = async () => {
    const formData = new FormData();
    formData.append("rating", String(rating));
    formData.append("content", content);

    try {
      const response = await fetchWithCredentials(
        `${process.env.NEXT_PUBLIC_API_URL}/facilities/review/${review.id}/`,
        {
          method: "PUT",
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error("Edit failed");
      }

      toggleEdit();
      window.location.reload();
    } catch (error) {
      console.error("Error editing review:", error);
    }
  };

  const handleDeleteReview = async () => {
    try {
      const response = await fetchWithCredentials(
        `${process.env.NEXT_PUBLIC_API_URL}/facilities/review/${review.id}/`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error("Delete failed");
      }
    } catch (error) {
      console.error("Error deleting review:", error);
    }
    window.location.reload();
  };

  return (
    <div className="flex h-[400px] w-[600px] flex-col items-center justify-start space-y-2 rounded-[20px] p-6 shadow-md">
      <div className="flex w-full items-center justify-start space-x-6">
        {review.user_pfp ? (
          <Image
            src={review.user_pfp}
            alt="Owner Profile"
            className="h-16 w-16 rounded-full object-cover"
            width={60}
            height={60}
          />
        ) : (
          <Image
            src="icons/miscIcons/defPfp.svg"
            alt="Default Profile"
            className="h-14 w-14 rounded-full object-cover"
            width={60}
            height={60}
          />
        )}
        <div className="flex w-full items-center justify-between">
          <div className="flex h-full flex-col items-start justify-center">
            <h2 className="text-[20px] font-semibold text-[#4082E5]">
              {review.user_name}
            </h2>
            <p className="text-[14px] font-medium">
              {memberStart(review.user_start)}
            </p>
            <p className="text-[16px] font-semibold text-[#4082E5]">
              {`Menyewa ${review.facility_name}`}
            </p>
          </div>
          {editable ? (
            <div className="flex items-center justify-end space-x-4">
              {editMode ? (
                <button
                  onClick={handleCancelEdit}
                  className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-red-600 hover:bg-red-400"
                >
                  <Image
                    src="/icons/miscIcons/closeWhite.svg"
                    alt="Edit Profile"
                    className="h-[20px] w-[20px] rounded-full object-cover"
                    width={27}
                    height={27}
                  />
                </button>
              ) : (
                <button
                  onClick={handleDeleteReview}
                  className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-red-600 hover:bg-red-400"
                >
                  <Image
                    src="/icons/miscIcons/delete.svg"
                    alt="Edit Profile"
                    className="h-[20px] w-[20px] rounded-full object-cover"
                    width={27}
                    height={27}
                  />
                </button>
              )}
              <button
                onClick={editMode ? handleEditReview : toggleEdit}
                className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#1973F9] hover:bg-[#97BCF2]"
              >
                <Image
                  src="/icons/miscIcons/edit.svg"
                  alt="Edit Profile"
                  className="h-[20px] w-[20px] rounded-full object-cover"
                  width={27}
                  height={27}
                />
              </button>
            </div>
          ) : null}
        </div>
      </div>
      {!editMode ? (
        <div className="flex w-full flex-col space-y-2">
          <div className="flex w-full items-center justify-start space-x-1">
            <Image src={starIcon} alt="reviewStar" width={24} height={24} />
            <div className="flex w-full items-baseline justify-start space-x-1">
              <span className="text-[16px] font-medium text-[#4082E5]">
                {review.rating == 0 ? 0 : review.rating}/5
              </span>
              <p className="text-[14px] font-normal text-[#A7AFC4]">
                {reviewCreated(review.created_at)}
              </p>
            </div>
          </div>
          <div className="flex w-full items-start justify-start">
            <p className="text-[14px] font-normal">{review.content}</p>
          </div>
        </div>
      ) : (
        <div className="flex h-full w-full flex-col">
          <div className="flex h-full w-full flex-col items-center justify-start space-x-1">
            <div className="flex w-full flex-col items-start justify-start">
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
            <div className="flex h-full w-full flex-col items-start">
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="mt-2 h-full w-full rounded-md border border-gray-300 p-2"
                rows={5}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
