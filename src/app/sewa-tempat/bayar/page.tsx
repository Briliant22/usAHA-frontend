import React from 'react'
import Image from "next/image";
import { SewaTempatInput } from '@/components/pembayaran/sewaTempatInput';
import { DetailTempat } from '@/components/pembayaran/detailTempat';

export default function Page() {
  return (
    <div>
        <div className="flex justify-between pt-10">
            <Image 
                src="/icons/miscIcons/backIcon.svg"
                alt="back"
                width={15}
                height={15}
            />
            <h1 className="font-inter font-semibold text-4xl">Request to Reserve</h1>
            <div className="w-6"></div>
        </div>
        <div className="flex justify-center gap-14 mt-10">
            <DetailTempat/>
            <SewaTempatInput/>
        </div>
    </div>
  )
}
