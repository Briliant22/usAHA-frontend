import React from 'react'
import Image from "next/image";
import { NavbarButton } from './isomorphic/navbarButton'

export const Navbar = () => {
  return (
    <div className="bg-[#3A7ADA] h-screen w-28 pt-10 flex flex-col gap-6">
    <NavbarButton 
        isActive={true}
        icon={
        <Image src="/navbarIcons/sewaTempat.svg" alt="icon" width={30} height={30}/>
        }
        label="Sewa Tempat"
    />
    <NavbarButton 
        isActive={false}
        icon={
        <Image src="/navbarIcons/jualBeliAlat.svg" alt="icon" width={30} height={30}/>
        }
        label="Jual Beli Alat"
    />
    <NavbarButton 
        isActive={false}
        icon={
        <Image src="/navbarIcons/forumPekerjaan.svg" alt="icon" width={30} height={30}/>
        }
        label="Forum Pekerjaan"
    />
    <NavbarButton 
        isActive={false}
        icon={
        <Image src="/navbarIcons/akunSaya.svg" alt="icon" width={30} height={30}/>
        }
        label="Akun Saya"
    />
    </div>
  )
}