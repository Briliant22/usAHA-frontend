import React from "react";
import Footer from "@/components/footer";
import { NavbarHome } from "@/components/navbar/navbarHome";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="w-full flex-grow px-16 pb-10">
        <NavbarHome />
        {children}
      </div>
      <Footer />
    </div>
  );
}
