import React from "react";
import { tv } from "tailwind-variants";

const navbarButtonStyle = tv({
  base: "aspect-square w-20 mx-auto flex flex-col justify-center items-center pb-1",
  variants: {
    isActive: {
      true: "bg-[#2F6BC5] rounded-[10px]",
      false: "",
    },
  },
});

interface NavbarButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  isActive: boolean;
  icon: React.ReactNode;
  label: string;
}

export const NavbarButton: React.FC<NavbarButtonProps> = ({
  isActive,
  icon,
  label,
  ...props
}) => {
  return (
    <button className={navbarButtonStyle({ isActive })} {...props}>
      <div className="flex h-8 w-8 items-center justify-center">{icon}</div>
      <p className="w-14 text-center font-inter text-xs font-semibold text-white">
        {label}
      </p>
    </button>
  );
};
