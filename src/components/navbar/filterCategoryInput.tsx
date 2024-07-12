"use client";

import React, { useEffect, useState } from 'react'
import { FilterButton } from '../isomorphic/filterButton'
import { useRouter, usePathname } from 'next/navigation'

const categories = [
  { label: "Kitchen", icon: "kitchen" },
  { label: "Art Studio", icon: "artStudio" },
  { label: "Workshop", icon: "workshop" },
  { label: "Others", icon: "others" },
];

export const FilterCategoryInput = () => {
    const router = useRouter()
    const pathname = usePathname()
    const [activeCategory, setActiveCategory] = useState('')

    useEffect(() => {
        const urlSearchParams = new URLSearchParams(window.location.search)
        const query = urlSearchParams.get('query') || ''
        setActiveCategory(query)
    }, [pathname])

    const handleCategoryClick = (category: string) => {
        const query = category === activeCategory ? '' : category
        router.push(`/sewa-tempat/category?query=${query}`)
        setActiveCategory(query)
    }

    return (
        <div className="w-full border rounded-full flex py-1 px-2 justify-between">
            {categories.map((category) => (
                <FilterButton 
                    key={category.label}
                    isActive={activeCategory === category.label}
                    icon_path={`/icons/filterIcons/${category.icon}`}
                    label={category.label}
                    onClick={() => handleCategoryClick(category.label)}
                />
            ))}
        </div>
    )
}
