"use client"

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement>{
    placeholder: string,
    path: string   
}

export const SearchInput = ({path, placeholder, ...props}: SearchInputProps) => {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const [searchQuery, setSearchQuery] = useState("")
    const router = useRouter()

    useEffect(() => {
        setSearchQuery(searchParams.get('query') || "")
    }, [searchParams])

    const onSearch = (e: React.FormEvent) => {
        e.preventDefault()
        const encodedSearchQuery = encodeURIComponent(searchQuery)
        let newPath = path.split('/')[1] // This will get 'sewa-tempat' from the path

        router.push(`/${newPath}/search?query=${encodedSearchQuery}`)
    }

    return (
        <form className="pt-1" onSubmit={onSearch}>
            <input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-100 w-full text-[#A7AFC4] font-inter focus:outline-none" 
                type="text" 
                placeholder={placeholder} 
                {...props}
            />
        </form>
    )
}