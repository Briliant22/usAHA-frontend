"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavbarButton } from "../isomorphic/navbarButton";
import { useUser } from "../isomorphic/userContext";

type NavItem = {
  path: string;
  icon: string;
  label: string;
};

export default function Navbar() {
  const { user } = useUser();
  const pathname = usePathname();

  const navItems: NavItem[] = [
    {
      path: "/sewa-tempat",
      icon: "/icons/navbarIcons/sewaTempat.svg",
      label: "Sewa Tempat",
    },
    {
      path: "/jual-beli-alat",
      icon: "/icons/navbarIcons/jualBeliAlat.svg",
      label: "Jual Beli Alat",
    },
  ];

  if (user) {
    navItems.push({
      path: "/riwayat",
      icon: "/icons/navbarIcons/riwayat.svg",
      label: "Riwayat Transaksi"
    });
  }

  return (
    <div className="flex h-screen w-28 flex-col gap-6 bg-[#3A7ADA] pt-10">
      {navItems.map((item) => (
        <Link href={item.path} key={item.path} passHref>
          <NavbarButton
            isActive={pathname.startsWith(item.path)}
            icon={
              <Image src={item.icon} alt={item.label} width={30} height={30} />
            }
            label={item.label}
          />
        </Link>
      ))}
    </div>
  );
}
