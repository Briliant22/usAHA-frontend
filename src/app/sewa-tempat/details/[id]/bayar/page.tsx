"use client";

import React from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation"; // Updated import
import { SewaTempatInput } from "@/components/pembayaran/sewaTempatInput";
import { DetailTempat } from "@/components/pembayaran/detailTempat";

export default function Page() {
  const searchParams = useSearchParams();
  const facilityBooking = searchParams.get('facilityBooking');

  // Check if facilityBooking is a string before parsing
  const booking = typeof facilityBooking === 'string' ? JSON.parse(facilityBooking) : null;

  return (
    <div>
      <div className="flex justify-between pt-10">
        <Image
          src="/icons/miscIcons/backIcon.svg"
          alt="back"
          width={15}
          height={15}
        />
        <h1 className="font-inter font-semibold text-4xl">
          Request to Reserve
        </h1>
        <div className="w-6"></div>
      </div>
      <div className="flex justify-center gap-14 mt-10">
        <DetailTempat />
        <SewaTempatInput />
      </div>
    </div>
  );
}
