import React from 'react'
import Image from "next/image";

export const DetailTempat = () => {
  return (
    <div className="h-full">
                <div className="h-72 relative w-72 mb-4">
                    <Image
                        src="/imgs/tempbg3.jpg"
                        alt="Foto Fasilitas"
                        width={290}
                        height={300}
                        className="absolute inset-0 object-cover w-full h-full rounded-2xl"
                    />
                </div>
                <div className="flex flex-col justify-center items-center gap-1">
                    <p className="font-inter font-semibold text-3xl">Mama's Kitchen</p>
                    <div className="flex items-center my-1">
                        <Image src="/icons/location.svg" alt="locationIcon" width={24} height={24} />
                        <span className="text-[#6F778C] ml-1 text-xl">Pulo Asem, Jakarta Timur</span>
                    </div>
                </div>
                <div className="flex justify-center gap-5">
                    <div className="flex justify-center">
                        <Image
                        src="/icons/reviewStar.svg"
                        alt="reviewStar"
                        width={24}
                        height={24}
                        />
                        <span className="text-[#4082E5] text-xl font-medium pt-1">4,9/5</span>
                    </div>
                    <p className="text-lg font-inter text-[#4082E5] font-medium my-auto underline">200 reviews</p>
                </div>
                <div className="flex justify-between mt-8">
                    <div className="flex gap-2">
                        <div className="w-[42px] h-[42px] relative">
                            <Image
                            src="/imgs/pfp.jpg"
                            alt="pfp"
                            width={42}
                            height={42}
                            className="absolute inset-0 object-cover w-full h-full rounded-full"
                            />
                        </div>
                        <div className="flex flex-col">
                            <p className="font-medium">Zoha Alatas</p>
                            <p className="text-xs font-medium text-[#4082E5]">Member sejak 3 tahun lalu</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <Image
                            src="/icons/socmedIcons/bluePhone.svg"
                            alt="Phone"
                            width={18}
                            height={18}
                        />
                        <Image
                            src="/icons/socmedIcons/chat.svg"
                            alt="chat Icon"
                            width={20}
                            height={18}
                        />
                    </div>
                </div>
            </div>
  )
}
