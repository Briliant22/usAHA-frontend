import Link from "next/link";
import Image from "next/image";
import { tv } from "tailwind-variants";

const backIcon = "/icons/miscIcons/backIcon.svg";

interface BackButtonProps {
  href: string;
}

export default function BackButton({ href }: BackButtonProps) {
  return (
    <div className="absolute left-10 top-12">
      <Link
        href={href}
        className="flex h-[60px] w-[60px] items-center justify-center rounded-full hover:bg-gray-100 active:bg-[#97BCF2]"
      >
        <Image src={backIcon} alt="back" width={15} height={15} />
      </Link>
    </div>
  );
}
