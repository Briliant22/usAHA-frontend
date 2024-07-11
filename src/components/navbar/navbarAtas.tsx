"use client"

import React from 'react'
import Image from "next/image"
import { usePathname } from 'next/navigation'
import { SearchInput } from './searchInput'

type PathContent = {
  [key: string]: string;
}

const placeholderMap: PathContent = {
  "/jual-beli-alat": "Cari Alat",
  "/sewa-tempat": "Cari Properti",
}

const buttonTextMap: PathContent = {
  "/jual-beli-alat": "Jual Alatmu",
  "/sewa-tempat": "Sewakan Propertimu",
  "/facilities/details": "Sewakan Propertimu",
}

export const NavbarAtas: React.FC = () => {
  const pathname = usePathname()

  const getPlaceholder = (): string => {
    for (const path in placeholderMap) {
        if (pathname.startsWith(path)) {
          return placeholderMap[path]
        }
      }
      return ""
  }

  const getButtonText = (): string => {
    for (const path in buttonTextMap) {
        if (pathname.startsWith(path)) {
          return buttonTextMap[path]
        }
      }
      return ""
  }

  return (
    <div className="w-full flex-shrink-0 pb-4">
        <div className="flex justify-between items-center">
            <Image src="/usahaLogo.svg" alt="logo" width={200} height={46}/>
            <div className="flex gap-6 items-center">
                <div className="flex gap-2">
                    <div className="bg-gray-100 py-4 px-7 rounded-full w-96 flex gap-2">
                        <Image src="/icons/navbarIcons/searchIcon.svg" alt="search" width={32} height={32}/>
                        <SearchInput placeholder={getPlaceholder()} path={pathname} />
                    </div>
                    <div className="w-16 h-16 bg-[#6197E8] rounded-full flex justify-center items-center">
                        <Image src="/icons/navbarIcons/filterLogo.svg" alt="filter" width={32} height={32}/>
                    </div>
                </div>
                <div className="rounded-[16px] w-56 h-12 bg-[#4082E5] flex items-center justify-center">
                    <p className="font-inter text-white">
                      {getButtonText()}
                    </p>
                </div>
            </div>
            <button className="px-12 py-4 border rounded-full border-[#1973F9] text-[#1973F9] font-inter font-medium">Log in</button>
        </div>
    </div>
  )
}