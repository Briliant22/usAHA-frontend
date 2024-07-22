"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SearchInput } from "./searchInput";
import { LoginModal } from "../account/loginModal";
import { useUser } from "../isomorphic/userContext";
import { RegisterModal } from "../account/registerModal";
import { FilterCategoryInput } from "./filterCategoryInput";

type PathContent = {
  [key: string]: string;
};

const placeholderMap: PathContent = {
  "/jual-beli-alat": "Cari Alat",
  "/sewa-tempat": "Cari Properti",
  "/riwayat": "Cari Properti",
};

const buttonTextMap: PathContent = {
  "/jual-beli-alat": "Jual Alatmu",
  "/sewa-tempat": "Sewakan Propertimu",
  "/riwayat": "Sewakan Propertimu",
  "/facilities/details": "Sewakan Propertimu",
};

export function NavbarAtas() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const { user, setUser } = useUser();
  const pathname = usePathname();

  const getPlaceholder = (): string => {
    for (const path in placeholderMap) {
      if (pathname.startsWith(path)) {
        return placeholderMap[path];
      }
    }
    return "";
  };

  const getButtonText = (): string => {
    for (const path in buttonTextMap) {
      if (pathname.startsWith(path)) {
        return buttonTextMap[path];
      }
    }
    return "";
  };

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
      <div className="flex w-full items-center justify-evenly px-4">
        <Image
          src={
            user.profile_pic ? user.profile_pic : "/icons/miscIcons/defPfp.svg"
          }
          alt="Profile Image"
          className="h-[36px] w-[36px] rounded-full object-cover"
          width={36}
          height={36}
        />
        <div className="flex w-[120px] items-center justify-center">
          <p className="text-[14px] font-semibold text-[#1973F9]">
            {user.first_name} {user.last_name}
          </p>
        </div>
      </div>
    </button>
  );

  return (
    <div className="w-full">
      <div className="w-full flex-shrink-0 pb-4">
        <div className="flex items-start justify-between space-x-3">
          <Image src="/usahaLogo.svg" alt="logo" width={200} height={46} />
          <div className="flex items-center gap-6">
            <div className="flex gap-2">
              <div className="flex w-96 gap-2 rounded-full bg-gray-100 px-7 py-4">
                <Image
                  src="/icons/navbarIcons/searchIcon.svg"
                  alt="search"
                  width={32}
                  height={32}
                />
                <SearchInput placeholder={getPlaceholder()} path={pathname} />
              </div>
            </div>
            <div className="flex h-12 w-56 items-center justify-center rounded-[16px] bg-[#4082E5]">
              <p className="font-inter text-white">{getButtonText()}</p>
            </div>
          </div>
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
