"use client";

import React, { useState } from "react";
import Image from "next/image";

interface FacilityBooking {
  uuid: string;
  facility: string;
  booker: string;
  start_date: string;
  end_date: string;
  duration: string;
  notes: string;
  is_approved: boolean;
  is_paid: boolean;
}

export const SewaTempatInput = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvv, setCvv] = useState("");
  const [streetName, setStreetName] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const handleSubmit = () => {
    console.log({
      cardNumber,
      expiration,
      cvv,
      streetName,
      houseNumber,
      province,
      city,
      postalCode,
    });
  };

  return (
    <div className="w-[585px] shadow-lg rounded-xl flex flex-col items-center py-10 pb-16 px-8 h-fit gap-8">
      <div className="flex flex-col items-center">
        <p className="font-inter text-xl font-semibold text-[#4082E5]">
          Your Total(IDR)
        </p>
        <p className="font-inter text-2xl font-semibold">Rp1.000.000,00</p>
        <p className="font-inter">2 days</p>
      </div>
      <div className="flex border rounded-xl py-3 gap-3 px-7 w-full shadow-lg">
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
        <p className="font-inter font-bold text-[#4082E5]">Debit/Credit Card</p>
      </div>
      <div className="w-full flex flex-col items-center gap-3">
        <p className="font-semibold text-[#979DBD] text-xl">
          Isi Detail Pembayaran
        </p>
        <div className="flex gap-2 border-2 border-[#979DBD] rounded-xl px-4 py-3 w-full">
          <Image
            src="/icons/miscIcons/card.svg"
            alt="card logo"
            width={25}
            height={20}
          />
          <div className="flex flex-col w-full">
            <label className="text-xs font-inter text-[#979DBD]">
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
          <div className="w-1/2 border-2 border-[#979DBD] rounded-l-xl px-4 py-3">
            <label className="text-xs text-[#979DBD]">Expiration</label>
            <input
              className="text-[#000000] w-full"
              type="text"
              value={expiration}
              onChange={(e) => setExpiration(e.target.value)}
              placeholder="MM/YY"
            />
          </div>
          <div className="w-1/2 border-2 border-[#979DBD] rounded-r-xl px-4 py-3">
            <label className="text-xs text-[#979DBD]">CVV</label>
            <input
              className="text-[#000000] w-full"
              type="text"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              placeholder="XXXX"
            />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center gap-3">
        <p className="text-[#979DBD] text-xl font-semibold">Alamat Penagihan</p>
        <div className="gap-2 border-2 border-[#979DBD] rounded-xl px-4 py-3 w-full">
          <label className="font-inter text-[#979DBD]">Nama Jalan</label>
          <input
            className="font-inter text-[#000000] w-full"
            type="text"
            value={streetName}
            onChange={(e) => setStreetName(e.target.value)}
            placeholder="Nama Jalan"
          />
        </div>
        <div className="gap-2 border-2 rounded-xl px-4 py-3 w-full border-[#979DBD]">
          <label className="font-inter text-[#979DBD]">
            Nomor rumah atau apartemen
          </label>
          <input
            className="font-inter text-[#000000] w-full"
            type="text"
            value={houseNumber}
            onChange={(e) => setHouseNumber(e.target.value)}
            placeholder="Nomor rumah atau apartemen"
          />
        </div>
        <div className="gap-2 border-2 rounded-xl px-4 py-3 w-full border-[#979DBD]">
          <label className="font-inter text-[#979DBD]">Provinsi</label>
          <input
            className="font-inter text-[#000000] w-full"
            type="text"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            placeholder="Provinsi"
          />
        </div>
        <div className="flex w-full">
          <div className="w-1/2 border-2 rounded-l-xl px-4 py-3 border-[#979DBD]">
            <label className="font-inter text-[#979DBD]">Kota</label>
            <input
              className="font-inter text-[#000000] w-full"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Kota"
            />
          </div>
          <div className="w-1/2 border-2 rounded-r-xl px-4 py-3 border-[#979DBD]">
            <label className="font-inter text-[#979DBD]">Kode Pos</label>
            <input
              className="font-inter text-[#000000] w-full"
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder="Kode Pos"
            />
          </div>
        </div>
      </div>
      <button
        className="py-4 px-12 rounded-full bg-gradient-to-r from-[#275EB0] to-[#1973F9]"
        onClick={handleSubmit}
      >
        <p className="font-inter text-white">Sewa Tempat Ini</p>
      </button>
    </div>
  );
};
