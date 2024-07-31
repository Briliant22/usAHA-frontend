import { useState } from "react";
import BackButton from "../backButton";
import TextButton from "../textButton";
import CategorySelect from "../createFacility/categorySelect";
import parseAddress from "@/utils/parseAdress";

interface FirstPageUpdateProps {
  setSecondPage: () => void;
  uuid: string;
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
  setDescription: (description: string) => void;
  description: string;
  setPricePerDay: (price_per_day: number) => void;
  price_per_day: number;
}

export default function FirstPageUpdate({
  setSecondPage,
  uuid,
  setName,
  name,
  setCategory,
  category,
  setCity,
  city,
  setLocationLink,
  locationLink,
  setDescription,
  description,
  setPricePerDay,
  price_per_day,
}: FirstPageUpdateProps) {
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
  const [deskripsi, setDeskripsi] = useState<string>(description);
  const [facilityPrice, setFacilityPrice] = useState<string>(
    (price_per_day || 0).toString(),
  );

  const handleCategoryClick = (
    category: "kitchen" | "art studio" | "workshop" | "others",
  ) => {
    setActiveCategory(category);
  };

  const handlePrice = (price: string) => {
    const reformattedPrice = price.replace(/[^0-9]/g, "");
    const numericValue = parseFloat(reformattedPrice);
    if (!isNaN(numericValue)) {
      setPricePerDay(numericValue);
    } else {
      setPricePerDay(0);
    }
  };

  const handleNextPage = () => {
    const addressFields = [
      namaJalan,
      nomor,
      kelurahan,
      kecamatan,
      provinsi,
      kota,
      kodePos,
    ];

    const isAnyFieldEmpty = addressFields.some((field) => field === "");

    setName(namaFasilitas);
    setCategory(activeCategory);
    setCity(kota);

    if (isAnyFieldEmpty) {
      setLocationLink("");
    } else {
      setLocationLink(
        `${namaJalan}, ${nomor}, ${kelurahan}, ${kecamatan}, ${kota}, ${provinsi}, ${kodePos}`,
      );
    }

    setDescription(deskripsi);
    handlePrice(facilityPrice);

    setSecondPage();
  };

  return (
    <div className="mb-10 flex w-full flex-col pb-10">
      <BackButton href={`/listing/${uuid}`} />
      <div className="absolute right-10 top-12">
        <TextButton
          label="Lanjut"
          size="small"
          type="secondary"
          onClick={handleNextPage}
        />
      </div>
      <div className="my-8 flex flex-col items-center space-y-4">
        <h2 className="text-[20px] font-semibold">Nama Fasilitas</h2>
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
        <h2 className="text-[20px] font-semibold">Jenis Fasilitas</h2>
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
        <h2 className="text-[20px] font-semibold">Alamat Properti</h2>
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
      <div className="my-8 flex flex-col items-center space-y-4">
        <h2 className="text-[20px] font-semibold">Deskripsi Fasilitas</h2>
        <div className="flex w-1/2 flex-col items-center"></div>
        <div className="h-[15vw] w-[45vw] gap-2 rounded-[24px] border border-[#979DBD]">
          <textarea
            className="h-full w-full rounded-[24px] px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#1973F9]"
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            placeholder="Tulis deskripsi..."
            required
          />
        </div>
      </div>
      <div className="my-8 flex flex-col items-center space-y-4">
        <h2 className="text-[20px] font-semibold">
          Tentukan harga dari properti Anda
        </h2>
        <div className="my-2 flex h-[68px] w-1/4 items-center justify-evenly rounded rounded-[20px] border-2 border-[#979DBD]">
          <div className="mx-2 flex flex-col items-center justify-center">
            <p className="text-[14px] font-bold text-[#4082E5]">PRICE</p>
            <input
              className="flex w-full text-center font-inter text-[24px] text-[#000000]"
              type="text"
              value={facilityPrice}
              onChange={(e) => setFacilityPrice(e.target.value)}
              required
            />
          </div>
        </div>
        <p className="text-[18px] font-normal">Per malam sebelum pajak</p>
      </div>
    </div>
  );
}
