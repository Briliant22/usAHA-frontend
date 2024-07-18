"use client";

import React from 'react'
import { FilterButton } from '../isomorphic/filterButton'
import { useRouter, useSearchParams } from 'next/navigation'

const categories = [
  { label: "Kitchen", icon: "kitchen", value:"kitchen"},
  { label: "Art Studio", icon: "artStudio", value:"art studio"},
  { label: "Workshop", icon: "workshop", value:"workshop"},
  { label: "Others", icon: "others", value:"others"},
];

export const FilterCategoryInput = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const activeCategory = searchParams.get('query') || ''

    const handleCategoryClick = (category: string) => {
      const query = category === activeCategory ? '' : category
      router.push(`/sewa-tempat/category?query=${query}`)
    }

    return (
      <div className="w-full border rounded-full flex py-1 px-2 justify-between">
        {categories.map((category) => (
          <FilterButton 
            key={category.label}
            isActive={activeCategory === category.label}
            icon_path={`/icons/filterIcons/${category.icon}`}
            label={category.label}
            onClick={() => handleCategoryClick(category.value)}
          />
        ))}
      </div>
    )
}