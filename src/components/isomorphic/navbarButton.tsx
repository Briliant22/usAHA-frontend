import React from "react";
import { tv } from "tailwind-variants";

const navbarButtonStyle = tv({
  base: "aspect-square w-full mx-auto flex flex-col justify-center text-center text-white items-center hover:bg-[#97BCF2]",
  variants: {
    isActive: {
      true: "underline font-bold",
      false: "font-semibold",
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
      <p className="w-14 text-[12px]">{label}</p>
    </button>
  );
};
