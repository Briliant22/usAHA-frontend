import React from "react";
import { tv } from "tailwind-variants";
import Image from "next/image";

const filterButtonStyle = tv({
  base: "flex gap-2 w-[10vw] justify-center rounded-full p-2",
  variants: {
    isActive: {
      true: "bg-[#1973F9]",
      false: "",
    },
  },
});

const textButtonStyle = tv({
  base: "",
  variants: {
    isActive: {
      true: "text-white",
      false: "text-[#7C89A8]",
    },
  },
});

interface FilterButtonProps {
  isActive: boolean;
  icon_path: string;
  label: string;
  onClick: () => void;
}

export const FilterButton = ({
  isActive,
  icon_path,
  label,
  onClick,
}: FilterButtonProps) => {
  const imageType = isActive ? "White" : "";
  return (
    <button className={filterButtonStyle({ isActive })} onClick={onClick}>
      <Image
        src={icon_path + imageType + ".svg"}
        alt={label}
        width={21}
        height={21}
      />
      <p className={textButtonStyle({ isActive })}>{label}</p>
    </button>
  );
};
