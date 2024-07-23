import Navbar from "@/components/navbar/navbar";
import NavbarAtas from "@/components/navbar/navbarAtas";

import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  return (
    <div>
      <div className="flex">
        <Navbar />
        <div className="flex h-screen w-full flex-col px-20 py-9">
          <NavbarAtas />
          <div className="flex-grow overflow-y-auto">{children}</div>
        </div>
      </div>
    </div>
  );
}
