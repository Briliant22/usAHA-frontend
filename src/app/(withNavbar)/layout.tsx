
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
        <div className="w-full px-16 py-8">
            <NavbarAtas/>
            {children}
        </div>
    </div>
  );
}