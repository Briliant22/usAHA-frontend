import LoadingPage from "@/components/loadingPage";
import Navbar from "@/components/navbar/navbar";
import NavbarAtas from "@/components/navbar/navbarAtas";

import React, { Suspense } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  return (
    <Suspense fallback={<LoadingPage />}>
      <div>
        <div className="relative flex">
          <Navbar />
          <div className="flex h-screen w-full flex-col px-20 py-9">
            <NavbarAtas isDashboard={true} />
            <div className="flex-grow overflow-y-auto">{children}</div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
