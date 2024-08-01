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
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (startDate && endDate) {
      const durationInDays = Math.ceil(
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
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
    setErrorMessage("");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/facilities/booking/create/`,
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
      },
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

      router.push(`/sewa-tempat/bayar/${booking.uuid}`);
    } else if (!response.ok) {
      const error = await response.json();
      setErrorMessage(error.non_field_errors[0]);
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
      className="flex h-12 w-56 items-center justify-center rounded-3xl bg-[#1973F9]"
      onClick={openLoginModal}
    >
      <p className="text-base font-medium text-[#FFFFFF]">Sewa Tempat Ini</p>
    </button>
  ) : (
    <button
      className="flex h-12 w-56 items-center justify-center rounded-3xl bg-[#1973F9]"
      onClick={handleSubmitSewa}
    >
      <p className="text-base font-medium text-[#FFFFFF]">Sewa Tempat Ini</p>
    </button>
  );

  return (
    <div className="flex flex-col items-center justify-center" {...props}>
      <div className="flex h-[271px] w-96 flex-col items-center justify-center gap-3 space-y-2 rounded-[20px] shadow-2xl">
        <div className="flex flex-col items-center justify-center gap-1">
          <h2 className="text-2xl font-semibold">
            {formatCurrency(totalPrice)}
          </h2>
          <p className="text-base font-normal text-[#353A44]">
            Total sebelum pajak
          </p>
        </div>

        <div className="flex h-16 w-80 items-center justify-center">
          <div className="flex h-full w-full flex-col items-center justify-center rounded-l-[20px] border-2 border-[#A7AFC4]">
            <p className="text-xs font-bold text-[#4082E5]">CHECK-IN</p>
            <DatePicker
              selected={startDate}
              onChange={handleStartDateChange}
              minDate={new Date()}
              className="w-24"
            />
          </div>
          <div className="flex h-full w-full flex-col items-center justify-center rounded-r-[20px] border-2 border-[#A7AFC4]">
            <p className="text-xs font-bold text-[#4082E5]">CHECK-OUT</p>
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
      <div className="mx-2 my-4 flex w-64 flex-col items-center justify-center">
        {errorMessage && (
          <p className="text-center text-red-500">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};
