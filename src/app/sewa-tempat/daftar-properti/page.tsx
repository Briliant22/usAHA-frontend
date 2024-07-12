"use client"

import React from 'react'
import Image from "next/image";
import { FilterButton } from '@/components/isomorphic/filterButton';

const categories = [
    { label: "Kitchen", icon: "kitchen" },
    { label: "Art Studio", icon: "artStudio" },
    { label: "Workshop", icon: "workshop" },
    { label: "Others", icon: "others" },
  ];

export default function Page() {
    const [category, setCategory] = React.useState('')  

    const handleCategoryClick = (category: string) => {
        setCategory(category)
        console.log(category)
    }
  return (
    <div>
        <div className="flex justify-between">
            <Image 
                    src="/icons/miscIcons/backIcon.svg"
                    alt="back"
                    width={15}
                    height={15}
            />
            <p>Sewakan Properti Saya</p>
            <button>Lanjut</button>
        </div>
        <div>
            <p>Pilih jenis properti yang akan Anda sewakan</p>
            <div>
                {categories.map((categoryData) => (
                    <FilterButton 
                        key={categoryData.label}
                        isActive={category === categoryData.label}
                        icon_path={`/icons/filterIcons/${categoryData.icon}`}
                        label={categoryData.label}
                        onClick={() => handleCategoryClick(categoryData.label)}
                    />
                ))}
            </div>

            
        </div>
    </div>
  )
}
