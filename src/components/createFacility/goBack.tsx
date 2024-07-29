import Image from "next/image";

const backIcon = "/icons/miscIcons/backIcon.svg";

interface GoBackProps {
  onClick: () => void;
}

export default function GoBack({ onClick }: GoBackProps) {
  return (
    <button
      onClick={onClick}
      className="absolute left-10 top-12 flex h-[60px] w-[60px] items-center justify-center rounded-full hover:bg-gray-100 active:bg-[#97BCF2]"
    >
      <Image src={backIcon} alt="back" width={15} height={15} />
    </button>
  );
}
