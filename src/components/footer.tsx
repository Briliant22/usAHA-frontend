import Image from "next/image";

function Footer() {
  return (
    <div className="flex flex-col w-full h-[298px] bg-[#E1ECFC] justify-center px-20 py-10">
      <div className="flex justify-between space-x-10">
        <div className="flex flex-col h-40 justify-start w-3/6">
          <Image
            className="mt-3"
            src="/usahaLogo.svg"
            alt="logo"
            width={200}
            height={46}
          />
          <p className="py-3 text-[#1973F9] text-xs font-medium">
          usAHA! adalah platform untuk meningkatkan usaha kecil menengah di Indonesia yang dikenal sebagai UMKM. usAHA! hadir untuk memberikan solusi kreatif bagi UMKM dengan menyediakan kesempatan untuk memulai karir mereka melalui fitur seperti Sewa Ruang dan Jual Beli Alat. Dengan usAHA!, UMKM menghadirkan cara baru untuk berkembang dan menjadi solusi bagi bisnis modern.
          </p>
          <div className="flex w-32 my-3 justify-between">
            <div className="flex bg-[#4082E5] w-8 h-8 rounded  justify-center items-center">
              <Image
                src="/icons/socmedIcons/twitter.svg"
                alt="Twitter"
                width={24}
                height={24}
              />
            </div>
            <div className="flex bg-[#4082E5] w-8 h-8 rounded  justify-center items-center">
              <Image
                src="/icons/socmedIcons/instagram.svg"
                alt="Instagram"
                width={24}
                height={24}
              />
            </div>
            <div className="flex bg-[#4082E5] w-8 h-8 roundedjustify-center items-center">
              <Image
                src="/icons/socmedIcons/linkedIn.svg"
                alt="LinkedIn"
                width={24}
                height={24}
              />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-b from-[#FED365] to-[#1973F9] w-[1px] h-full ">
        </div>

        <div className="flex h-40 justify-around w-2/6">
          <div className="flex flex-col justify-between">
            <p className="my-3 text-[#4082E5] text-base font-bold">Menu</p>
            <p className="my-1 text-[#709EE3] text-xs font-semibold">
              Sewa Tempat
            </p>
            <p className="my-1 text-[#709EE3] text-xs font-semibold">Menu</p>
            <p className="my-1 text-[#709EE3] text-xs font-semibold">
              Jual Beli Alat
            </p>
            <p className="my-1 text-[#709EE3] text-xs font-semibold">
              Forum Pekerjaan
            </p>
            <p className="my-1 text-[#709EE3] text-xs font-semibold">
              Konfigurasi Akun
            </p>
          </div>
          <div className="flex flex-col justify-between">
            <p className="my-3 text-[#4082E5] text-base font-bold">Company</p>
            <p className="my-1 text-[#709EE3] text-xs font-semibold">
              About Us
            </p>
            <p className="my-1 text-[#709EE3] text-xs font-semibold">Menu</p>
            <p className="my-1 text-[#709EE3] text-xs font-semibold">
              Contact Us
            </p>
            <p className="my-1 text-[#709EE3] text-xs font-semibold">
              Help Center
            </p>
            <p className="my-1 text-[#709EE3] text-xs font-semibold">Careers</p>
          </div>
        </div>

        <div className="bg-gradient-to-b from-[#FED365] to-[#1973F9] w-[1px] h-full ">
        </div>

        <div className="flex flex-col w-1/6 h-40 justify-between">
          <p className="mt-3 text-[#4082E5] text-base font-bold underline">
            Contact Us
          </p>
          <div className="flex bg-[#4082E5] h-14 space-x-4 rounded-xl justify-center items-center w-full">
            <Image
              src="/icons/socmedIcons/email.svg"
              alt="email"
              width={24}
              height={24}
            />
            <div className="flex flex-col justify-between">
              <p className="text-[#C0C7D9] text-[10px]">E-mail Address :</p>
              <p className="text-[#FEFCFC] text-xs font-semibold">
                E-mail Address
              </p>
            </div>
          </div>
          <div className="flex bg-[#4082E5] h-14 space-x-4 rounded-xl justify-center items-center w-full">
            <Image
              src="/icons/socmedIcons/phone.svg"
              alt="phone"
              width={24}
              height={24}
            />
            <div className="flex flex-col justify-between">
              <p className="text-[#C0C7D9] text-[10px]">Phone Number :</p>
              <p className="text-[#FEFCFC] text-xs font-semibold">021-123456</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-16 flex justify-center items-center space-x-1">
        <p className="text-[#8396b0] text-xs font-base">Copyright</p>
        <Image
          src="/icons/miscIcons/copyright.svg"
          alt="reviewStar"
          width={20}
          height={20}
        />
        <p className="text-[#8396b0] text-xs font-base">
          2024 usAHA! | All Rights Reserved
        </p>
      </div>
    </div>
  );
}

export default Footer;