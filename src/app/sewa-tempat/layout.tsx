import React from "react";
import Footer from "@/components/footer";
import { NavbarHome } from "@/components/navbar/navbarHome";


interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow w-full px-16">
        <NavbarHome />
        {children}
      </div>
      <Footer />
    </div>
  );
}