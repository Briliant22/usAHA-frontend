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
      className="flex h-[54px] w-[176px] items-center justify-center rounded-full border border-[#1973F9]"
    >
      <p className="w-full font-inter font-medium text-[#1973F9]">Log In</p>
    </button>
  ) : (
    <button
      onClick={handleLogout}
      className="flex h-[54px] w-[176px] items-center justify-center rounded-full border border-[#1973F9]"
    >
      <div className="flex w-full items-center justify-between px-4">
        <Image
          src={
            user.profile_pic ? user.profile_pic : "/icons/miscIcons/defPfp.svg"
          }
          alt="Profile Image"
          className="h-[36px] w-[36px] rounded-full object-cover"
          width={36}
          height={36}
        />
        <p className="mx-3 text-[14px] font-semibold text-[#1973F9]">
          {user.username}
        </p>
      </div>
    </button>
  );

  return (
    <div className="w-full px-12 py-4">
      <div className="my-4 w-full flex-shrink-0 pb-4">
        <div className="flex items-center justify-between">
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
