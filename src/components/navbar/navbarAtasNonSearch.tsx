"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SearchInput } from "./searchInput";
import { LoginModal } from "../account/loginModal";
import { useUser } from "../isomorphic/userContext";
import { RegisterModal } from "../account/registerModal";
import { FilterCategoryInput } from "./filterCategoryInput";
import { API_URL } from "@/config/apiUrl";

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

export function NavbarAtasNonSearch() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
  }

  const closeRegisterModal = () => {
    setIsRegisterModalOpen(false);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch(API_URL+"/auth/logout/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setUser(null);
        setIsDropdownOpen(false);
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
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
        className="flex justify-center items-center w-[176px] h-[54px] border rounded-full border-[#1973F9]"
      >
        <div className="flex px-4 w-full justify-between items-center">
          <Image
            src={user.profile_pic ? user.profile_pic : "/icons/miscIcons/defPfp.svg"}
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
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Your Profile</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Settings</a>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );


  return (
    <div className="w-full">
      <div className="w-full flex-shrink-0 pb-4">
        <div className="flex justify-between items-center">
          <Image src="/usahaLogo.svg" alt="logo" width={200} height={46} />
          <div className="flex gap-6 items-center">
          </div>
          {profileButton}
        </div>
        <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} openRegister={openRegisterModal} />
        <RegisterModal isOpen={isRegisterModalOpen} onClose={closeRegisterModal} />
      </div>
    </div>
    
  );
}
