"use client";

import React, { useState } from "react";
import { useUser } from "@/components/isomorphic/userContext";
import ProfileDetail from "@/components/account/profileDetail";
import EditProfile from "@/components/account/editProfile";

export default function Page() {
  const [editProfile, setEditProfile] = useState<boolean>(false);

  const startEditing = () => {
    setEditProfile(true);
  };

  const stopEditing = () => {
    setEditProfile(false);
  };

  return (
    <div className="flex h-full w-full flex-col items-center">
      <h1 className="mb-8 text-center text-[40px] font-semibold underline">
        Akun Saya
      </h1>
      {!editProfile ? (
        <div className="flex w-3/5 flex-col justify-center space-y-10">
          <ProfileDetail onEditProfile={startEditing} />
          <div className="h-[1px] w-full bg-[#E0E5F2]"></div>
          <div className="flex h-full w-full flex-col items-center justify-center">
            <h2 className="text-[32px] font-bold text-[#4082E5]">Ulasan</h2>
          </div>
        </div>
      ) : (
        <EditProfile onCancel={stopEditing} />
      )}
    </div>
  );
}
