import React from "react";
import ToolCard from "@/components/tools/toolCard";

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

const getTools = async (url: string) => {
  const response = await fetch(url, {
    cache: "no-store",
  });
  const data: ToolResponse[] = await response.json();
  return data;
};

export default async function Page() {
  const tools = await getTools(`${process.env.NEXT_PUBLIC_API_URL}/tools/`);

  return (
    <div className="flex w-full flex-col">
      <div className="flex-grow p-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
          {tools.map((tool) => (
            <ToolCard key={tool.uuid} {...tool} />
          ))}
        </div>
      </div>
    </div>
  );
}
