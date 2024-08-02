import React from "react";
import Footer from "@/components/footer";
import NavbarAtas from "@/components/navbar/navbarAtas";
import ProtectedRoute from "@/components/protectedRoute";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col">
        <div className="w-full flex-grow px-16 pb-10">
          <NavbarAtas isDashboard={false} />
          {children}
        </div>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
