"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SearchInput } from "./searchInput";
import { LoginModal } from "../account/loginModal";
import { useUser } from "../isomorphic/userContext";

type PathContent = {
  [key: string]: string;
};

const placeholderMap: PathContent = {
  "/jual-beli-alat": "Cari Alat",
  "/sewa-tempat": "Cari Properti",
};

const buttonTextMap: PathContent = {
  "/jual-beli-alat": "Jual Alatmu",
  "/sewa-tempat": "Sewakan Propertimu",
  "/facilities/details": "Sewakan Propertimu",
};

export function NavbarAtas() {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    setIsModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsModalOpen(false);
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
      <div className="flex px-4 w-full justify-start items-center">
        <Image
          src="/imgs/pfp.jpg"
          alt="Profile Image"
          className="object-cover w-[36px] h-[36px] rounded-full"
          width={36}
          height={36}
        />
        <p className="text-[#1973F9] text-[14px] font-semibold ml-7">
          {user.username}
        </p>
      </div>
    </button>
  );

  return (
    <div className="w-full flex-shrink-0 pb-4">
      <div className="flex justify-between items-center">
        <Image src="/usahaLogo.svg" alt="logo" width={200} height={46} />
        <div className="flex gap-6 items-center">
          <div className="flex gap-2">
            <div className="bg-gray-100 py-4 px-7 rounded-full w-96 flex gap-2">
              <Image
                src="/icons/navbarIcons/searchIcon.svg"
                alt="search"
                width={32}
                height={32}
              />
              <SearchInput placeholder={getPlaceholder()} path={pathname} />
            </div>
            <div className="w-16 h-16 bg-[#6197E8] rounded-full flex justify-center items-center">
              <Image
                src="/icons/navbarIcons/filterLogo.svg"
                alt="filter"
                width={32}
                height={32}
              />
            </div>
          </div>
          <div className="rounded-[16px] w-56 h-12 bg-[#4082E5] flex items-center justify-center">
            <p className="font-inter text-white">{getButtonText()}</p>
          </div>
        </div>
        {profileButton}
      </div>
      <LoginModal isOpen={isModalOpen} onClose={closeLoginModal} />
    </div>
  );
}
