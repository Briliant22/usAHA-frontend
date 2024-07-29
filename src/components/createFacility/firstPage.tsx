import { useState } from "react";
import BackButton from "../backButton";
import TextButton from "../textButton";
import CategorySelect from "./categorySelect";
import parseAddress from "@/utils/parseAdress";

interface FirstPageProps {
  setSecondPage: () => void;
  setName: (name: string) => void;
  name: string;
  setCategory: (
    category: "kitchen" | "art studio" | "workshop" | "others" | null,
  ) => void;
  category: "kitchen" | "art studio" | "workshop" | "others" | null;
  setCity: (city: string) => void;
  city: string;
  setLocationLink: (locationLink: string) => void;
  locationLink: string;
}

export default function FirstPage({
  setSecondPage,
  setName,
  name,
  setCategory,
  category,
  setCity,
  city,
  setLocationLink,
  locationLink,
}: FirstPageProps) {
  const [namaFasilitas, setNamaFasilitas] = useState<string>(name);
  const [activeCategory, setActiveCategory] = useState<
    "kitchen" | "art studio" | "workshop" | "others" | null
  >(category);

  const parsedAddress = parseAddress(locationLink);

  const [namaJalan, setNamaJalan] = useState<string>(parsedAddress.namaJalan);
  const [nomor, setNomor] = useState<string>(parsedAddress.nomor);
  const [kelurahan, setKelurahan] = useState<string>(parsedAddress.kelurahan);
  const [kecamatan, setKecamatan] = useState<string>(parsedAddress.kecamatan);
  const [provinsi, setProvinsi] = useState<string>(parsedAddress.provinsi);
  const [kota, setKota] = useState<string>(parsedAddress.kota);
  const [kodePos, setKodePos] = useState<string>(parsedAddress.kodePos);

  const handleCategoryClick = (
    category: "kitchen" | "art studio" | "workshop" | "others",
  ) => {
    setActiveCategory(category);
  };

  const handleNextPage = () => {
    setName(namaFasilitas);
    setCategory(activeCategory);
    setCity(kota);
    setLocationLink(
      `${namaJalan}, ${nomor}, ${kelurahan}, ${kecamatan}, ${kota}, ${provinsi}, ${kodePos}`,
    );
    setSecondPage();
  };

  return (
    <div className="mb-10 flex w-full flex-col pb-10">
      <BackButton href="/sewa-tempat" />
      <div className="absolute right-10 top-12">
        <TextButton
          label="Lanjut"
          size="small"
          type="secondary"
          onClick={handleNextPage}
        />
      </div>
      <div className="my-8 flex flex-col items-center space-y-4">
        <h2 className="text-[20px] font-semibold">
          Daftarkan nama fasilitas Anda
        </h2>
        <div className="w-1/2 gap-2 rounded-xl border-2 border-[#979DBD] px-4 py-3">
          <input
            className="w-full font-inter text-[#000000]"
            type="text"
            value={namaFasilitas}
            onChange={(e) => setNamaFasilitas(e.target.value)}
            placeholder="Nama Fasilitas"
            required
          />
        </div>
      </div>
      <div className="my-8 flex flex-col items-center space-y-4">
        <h2 className="text-[20px] font-semibold">
          Pilih jenis properti yang akan Anda sewakan
        </h2>
        <div className="flex items-center justify-center space-x-8">
          <CategorySelect
            icon="kitchen"
            isActive={activeCategory === "kitchen"}
            onClick={() => handleCategoryClick("kitchen")}
          >
            Kitchen
          </CategorySelect>
          <CategorySelect
            icon="artStudio"
            isActive={activeCategory === "art studio"}
            onClick={() => handleCategoryClick("art studio")}
          >
            Art Studio
          </CategorySelect>
          <CategorySelect
            icon="workshop"
            isActive={activeCategory === "workshop"}
            onClick={() => handleCategoryClick("workshop")}
          >
            Workshop
          </CategorySelect>
          <CategorySelect
            icon="others"
            isActive={activeCategory === "others"}
            onClick={() => handleCategoryClick("others")}
          >
            Others
          </CategorySelect>
        </div>
      </div>
      <div className="my-8 flex flex-col items-center space-y-4">
        <h2 className="text-[20px] font-semibold">
          Tulis alamat lengkap dari properti Anda
        </h2>
        <div className="flex w-1/2 flex-col items-center gap-3">
          <div className="w-full gap-2 rounded-xl border-2 border-[#979DBD] px-4 py-3">
            <input
              className="w-full font-inter text-[#000000]"
              type="text"
              value={namaJalan}
              onChange={(e) => setNamaJalan(e.target.value)}
              placeholder="Nama Jalan"
              required
            />
          </div>
          <div className="w-full gap-2 rounded-xl border-2 border-[#979DBD] px-4 py-3">
            <input
              className="w-full font-inter text-[#000000]"
              type="text"
              value={nomor}
              onChange={(e) => setNomor(e.target.value)}
              placeholder="Nomor Rumah atau Apartemen"
              required
            />
          </div>
          <div className="flex w-full">
            <div className="w-1/2 rounded-l-xl border-2 border-[#979DBD] px-4 py-3">
              <input
                className="w-full font-inter text-[#000000]"
                type="text"
                value={kelurahan}
                onChange={(e) => setKelurahan(e.target.value)}
                placeholder="Kelurahan"
                required
              />
            </div>
            <div className="w-1/2 rounded-r-xl border-2 border-[#979DBD] px-4 py-3">
              <input
                className="w-full font-inter text-[#000000]"
                type="text"
                value={kecamatan}
                onChange={(e) => setKecamatan(e.target.value)}
                placeholder="Kecamatan"
                required
              />
            </div>
          </div>
          <div className="w-full gap-2 rounded-xl border-2 border-[#979DBD] px-4 py-3">
            <input
              className="w-full font-inter text-[#000000]"
              type="text"
              value={provinsi}
              onChange={(e) => setProvinsi(e.target.value)}
              placeholder="Provinsi"
              required
            />
          </div>
          <div className="flex w-full">
            <div className="w-1/2 rounded-l-xl border-2 border-[#979DBD] px-4 py-3">
              <input
                className="w-full font-inter text-[#000000]"
                type="text"
                value={kota}
                onChange={(e) => setKota(e.target.value)}
                placeholder="Kota"
                required
              />
            </div>
            <div className="w-1/2 rounded-r-xl border-2 border-[#979DBD] px-4 py-3">
              <input
                className="w-full font-inter text-[#000000]"
                type="text"
                value={kodePos}
                onChange={(e) => setKodePos(e.target.value)}
                placeholder="Kode Pos"
                required
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
