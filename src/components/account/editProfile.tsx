"use client";
import { useUser } from "../isomorphic/userContext";
import Image from "next/image";
import { useState } from "react";
import EditPfpModal from "./editPfpModal";

export default function EditProfile() {
  const { user, isLoggedIn } = useUser();
  const [editPfp, setEditPfp] = useState<boolean>(false);

  const openEditPfpModal = () => {
    setEditPfp(true);
  };

  const closeEditPfpModal = () => {
    setEditPfp(false);
  };

  return (
    <div className="flex h-full w-full min-w-fit">
      {isLoggedIn() ? (
        <div className="flex h-full w-full min-w-fit justify-center space-x-10">
          <div className="relative flex h-64 w-64 min-w-fit items-start justify-start">
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
            <button
              onClick={openEditPfpModal}
              className="absolute bottom-0 right-4 flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#1973F9]"
            >
              <Image
                src="/icons/miscIcons/edit.svg"
                alt="Edit Profile"
                className="h-[27px] w-[27px] rounded-full object-cover"
                width={27}
                height={27}
              />
            </button>
            <EditPfpModal isOpen={editPfp} onClose={closeEditPfpModal} />
          </div>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}
