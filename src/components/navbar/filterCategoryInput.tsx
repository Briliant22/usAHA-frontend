"use client";

import React, { useCallback } from 'react'
import { FilterButton } from '../isomorphic/filterButton'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface Category {
  label: string;
  icon: string;
  value: string;
}

interface FilterCategoryInputProps extends React.HTMLAttributes<HTMLDivElement> {
  categories?: Category[]
}

export const FilterCategoryInput = ({categories = []}: FilterCategoryInputProps) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const activeCategory = searchParams.get('query') || ''
    
    const handleCategoryClick = useCallback((category: string) => {
      const params = new URLSearchParams(searchParams)
      const basePathname = pathname.split('/category')[0] // Get the base pathname

      if (category === activeCategory) {
        router.push(basePathname)
      } else {
        params.set('query', category)
        router.push(`${basePathname}/category?${params.toString()}`)
      }
    }, [router, searchParams, pathname, activeCategory])

    return (
      <div className="w-full border rounded-full flex py-1 px-2 justify-between">
        {categories.map((category) => (
          <FilterButton 
            key={category.value}
            isActive={activeCategory === category.value}
            icon_path={`/icons/filterIcons/${category.icon}`}
            label={category.label}
            onClick={() => handleCategoryClick(category.value)}
          />
        ))}
      </div>
    )
}