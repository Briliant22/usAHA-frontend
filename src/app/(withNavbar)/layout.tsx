import { Navbar } from "@/components/navbar";
import React from "react";


interface LayoutProps {
    children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  return (
    <div className="flex">
        <Navbar />
        <div>{children}</div>
    </div>
  );
}