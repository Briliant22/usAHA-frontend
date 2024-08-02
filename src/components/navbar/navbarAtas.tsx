"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { SearchInput } from "./searchInput";
import ProfileButton from "../account/profileButton";
import Link from "next/link";
import TextButton from "../textButton";
import { useState } from "react";
import { useUser } from "../isomorphic/userContext";
import { LoginModal } from "../account/loginModal";
import { RegisterModal } from "../account/registerModal";

interface NavbarProps {
  isDashboard: boolean;
}

type PathContent = {
  [key: string]: string;
};

const placeholderMap: PathContent = {
  "/jual-beli-alat": "Cari Alat",
  "/sewa-tempat": "Cari Properti",
  "/riwayat": "Cari Properti",
  "/listing": "Cari Properti",
  "/profile": "Cari Properti",
};

const buttonTextMap: PathContent = {
  "/jual-beli-alat": "Jual Alatmu",
  "/sewa-tempat": "Sewakan Propertimu",
  "/riwayat": "Sewakan Propertimu",
  "/listing": "Sewakan Propertimu",
  "/profile": "Sewakan Propertimu",
};

const redirectLinkMap: PathContent = {
  "/jual-beli-alat": "/jual-beli-alat",
  "/sewa-tempat": "/listing/create",
  "/riwayat": "/listing/create",
  "/listing": "/listing/create",
  "/profile": "/listing/create",
};

export default function NavbarAtas({ isDashboard }: NavbarProps) {
  const pathname = usePathname();
  const { user } = useUser();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);
  const openRegisterModal = () => setIsRegisterModalOpen(true);
  const closeRegisterModal = () => setIsRegisterModalOpen(false);

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

  const getRedirectLink = (): string => {
    for (const path in redirectLinkMap) {
      if (pathname.startsWith(path)) {
        return redirectLinkMap[path];
      }
    }
    return "";
  };

  return (
    <div className="w-full px-12 py-2">
      <div className="w-full flex-shrink-0 pb-4">
        <div className="flex items-center justify-between space-x-3">
          <Link href={"/"}>
            <Image src="/usahaLogo.svg" alt="logo" width={200} height={46} />
          </Link>
          {isDashboard ? (
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
              {!user ? (
                <TextButton
                  label={getButtonText()}
                  size="large"
                  type="primary"
                  onClick={openLoginModal}
                />
              ) : (
                <Link href={getRedirectLink()}>
                  <TextButton
                    label={getButtonText()}
                    size="large"
                    type="primary"
                  />
                </Link>
              )}
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
          ) : null}
          <ProfileButton />
        </div>
      </div>

      <div className="h-[1px] w-full bg-[#E0E5F2]"></div>
    </div>
  );
}
