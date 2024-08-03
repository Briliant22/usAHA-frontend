"use client";
import memberStart from "@/utils/memberStart";
import { useUser } from "../isomorphic/userContext";
import Image from "next/image";
import { truncateText } from "@/utils/truncateText";
import TextButton from "../textButton";

interface ProfileDetailProps {
  onEditProfile: () => void;
}

export default function ProfileDetail({ onEditProfile }: ProfileDetailProps) {
  const { user, isLoggedIn } = useUser();

  return (
    <div className="flex h-full w-full min-w-fit">
      {isLoggedIn() ? (
        <div className="mt-6 flex h-full w-full min-w-fit items-center justify-between space-x-10">
          <div className="flex h-64 w-64 min-w-fit items-start justify-start rounded-full border border-[#4082E5]">
            <Image
              src={
                user?.profile_pic
                  ? user?.profile_pic
                  : "/icons/miscIcons/defPfp.svg"
              }
              alt="Profile Image"
              className="h-64 w-64 rounded-full object-cover"
              width={250}
              height={250}
            />
          </div>
          <div className="flex w-full flex-col justify-start">
            <div className="flex justify-between">
              <h1 className="text-[32px] font-semibold text-[#4082E5]">
                {user?.first_name} {user?.last_name}
              </h1>
              <TextButton
                label="Edit Profil"
                size="small"
                type="secondary"
                onClick={onEditProfile}
              />
            </div>
            <span className="flex justify-start space-x-10">
              <h2 className="text-[20px] font-medium">
                {user?.contact_number}
              </h2>
              <h2 className="text-[20px] font-medium">{user?.email}</h2>
            </span>
            {!user ? (
              <h2 className="text-[20px] font-normal text-[#4082E5]">
                member not found
              </h2>
            ) : (
              <div>
                <h2 className="text-[20px] font-normal text-[#4082E5]">
                  {memberStart(user.date_joined)}
                </h2>
                <div className="my-4 flex h-[30vh] w-full flex-col items-start justify-start rounded-[20px] border border-[#A6A7B1] p-4">
                  {user.bio == null ? (
                    <p className="text-[18px] font-normal text-[#A6A7B1]">
                      Halo! Nama saya ...
                    </p>
                  ) : (
                    <p className="text-[18px] font-normal">
                      {truncateText(user.bio, 500)}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p>User belum login...</p>
      )}
    </div>
  );
}
