import { Navbar } from "@/components/navbar";
import React from "react";


interface LayoutProps {
    children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  return (
    <div className="bg-[#FFFFFF]">
      <div className="mx-auto flex">
          <Navbar />
        <div className="flex-grow">{children}</div>
      </div>
    </div>
  );
}