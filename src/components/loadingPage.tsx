import React from "react";

export default function LoadingPage() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="flex items-center justify-center">
        <div className="h-[10vw] w-[10vw] animate-spin rounded-full border-b-4 border-t-4 border-[#1973F9]"></div>
      </div>
      <p className="my-8 text-[32px] font-semibold">
        Loading... Harap ditunggu
      </p>
    </div>
  );
}
