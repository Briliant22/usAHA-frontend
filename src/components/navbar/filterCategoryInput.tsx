"use client";

import React from "react";
import { FilterButton } from "../isomorphic/filterButton";

interface Filter {
  label: string;
  icon: string;
  value: "kitchen" | "art studio" | "workshop" | "others" | null;
}

const categories: Filter[] = [
  { label: "All", icon: "search", value: null },
  { label: "Kitchen", icon: "kitchen", value: "kitchen" },
  { label: "Art Studio", icon: "artStudio", value: "art studio" },
  { label: "Workshop", icon: "workshop", value: "workshop" },
  { label: "Others", icon: "others", value: "others" },
];

interface FilterCategoryInputProps {
  setCategory: (
    category: "kitchen" | "art studio" | "workshop" | "others" | null,
  ) => void;
  activeCategory: "kitchen" | "art studio" | "workshop" | "others" | null;
}

export default function FilterCategoryInput({
  setCategory,
  activeCategory,
}: FilterCategoryInputProps) {
  return (
    <div className="flex h-[50px] w-full justify-between rounded-full border p-1">
      {categories.map((category) => (
        <FilterButton
          key={category.label}
          isActive={activeCategory === category.value}
          icon_path={`/icons/filterIcons/${category.icon}`}
          label={category.label}
          onClick={() => setCategory(category.value)}
        />
      ))}
    </div>
  );
}
