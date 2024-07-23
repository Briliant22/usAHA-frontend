"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { SearchInput } from "./searchInput";
import ProfileButton from "../account/profileButton";
import Link from "next/link";

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
};

const buttonTextMap: PathContent = {
  "/jual-beli-alat": "Jual Alatmu",
  "/sewa-tempat": "Sewakan Propertimu",
  "/riwayat": "Sewakan Propertimu",
  "/listing": "Cari Properti",
  "/facilities/details": "Sewakan Propertimu",
};

export default function NavbarAtas({ isDashboard }: NavbarProps) {
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

  return (
    <div className="w-full px-12 py-4">
      <div className="w-full flex-shrink-0 pb-4">
        <div className="flex items-start justify-between space-x-3">
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
              <div className="flex h-12 w-56 items-center justify-center rounded-[16px] bg-[#4082E5]">
                <p className="font-inter text-white">{getButtonText()}</p>
              </div>
            </div>
          ) : null}
          <ProfileButton />
        </div>
      </div>

      <div className="h-[1px] w-full bg-[#E0E5F2]"></div>
    </div>
  );
}
