
import { Navbar } from "@/components/navbar/navbar";
import { NavbarAtas } from "@/components/navbar/navbarAtas";
import Image from "next/image"

import React from "react";


interface LayoutProps {
    children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  return (
    <div className="flex">
        <Navbar />
        <div className="flex flex-col h-screen py-9 px-20 w-full">
          <NavbarAtas/>
          <div className="flex-grow overflow-y-auto">
            {children}
          </div>
        </div>
    </div>
  );
}