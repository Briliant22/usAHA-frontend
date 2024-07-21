"use client";

import React, { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { formatCurrency } from "@/utils/formatCurrency";

interface FacilityTransactionProps {
  uuid: string;
  duration: number;
  price_per_day: number;
}

export default function SewaTempatInput({
  uuid,
  duration,
  price_per_day,
}: FacilityTransactionProps) {
  const router = useRouter();
  const paymentAmount = duration * price_per_day;

  const [paymentMethod, setPaymentMethod] = useState<"credit" | "debit">(
    "credit",
  );

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setPaymentMethod(event.target.value as "credit" | "debit");
    console.log(paymentMethod);
  };

  const [cardNumber, setCardNumber] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvv, setCvv] = useState("");
  const [streetName, setStreetName] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const handleSubmit = async () => {
    console.log(uuid)
    console.log(paymentMethod)
    const response = await fetch("http://localhost:8000/payments/create/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        booking: uuid,
        method: paymentMethod,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      router.push(`/sewa-tempat/`);
    } else {
      console.error("Failed to complete payment");
    }
  };

  return (
    <div className="flex h-fit w-[1/2] min-w-fit flex-col items-center gap-8 rounded-xl px-8 py-10 pb-16 shadow-lg">
      <div className="flex flex-col items-center">
        <p className="font-inter text-xl font-semibold text-[#4082E5]">
          Your Total(IDR)
        </p>
        <p className="font-inter text-2xl font-semibold">
          {formatCurrency(paymentAmount)}
        </p>
        <p className="font-inter">{duration} days</p>
      </div>
      <div className="flex w-full gap-3 rounded-xl border px-7 py-3 shadow-lg">
        <div className="flex gap-1">
          <Image
            src="/icons/bankIcons/visa.svg"
            alt="visa logo"
            width={60}
            height={19}
          />
          <Image
            src="/icons/bankIcons/mastercard.svg"
            alt="visa logo"
            width={35}
            height={27}
          />
          <Image
            src="/icons/bankIcons/maestro.svg"
            alt="visa logo"
            width={31}
            height={24}
          />
          <Image
            src="/icons/bankIcons/amex.svg"
            alt="visa logo"
            width={22}
            height={21}
          />
        </div>
        <select
          className="border-none bg-transparent font-inter font-bold text-[#4082E5] focus:outline-none"
          value={paymentMethod}
          onChange={handleSelectChange}
        >
          <option value="credit">Credit Card</option>
          <option value="debit">Debit Card</option>
        </select>
      </div>
      <div className="flex w-full flex-col items-center gap-3">
        <p className="text-xl font-semibold text-[#979DBD]">
          Isi Detail Pembayaran
        </p>
        <div className="flex w-full gap-2 rounded-xl border-2 border-[#979DBD] px-4 py-3">
          <Image
            src="/icons/miscIcons/card.svg"
            alt="card logo"
            width={25}
            height={20}
          />
          <div className="flex w-full flex-col">
            <label className="font-inter text-xs text-[#979DBD]">
              Card number
            </label>
            <input
              className="font-inter text-[#000000]"
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="0000 0000 0000 0000"
            />
          </div>
        </div>
        <div className="flex w-full">
          <div className="w-1/2 rounded-l-xl border-2 border-[#979DBD] px-4 py-3">
            <label className="text-xs text-[#979DBD]">Expiration</label>
            <input
              className="w-full text-[#000000]"
              type="text"
              value={expiration}
              onChange={(e) => setExpiration(e.target.value)}
              placeholder="MM/YY"
            />
          </div>
          <div className="w-1/2 rounded-r-xl border-2 border-[#979DBD] px-4 py-3">
            <label className="text-xs text-[#979DBD]">CVV</label>
            <input
              className="w-full text-[#000000]"
              type="text"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              placeholder="XXXX"
            />
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col items-center gap-3">
        <p className="text-xl font-semibold text-[#979DBD]">Alamat Penagihan</p>
        <div className="w-full gap-2 rounded-xl border-2 border-[#979DBD] px-4 py-3">
          <label className="font-inter text-[#979DBD]">Nama Jalan</label>
          <input
            className="w-full font-inter text-[#000000]"
            type="text"
            value={streetName}
            onChange={(e) => setStreetName(e.target.value)}
            placeholder="Nama Jalan"
          />
        </div>
        <div className="w-full gap-2 rounded-xl border-2 border-[#979DBD] px-4 py-3">
          <label className="font-inter text-[#979DBD]">
            Nomor rumah atau apartemen
          </label>
          <input
            className="w-full font-inter text-[#000000]"
            type="text"
            value={houseNumber}
            onChange={(e) => setHouseNumber(e.target.value)}
            placeholder="Nomor rumah atau apartemen"
          />
        </div>
        <div className="w-full gap-2 rounded-xl border-2 border-[#979DBD] px-4 py-3">
          <label className="font-inter text-[#979DBD]">Provinsi</label>
          <input
            className="w-full font-inter text-[#000000]"
            type="text"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            placeholder="Provinsi"
          />
        </div>
        <div className="flex w-full">
          <div className="w-1/2 rounded-l-xl border-2 border-[#979DBD] px-4 py-3">
            <label className="font-inter text-[#979DBD]">Kota</label>
            <input
              className="w-full font-inter text-[#000000]"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Kota"
            />
          </div>
          <div className="w-1/2 rounded-r-xl border-2 border-[#979DBD] px-4 py-3">
            <label className="font-inter text-[#979DBD]">Kode Pos</label>
            <input
              className="w-full font-inter text-[#000000]"
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder="Kode Pos"
            />
          </div>
        </div>
      </div>
      <button
        className="rounded-full bg-gradient-to-r from-[#275EB0] to-[#1973F9] px-12 py-4"
        onClick={handleSubmit}
      >
        <p className="font-inter text-white">Sewa Tempat Ini</p>
      </button>
    </div>
  );
}
