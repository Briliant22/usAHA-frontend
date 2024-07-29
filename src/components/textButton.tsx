import { tv } from "tailwind-variants";

const textButtonStyle = tv({
  base: "flex h-[50px] items-center justify-center rounded-[25px] m-2",
  variants: {
    size: {
      small: "w-[150px]",
      large: "w-[224px]",
    },
    type: {
      primary: "text-[#FFFFFF] bg-[#1973F9] hover:bg-[#97BCF2]",
      secondary: "text-[#1973F9] border border-[#1973F9] hover:bg-[#97BCF2]",
      negative: "text-[#FFFFFF] bg-red-600 hover:bg-red-400",
    },
  },
});

interface TextButtonProps {
  label: string;
  size: "small" | "large";
  type: "primary" | "secondary" | "negative";
  onClick?: () => void;
}

export default function TextButton({
  label,
  size,
  type,
  onClick,
}: TextButtonProps) {
  return (
    <button onClick={onClick} className={textButtonStyle({ size, type })}>
      <p className="text-[14px] font-semibold">{label}</p>
    </button>
  );
}
