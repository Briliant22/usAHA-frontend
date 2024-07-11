import React from "react";
import { NavbarAtas } from "@/components/navbar/navbarAtas";
import Footer from "@/components/footer";


interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow w-full px-16 py-8">
        <NavbarAtas />
        {children}
      </div>
      <Footer />
    </div>
  );
}