import React from "react";
import Image from "next/image";
import { formatCurrency } from "@/utils/formatCurrency";

const locationIcon = "/icons/location.svg";
const likeNonActiveIcon = "/icons/miscIcons/heart.svg";
const checkedBoxIcon = "/icons/miscIcons/checkedBox.svg";
const shareIcon = "/icons/miscIcons/share.svg";
const starIcon = "/icons/reviewStar.svg";

export default function Page({ params }: { params: { id: string } }) {
  const facilityImages = [
    "/imgs/tempbg1.jpg",
    "/imgs/tempbg2.jpg",
    "/imgs/tempbg3.jpg",
  ];
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="flex justify-between w-3/4 my-8">
        <div className="flex flex-col justify-start">
          <h1 className="text-[#000000] text-[32px] font-semibold">
            Mamas Kitchen
          </h1>
          <div className="flex items-center my-1">
            <Image
              src={locationIcon}
              alt="locationIcon"
              width={24}
              height={24}
            />
            <span className="text-[#6F778C] text-xl ml-1">
              Pulo Asem, Jakarta Timur
            </span>
          </div>
        </div>
        <div className="flex space-x-5 items-start">
          <div className="flex items-center my-1">
            <Image
              src={likeNonActiveIcon}
              alt="likeNonActiveIcon"
              width={28}
              height={28}
            />
            <span className="text-[#1973F9] text-base ml-1 underline">
              Save
            </span>
          </div>
          <div className="flex items-center my-1">
            <Image src={shareIcon} alt="shareIcon" width={28} height={28} />
            <span className="text-[#1973F9] text-base ml-1 underline">
              Share
            </span>
          </div>
        </div>
      </div>
      <div className="flex w-3/4 justify-around my-8">
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
          {facilityImages.map((src, index) => (
            <div key={index} className="relative w-[460px] h-[484px]">
              <Image
                src={src}
                alt={`facilityImg${index + 1}`}
                layout="fill"
                objectFit="cover"
                className="rounded-[32px]"
                
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex w-3/4 justify-start items-center space-x-6">
        <div className="flex items-center space-x1">
          <Image src={starIcon} alt="reviewStar" width={31} height={31} />
          <span className="text-[#4082E5] text-xl font-semibold">4.9/5</span>
        </div>
        <p className="text-[#4082E5] text-xl font-normal underline">
          200 reviews
        </p>
      </div>
      <div className="flex w-3/4 justify-start items-center my-4">
        <p className="text-[#000000] text-base font-normal leading-relaxed">
          Berlokasi di Pulo Asem. Dapur ini berukuran 8x10m2. Disewakan oleh
          Mamas Bakery dan dilengkapi peralatan baking super lengkap yang dapat
          dipakai dalam waktu peminjaman. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Pellentesque tristique rutrum ex a
          ultrices. Nulla maximus ex ac fermentum vestibulum. Proin laoreet nisl
          sed ex vulputate elementum. Nullam id augue posuere, consectetur massa
          id, mollis mauris. Integer molestie aliquam lorem, non tristique nunc.
          Ut eu orci sed elit interdum dapibus vitae nec ipsum. Donec molestie
          felis bibendum, imperdiet lorem quis, tempor arcu. Donec bibendum
          eleifend vehicula. Nulla nec sem felis. Nam vel tristique ante. Nullam
          eu nunc velit. Curabitur augue ex, feugiat ut libero sed, molestie
          malesuada massa. Aenean pharetra gravida elit, ac pellentesque massa
          cursus in. Sed faucibus, felis nec consequat varius, metus dolor
          consequat neque, ac dictum velit enim ac nulla.
        </p>
      </div>

      <div className="flex w-3/4 justify-between space-x-4 items-start">
        <div className="flex flex-col space-y-10">
          <div className="flex justify-start items-center space-x-3">
            <Image
              src="/imgs/pfp.jpg"
              alt="Facility Image"
              width={43}
              height={43}
              className="w-[43px] h-[43px] object-cover rounded-full"
            />
            <div className="flex flex-col justify-start items-start">
              <p className="text-base font-medium">Zoha Alatas</p>
              <p className="text-[#4082E5] text-xs font-medium">
                Member sejak 3 tahun lalu
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-start space-y-3">
            <h2 className="text-[#222020] text-xl font-semibold">
              Fasilitas yang dapat dipakai peminjam :{" "}
            </h2>
            <div className="flex items-center my-1">
              <Image
                src={checkedBoxIcon}
                alt="checkedBox"
                width={24}
                height={24}
              />
              <span className="text-normal text-base ml-3">
                Dapur berukuran 8 x 10 m persegi
              </span>
            </div>
            <div className="flex items-center my-1">
              <Image
                src={checkedBoxIcon}
                alt="checkedBox"
                width={24}
                height={24}
              />
              <span className="text-normal text-base ml-3">
                5 buah Mixer SMEG
              </span>
            </div>
            <div className="flex items-center my-1">
              <Image
                src={checkedBoxIcon}
                alt="checkedBox"
                width={24}
                height={24}
              />
              <span className="text-normal text-base ml-3">
                1 buah Kulkas Panasonic 1000W
              </span>
            </div>
            <div className="flex items-center my-1">
              <Image
                src={checkedBoxIcon}
                alt="checkedBox"
                width={24}
                height={24}
              />
              <span className="text-normal text-base ml-3">
                Bebas biaya pembatalan sebelum 48 jam
              </span>
            </div>
            <div className="flex items-center my-1">
              <Image
                src={checkedBoxIcon}
                alt="checkedBox"
                width={24}
                height={24}
              />
              <span className="text-normal text-base ml-3">
                Listrik ditanggung pihak yang menyewakan
              </span>
            </div>
            <br />
            <button className="flex border-2 border-[#1973F9] w-60 h-11 rounded-[16px] justify-center items-center">
              <p className="text-[#1973F9] text-base font-medium">
                Lihat semua fasilitas
              </p>
            </button>
          </div>
        </div>

        <div className="flex flex-col justify-center items-start">
          <div className="flex flex-col w-96 h-[271px] justify-center items-center rounded-[20px] shadow-2xl space-y-2">
            <h2 className="text-2xl font-semibold">{formatCurrency(250000)}</h2>
            <p className="text-[#353A44] text-base font-normal">
              Total sebelum pajak
            </p>

            <div className="flex w-80 h-16 justify-center items-center">
              <button className="flex flex-col w-full h-full rounded-l-[20px] justify-center items-center border-2 border-[#A7AFC4]">
                <p className="text-[#4082E5] text-xs font-bold">CHECK-IN</p>
                <p className="text-base font-medium">11/07/2024</p>
              </button>
              <button className="flex flex-col w-full h-full rounded-r-[20px] justify-center items-center border-2 border-[#A7AFC4]">
                <p className="text-[#4082E5] text-xs font-bold">CHECK-OUT</p>
                <p className="text-base font-medium">12/07/2024</p>
              </button>
            </div>

            <button className="flex bg-[#1973F9] w-56 h-12 rounded-3xl justify-center items-center">
              <p className="text-[#FFFFFF] text-base font-medium">
                Sewa Tempat Ini
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}