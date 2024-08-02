"use client";

import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "./isomorphic/userContext";
import LoadingPage from "./loadingPage";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoggedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/sewa-tempat");
    }
  }, [user, isLoggedIn, router]);

  if (!isLoggedIn()) {
    return <LoadingPage />;
  }

  return <>{children}</>;
}
