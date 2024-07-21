"use client";

import { formatCurrency } from "@/utils/formatCurrency";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useEffect, useState } from "react";
import { useUser } from "../isomorphic/userContext";
import { LoginModal } from "../account/loginModal";
import { RegisterModal } from "../account/registerModal";
import { useRouter } from "next/navigation";

interface DatePickerInputProps extends React.HTMLAttributes<HTMLDivElement> {
  price_per_day: number;
  facility: string;
}

export const DatePickerInput = ({
  price_per_day,
  facility,
  ...props
}: DatePickerInputProps) => {
  const { user } = useUser();
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (startDate && endDate) {
      const durationInDays = Math.ceil(
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      setTotalPrice(durationInDays * price_per_day);
    } else {
      setTotalPrice(0);
    }
  }, [startDate, endDate, price_per_day]);

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
    if (date && endDate && date > endDate) {
      setEndDate(null);
    }
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
  };

  const handleSubmitSewa = async () => {
    const response = await fetch(
      "http://localhost:8000/facilities/booking/create/",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          facility,
          start_date: startDate?.toISOString().split("T")[0],
          end_date: endDate?.toISOString().split("T")[0],
          booker: user?.id,
          notes: "",
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      const booking = {
        uuid: data.uuid,
        facility: data.facility,
        booker: data.booker,
        start_date: data.start_date,
        end_date: data.end_date,
        duration: data.duration,
        notes: data.notes,
        is_approved: data.is_approved,
        is_paid: data.is_paid,
      };

      router.push(
        `/sewa-tempat/bayar/${booking.uuid}`
      );
    } else {
      console.error("Failed to create booking");
    }
  };

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);
  const openRegisterModal = () => setIsRegisterModalOpen(true);
  const closeRegisterModal = () => setIsRegisterModalOpen(false);

  const rentButton = !user ? (
    <button
      className="flex bg-[#1973F9] w-56 h-12 rounded-3xl justify-center items-center"
      onClick={openLoginModal}
    >
      <p className="text-[#FFFFFF] text-base font-medium">Sewa Tempat Ini</p>
    </button>
  ) : (
    <button
      className="flex bg-[#1973F9] w-56 h-12 rounded-3xl justify-center items-center"
      onClick={handleSubmitSewa}
    >
      <p className="text-[#FFFFFF] text-base font-medium">Sewa Tempat Ini</p>
    </button>
  );

  return (
    <div className="flex flex-col justify-center items-start" {...props}>
      <div className="flex flex-col w-96 h-[271px] justify-center items-center rounded-[20px] shadow-2xl space-y-2 gap-3">
        <div className="flex-col flex justify-center items-center gap-1">
          <h2 className="text-2xl font-semibold">
            {formatCurrency(totalPrice)}
          </h2>
          <p className="text-[#353A44] text-base font-normal">
            Total sebelum pajak
          </p>
        </div>

        <div className="flex w-80 h-16 justify-center items-center">
          <div className="flex flex-col w-full h-full rounded-l-[20px] justify-center items-center border-2 border-[#A7AFC4]">
            <p className="text-[#4082E5] text-xs font-bold">CHECK-IN</p>
            <DatePicker
              selected={startDate}
              onChange={handleStartDateChange}
              minDate={new Date()}
              className="w-24"
            />
          </div>
          <div className="flex flex-col w-full h-full rounded-r-[20px] justify-center items-center border-2 border-[#A7AFC4]">
            <p className="text-[#4082E5] text-xs font-bold">CHECK-OUT</p>
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              minDate={startDate ?? undefined}
              className="w-24"
            />
          </div>
        </div>
        {rentButton}
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={closeLoginModal}
          openRegister={openRegisterModal}
        />
        <RegisterModal
          isOpen={isRegisterModalOpen}
          onClose={closeRegisterModal}
        />
      </div>
    </div>
  );
};
