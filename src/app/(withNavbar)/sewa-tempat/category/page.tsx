"use client"
import React from 'react'
import { useSearchParams } from 'next/navigation'
import useSWR from 'swr'
import FacilityCard from '@/components/facilities/facilityCard';
import Link from 'next/link';
    

interface FacilityImage {
    uuid: string;
    facility: string;
    image: string;
    is_primary: boolean;
  }

interface Facility {
    uuid: string;
    owner: string;
    owner_username: string;
    name: string;
    category: string;
    description: string;
    city: string;
    location_link: string;
    price_per_day: number;
    created_at: string;
    updated_at: string;
    amenities: string[];
    images: FacilityImage[];
  }

type FacilityResponse = Facility[];

const getSearchResults = async (url: string) => {
    const response = await fetch(url, {
        method: 'GET',
    })
    const data: FacilityResponse = await response.json()
    return data

}

export default function Page() {
    const searchParams = useSearchParams()
    const searchQuery = searchParams.get('query') || ""
    const encodedSerachQuery = encodeURI(searchQuery)
    const {data, isLoading} = useSWR(`http://localhost:8000/facilities/?category=${encodedSerachQuery}`, getSearchResults)

    if (isLoading) return <div>Loading...</div>
    if (!data || data.length === 0) return <div>No facilities found</div>
    
return (
    <div className="flex flex-col h-screen w-full">
        <div className="flex-grow p-4">
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 2xl:grid-cols-4 gap-4">
            {data.map((facility) => (
                <Link
                href={`/sewa-tempat/details/${facility.uuid}`}
                key={facility.uuid}
                >
                    <FacilityCard key={facility.uuid} {...facility} />
                </Link>   
            ))}
            </div>
        </div>
    </div>
)
}
