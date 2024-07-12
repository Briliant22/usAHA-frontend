"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import { UserProvider } from "@/components/isomorphic/userContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
