"use client"

import React from 'react'
import Image from "next/image";
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { NavbarButton } from '../isomorphic/navbarButton'

type NavItem = {
    path: string;
    icon: string;
    label: string;
}
  
const navItems: NavItem[] = [
    { path: '/sewa-tempat', icon: '/icons/navbarIcons/sewaTempat.svg', label: 'Sewa Tempat' },
    { path: '/jual-beli-alat', icon: '/icons/navbarIcons/jualBeliAlat.svg', label: 'Jual Beli Alat' },
    { path: '/forum-pekerjaan', icon: '/icons/navbarIcons/forumPekerjaan.svg', label: 'Forum Pekerjaan' },
    { path: '/akun-saya', icon: '/icons/navbarIcons/akunSaya.svg', label: 'Akun Saya' },
]

export const Navbar: React.FC = () => {
    const pathname = usePathname()
    return (
        <div className="bg-[#3A7ADA] h-screen w-28 pt-10 flex flex-col gap-6">
            {navItems.map((item) => (
                <Link href={item.path} key={item.path} passHref>
                <NavbarButton 
                    isActive={pathname === item.path}
                    icon={
                    <Image src={item.icon} alt={item.label} width={30} height={30}/>
                    }
                    label={item.label}
                />
                </Link>
            ))}
        </div>
    )
}