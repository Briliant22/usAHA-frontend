import React from 'react'
import Image from "next/image"
import ToolCard from '@/components/tools/toolCard';
import { FilterCategoryInput } from '@/components/navbar/filterCategoryInput';


interface ToolResponse {
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

const categories = [
  { label: "Cooking", icon: "cooking", value:"Cooking"},
  { label: "Cleaning", icon: "cleaning", value:"Cleaning"},
  { label: "Textile", icon: "textile", value:"Textile"},
  { label: "Automotive", icon: "automotive", value:"Automotive"},
  { label: "Furniture", icon: "furniture", value:"Furniture"},
  { label: "Others", icon: "others", value:"Others"},
];

const getTools = async (url: string) => {
  const response = await fetch(url,{
    cache: "no-store"
  })
  const data: ToolResponse[] = await response.json()
  return data
}

export default async function Page() {
  const tools= await getTools('http://localhost:8000/tools/')
  
  return (
    <div className="flex flex-col w-full">
      <FilterCategoryInput categories={categories}/>
      <div className="flex-grow p-4">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
          {tools.map((tool) => (
            <ToolCard key={tool.uuid} {...tool}/>
          ))}
        </div>
      </div>
    </div>
  )
}
