"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SearchInput } from "./searchInput";
import { LoginModal } from "../account/loginModal";
import { useUser } from "../isomorphic/userContext";
import { RegisterModal } from "../account/registerModal";


export function NavbarHome() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const { user, setUser } = useUser();
  const pathname = usePathname();

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const openRegisterModal = () => {
    setIsRegisterModalOpen(true);
  };

  const closeRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8000/auth/logout/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setUser(null);
        console.log("Logout successful");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const profileButton = !user ? (
    <button
      onClick={openLoginModal}
      className="flex justify-center items-center w-[176px] h-[54px] border rounded-full border-[#1973F9]"
    >
      <p className="w-full text-[#1973F9] font-inter font-medium">Log In</p>
    </button>
  ) : (
    <button
      onClick={handleLogout}
      className="flex justify-center items-center w-[176px] h-[54px] border rounded-full border-[#1973F9]"
    >
      <div className="flex px-4 w-full justify-between items-center">
        <Image
          src={
            user.profile_pic ? user.profile_pic : "/icons/miscIcons/defPfp.svg"
          }
          alt="Profile Image"
          className="object-cover w-[36px] h-[36px] rounded-full"
          width={36}
          height={36}
        />
        <p className="text-[#1973F9] text-[14px] font-semibold mx-3">
          {user.username}
        </p>
      </div>
    </button>
  );

  return (
    <div className="w-full py-4 px-12">
      <div className="w-full flex-shrink-0 pb-4 my-4">
        <div className="flex justify-between items-center">
          <Image src="/usahaLogo.svg" alt="logo" width={200} height={46} />
          {profileButton}
        </div>
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={closeLoginModal}
          openRegister={openRegisterModal}
        />
        <RegisterModal
          isOpen={isRegisterModalOpen}
          onClose={closeRegisterModal}
        />
      </div>
    </div>
  );
}
