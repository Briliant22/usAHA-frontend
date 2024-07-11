"use client"
import React from 'react'
import { useSearchParams } from 'next/navigation'
import useSWR from 'swr'
import ToolCard from '@/components/tools/toolCard';

interface ToolProps {
    uuid: string;
    name: string;
    description: string;
    price_per_unit: number;
    location_link: string;
    stock: number;
    user_id: string;
    category: string[];
    images: ImageProps[];
  }
  
  interface ImageProps {
      uuid: string;
      image: string;
      is_primary: boolean;
      tool: string;
    }

type ToolResponse = ToolProps[];

const getSearchResults = async (url: string) => {
    const response = await fetch(url)
    const data: ToolResponse = await response.json()
    return data

}

export default function Page() {
    const searchParams = useSearchParams()
    const searchQuery = searchParams.get('query') || ""
    const encodedSerachQuery = encodeURI(searchQuery)
    const {data, isLoading} = useSWR(`http://localhost:8000/tools/?search=${encodedSerachQuery}`, getSearchResults)

    if (isLoading) return <div>Loading...</div>
    if (!data || data.length === 0) return <div>No facilities found</div>
    
return (
    <div className="flex flex-col h-screen w-full">
        <div className="flex-grow p-4">
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 2xl:grid-cols-4 gap-4">
            {data.map((tool) => (
                        <ToolCard key={tool.uuid} {...tool} />
                    ))}
            </div>
        </div>
    </div>
)
}
