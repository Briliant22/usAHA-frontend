import Footer from "@/components/footer";
import NavbarAtas from "@/components/navbar/navbarAtas";
import TextButton from "@/components/textButton";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <NavbarAtas isDashboard={false} />
      <div className="flex h-[80vh] w-full justify-evenly bg-gradient-to-t from-[#8BB5F3] via-[#CADEFD] to-[#FFFFFF] px-20">
        <div className="flex h-full w-1/3 flex-col items-start justify-center space-y-6">
          <h1 className="-mb-12 text-[48px] font-bold text-[#1973F9]">Halo,</h1>
          <h2 className="text-[64px] font-bold text-[#FED365]">
            Pemilik Bisnis.
          </h2>
          <p className="text-[20px]">
            Buat perubahan untuk bisnis Anda dengan bergabung di{" "}
            <span className="font-bold">usAHA!</span> Rasakan kemudahan memiliki
            ruang siap sewa dan membeli barang bekas berkualitas, siap untuk
            memenuhi kebutuhan bisnis Anda!
          </p>
          <Link href={`/sewa-tempat/`}>
            <TextButton
              label="Mulai Bereksplorasi"
              size="large"
              type="primary"
            />
          </Link>
        </div>
        <div className="flex h-full w-2/4 flex-col items-end justify-center space-y-6 pb-14">
          <Image
            className="mt-3"
            src="/icons/miscIcons/biglb.svg"
            alt="logo"
            width={600}
            height={500}
          />
        </div>
      </div>
      <div className="flex h-[80vh] w-full justify-evenly bg-gradient-to-t from-[#1973F9] to-[#7FA7DB] px-20"></div>
      <div className="flex h-[100vh] w-full justify-evenly bg-[#FFFFFF] px-20"></div>
      <Footer />
    </div>
  );
}
