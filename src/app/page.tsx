import Footer from "@/components/footer";
import { NavbarAtas } from "@/components/navbar/navbarAtas";
import { NavbarHome } from "@/components/navbar/navbarHome";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col w-full min-h-screen items-center">
      <NavbarHome />
      <div className="px-20 flex w-full justify-evenly h-[80vh] bg-gradient-to-t from-[#8BB5F3] via-[#CADEFD] to-[#FFFFFF]">
        <div className="flex flex-col w-1/3 h-full justify-center items-start space-y-6">
          <h1 className="text-[#1973F9] text-[48px] font-bold -mb-12">Halo,</h1>
          <h2 className="text-[#FED365] text-[64px] font-bold">
            Pemilik Bisnis.
          </h2>
          <p className="text-[20px]">
            Buat perubahan untuk bisnis Anda dengan bergabung di{" "}
            <span className="font-bold">usAHA!</span> Rasakan kemudahan memiliki
            ruang siap sewa dan membeli barang bekas berkualitas, siap untuk
            memenuhi kebutuhan bisnis Anda!
          </p>
          <button className="flex bg-[#1973F9] w-56 h-12 rounded-3xl justify-center items-center">
            <p className="text-[#FFFFFF] text-base font-medium">
              Mulai Bereksplorasi
            </p>
          </button>
        </div>
        <div className="flex flex-col w-2/4 h-full justify-center items-end space-y-6 pb-14">
          <Image
            className="mt-3"
            src="/icons/miscIcons/biglb.svg"
            alt="logo"
            width={600}
            height={500}
          />
        </div>
      </div>
      <div className="px-20 flex w-full justify-evenly h-[80vh] bg-gradient-to-t from-[#1973F9] to-[#7FA7DB]"></div>
      <div className="px-20 flex w-full justify-evenly h-[100vh] bg-[#FFFFFF]"></div>
      <Footer />
    </div>
  );
}
