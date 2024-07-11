import FacilityCard from '@/components/facilities/facilityCard';
import Link from 'next/link';
import React from 'react'

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

const getFacility = async (url: string) => {
    const response = await fetch(url,{
      cache: "no-store"
    })
    const data: Facility[] = await response.json()
    return data
  }

export default async function Page() {
    const facilities = await getFacility('http://localhost:8000/facilities/')

  return (
    <div className="flex flex-col h-screen w-full">
      <div className="flex-grow p-4">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
            
            {facilities.map((facility) => (
                <Link href={`/sewa-tempat/details/${facility.uuid}`} key={facility.uuid}>
                    <FacilityCard key={facility.uuid} {...facility} />
                </Link>
          ))}
        </div>
      </div>
    </div>
  )
}