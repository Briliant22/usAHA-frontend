import React from "react";
import Footer from "@/components/footer";
import NavbarAtas from "@/components/navbar/navbarAtas";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="w-full flex-grow pb-10">
      <NavbarAtas isDashboard={false} />
        {children}
      </div>
      <Footer />
    </div>
  );
}
