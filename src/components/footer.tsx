import Image from "next/image";

function Footer() {
  return (
    <div className="flex h-[298px] w-full flex-col justify-center bg-[#E1ECFC] px-20 py-10">
      <div className="flex justify-between space-x-10">
        <div className="flex h-40 w-3/6 flex-col justify-start">
          <Image
            className="mt-3"
            src="/usahaLogo.svg"
            alt="logo"
            width={200}
            height={46}
          />
          <p className="py-3 text-xs font-medium text-[#1973F9]">
            usAHA! adalah platform untuk meningkatkan usaha kecil menengah di
            Indonesia yang dikenal sebagai UMKM. usAHA! hadir untuk memberikan
            solusi kreatif bagi UMKM dengan menyediakan kesempatan untuk memulai
            karir mereka melalui fitur seperti Sewa Ruang dan Jual Beli Alat.
            Dengan usAHA!, UMKM menghadirkan cara baru untuk berkembang dan
            menjadi solusi bagi bisnis modern.
          </p>
          <div className="my-3 flex w-32 justify-between">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-[#4082E5]">
              <Image
                src="/icons/socmedIcons/twitter.svg"
                alt="Twitter"
                width={24}
                height={24}
              />
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded bg-[#4082E5]">
              <Image
                src="/icons/socmedIcons/instagram.svg"
                alt="Instagram"
                width={24}
                height={24}
              />
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded bg-[#4082E5]">
              <Image
                src="/icons/socmedIcons/linkedIn.svg"
                alt="LinkedIn"
                width={24}
                height={24}
              />
            </div>
          </div>
        </div>

        <div className="h-full w-[1px] bg-gradient-to-b from-[#FED365] to-[#1973F9]"></div>

        <div className="flex h-40 w-2/6 justify-around">
          <div className="flex flex-col justify-between">
            <p className="my-3 text-base font-bold text-[#4082E5]">Menu</p>
            <p className="my-1 text-xs font-semibold text-[#709EE3]">
              Sewa Tempat
            </p>
            <p className="my-1 text-xs font-semibold text-[#709EE3]">Menu</p>
            <p className="my-1 text-xs font-semibold text-[#709EE3]">
              Jual Beli Alat
            </p>
            <p className="my-1 text-xs font-semibold text-[#709EE3]">
              Forum Pekerjaan
            </p>
            <p className="my-1 text-xs font-semibold text-[#709EE3]">
              Konfigurasi Akun
            </p>
          </div>
          <div className="flex flex-col justify-between">
            <p className="my-3 text-base font-bold text-[#4082E5]">
              Contributors
            </p>
            <a
              href="https://www.linkedin.com/in/muhammad-najmi-briliant-167455218/"
              target="_blank"
              className="my-1 text-xs font-semibold text-[#709EE3]"
            >
              {`Muhammad Najmi Briliant (Full Stack Developer)`}
            </a>
            <a
              href="https://www.linkedin.com/in/nadhira-hafez/"
              target="_blank"
              className="my-1 text-xs font-semibold text-[#709EE3]"
            >
              {`Nadhira Raihana Hafez (Full Stack Developer)`}
            </a>
            <a
              href="https://www.linkedin.com/in/farah-dhiya-ramadhina-4467a3208/"
              target="_blank"
              className="my-1 text-xs font-semibold text-[#709EE3]"
            >
              {`Farah Dhiya Ramadhina (UI/UX Designer)`}
            </a>
            <a
              href="https://www.linkedin.com/in/rizvanu-satrio-nugroho-b8b26720a/"
              target="_blank"
              className="my-1 text-xs font-semibold text-[#709EE3]"
            >
              {`Rizvanu Satrio Nugroho (UI/UX Designer)`}
            </a>
          </div>
        </div>

        <div className="h-full w-[1px] bg-gradient-to-b from-[#FED365] to-[#1973F9]"></div>

        <div className="flex h-40 w-44 flex-col justify-between">
          <p className="mt-3 text-base font-bold text-[#4082E5] underline">
            Contact Us
          </p>
          <div className="flex h-14 w-44 items-center justify-center space-x-4 rounded-xl bg-[#4082E5]">
            <Image
              src="/icons/socmedIcons/email.svg"
              alt="email"
              width={24}
              height={24}
            />
            <div className="flex flex-col justify-between">
              <p className="text-[10px] text-[#C0C7D9]">E-mail Address :</p>
              <p className="text-xs font-semibold text-[#FEFCFC]">
                E-mail Address
              </p>
            </div>
          </div>
          <div className="flex h-14 w-44 items-center justify-center space-x-4 rounded-xl bg-[#4082E5]">
            <Image
              src="/icons/socmedIcons/phone.svg"
              alt="phone"
              width={24}
              height={24}
            />
            <div className="flex flex-col justify-between">
              <p className="text-[10px] text-[#C0C7D9]">Phone Number :</p>
              <p className="text-xs font-semibold text-[#FEFCFC]">021-123456</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-16 flex items-center justify-center space-x-1">
        <p className="font-base text-xs text-[#8396b0]">Copyright</p>
        <Image
          src="/icons/miscIcons/copyright.svg"
          alt="reviewStar"
          width={20}
          height={20}
        />
        <p className="font-base text-xs text-[#8396b0]">
          2024 usAHA! | All Rights Reserved
        </p>
      </div>
    </div>
  );
}

export default Footer;
