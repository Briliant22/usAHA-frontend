"use client"

import React, { useState } from 'react'
import Image from "next/image";
import { FilterButton } from '@/components/isomorphic/filterButton';
import { CategoryButton } from '@/components/isomorphic/categoryButton';

const categories = [
    { label: "Kitchen", icon: "kitchen" },
    { label: "Art Studio", icon: "artStudio" },
    { label: "Workshop", icon: "workshop" },
    { label: "Others", icon: "others" },
  ];

export default function Page() {
    const [price, setPrice] = useState(250000); 
    const step = 10000;

    const increasePrice = () => {
        setPrice(prevPrice => prevPrice + step);
    };

    const decreasePrice = () => {
        setPrice(prevPrice => Math.max(0, prevPrice - step)); 
    };

    const formattedPrice = price.toLocaleString('id-ID');

    const [category, setCategory] = React.useState('')  

    const handleCategoryClick = (category: string) => {
        setCategory(category)
        console.log(category)
    }
  return (
    <div>
        <div className="flex justify-between pb-10">
            <Image 
                    src="/icons/miscIcons/backIcon.svg"
                    alt="back"
                    width={15}
                    height={15}
            />
            <p className="text-4xl text-[#4082E5] font-inter underline font-semibold">Sewakan Properti Saya</p>
            <button>Lanjut</button>
        </div>
        <div className="flex flex-col justify-center items-center pb-10">
            <p className="font-semibold font-inter text-xl">Pilih jenis properti yang akan Anda sewakan</p>
            <div className="flex justify-center items-center w-full">
                {categories.map((categoryData, index) => (
                    <div key={index}>
                        <CategoryButton 
                            key={categoryData.label}
                            isActive={category === categoryData.label}
                            icon_path={`/icons/filterIcons/${categoryData.icon}`}
                            label={categoryData.label}
                            className=""
                            onClick={() => handleCategoryClick(categoryData.label)}
                        />
                    </div>
                ))}
            </div>  
        </div>
        <div className="w-full flex flex-col justify-center items-center gap-6 pb-12">
            <p className="font-semibold font-inter text-xl">Tulis alamat lengkap dari properti Anda</p>
            <div className="flex flex-col gap-5">
                <input className="border-2 border-[#979DBD] py-2 px-4 w-full rounded-xl" type="text" placeholder="Nama Jalan" />
                <input className="border-[#979DBD] border-2 py-2 px-4 w-full rounded-xl" type="text" placeholder="Nomor rumah atau apartemen" />
                <div className="flex">
                    <input className="w-1/2 py-2 px-4 border-2 border-[#979DBD] rounded-l-xl" type="text" placeholder="Kelurahan" />
                    <input className="w-1/2 py-2 px-4 border-2 border-[#979DBD] rounded-r-xl" type="text" placeholder="Kecamatan" />
                </div>
                <input className="border-[#979DBD] border-2 py-2 px-4 w-full rounded-xl" type="text" placeholder="Provinsi" />
                <div className="flex">
                    <input className="w-1/2 py-2 px-4 border-2 border-[#979DBD] rounded-l-xl" type="text" placeholder="Kota" />
                    <input className="w-1/2 py-2 px-4 border-2 border-[#979DBD] rounded-r-xl" type="text" placeholder="Kode Pos" />
                </div>
            </div>
        </div>
        <div className="w-full flex flex-col justify-center items-center gap-6 pb-12">
            <p className="font-semibold font-inter text-xl">Berikan deskripsi singkat atas properti Anda</p>
            <textarea className="border-2 border-[#979DBD] py-2 px-4 w-1/2 rounded-xl" placeholder="Deskripsi" />
        </div>
        <div className="w-full flex flex-col justify-center items-center gap-6 pb-12">
            <p className="font-semibold font-inter text-xl">Lengkapi foto properti Anda</p>
            <div className="flex items-center justify-center w-1/2">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" />
                </label>
            </div> 
        </div>
        <div className="flex flex-col justify-center items-center gap-6 pb-12">
            <p className="font-semibold font-inter text-xl ">Tulis fasilitas yang ada di properti Anda</p>
            <div className="w-1/3 flex flex-col gap-5">
            <input className="border-2 border-[#979DBD] py-2 px-4  rounded-xl" type="text" placeholder="Fasilitas 1" />
            <input className="border-[#979DBD] border-2 py-2 px-4 rounded-xl" type="text" placeholder="Fasilitas 2" />
            <input className="border-[#979DBD] border-2 py-2 px-4  rounded-xl" type="text" placeholder="Fasilitas 3" />
            </div>
        </div>
        <div className="flex flex-col items-center gap-6 pb-12">
            <h2 className="font-semibold font-inter text-xl">Tentukan harga dari properti Anda</h2>
            <div className="flex items-center border border-slate-400 rounded-full overflow-hidden">
                <button className="px-6 py-4 text-2xl font-bold hover:bg-gray-100" onClick={decreasePrice}>-</button>
                <div className="px-4 py-2 border-l border-r border-slate-400">
                    <div className="text-blue-500 text-sm font-bold font-inter text-center">PRICE</div>
                    <div className="text-black text-2xl font-semibold font-inter">Rp{formattedPrice}</div>
                </div>
                <button className="px-6 py-4 text-2xl font-bold hover:bg-gray-100" onClick={increasePrice} >+</button>
            </div>
        </div>
    </div>
  )
}
