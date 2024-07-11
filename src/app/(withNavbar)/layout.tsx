import React from "react";
import { Navbar } from "@/components/navbar";

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