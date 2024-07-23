import Link from "next/link";
import Image from "next/image";

const backIcon = "/icons/miscIcons/backIcon.svg";

interface BackButtonProps {
  href: string;
}

export default function BackButton({ href }: BackButtonProps) {
  return (
    <div className="absolute left-10 top-12">
      <Link href={href}>
        <Image src={backIcon} alt="back" width={15} height={15} />
      </Link>
    </div>
  );
}
