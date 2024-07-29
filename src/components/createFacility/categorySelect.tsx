import { ReactNode } from "react";
import { tv } from "tailwind-variants";
import Image from "next/image";

const categorySelectStyle = tv({
  base: "m-2 flex space-x-2 py-2 px-4 items-center justify-center rounded-[16px] border hover:bg-[#97BCF2]",
  variants: {
    isActive: {
      true: "border-[#1973F9] text-[#1973F9]",
      false: "border-[#7C89A8] text-[#7C89A8]",
    },
  },
});

interface CategorySelectProps {
  children: ReactNode;
  icon: string;
  isActive: boolean;
  onClick?: () => void;
}

export default function CategorySelect({
  children,
  icon,
  isActive,
  onClick,
}: CategorySelectProps) {
  return (
    <button onClick={onClick} className={categorySelectStyle({ isActive })}>
      <Image
        src={isActive ? `/icons/filterIcons/${icon}Active.svg` : `/icons/filterIcons/${icon}.svg`}
        alt={icon}
        className="h-[27px] w-[27px] object-cover"
        width={27}
        height={27}
      />
      <p className="text-[14px] font-semibold">{children}</p>
    </button>
  );
}
