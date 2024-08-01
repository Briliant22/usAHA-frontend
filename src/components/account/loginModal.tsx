import React, { FormEvent, useState } from "react";
import Image from "next/image";
import TextButton from "../textButton";

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
  openRegister: () => void;
};

const lightbulbIcon = "/icons/miscIcons/lightbulb.svg";
const closeIcon = "/icons/miscIcons/close.svg";

export function LoginModal({ isOpen, onClose, openRegister }: LoginModalProps) {
  if (!isOpen) return null;

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:8000/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      window.location.reload();
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("Login failed. Please try again.");
    }
  };

  const handleRegister = () => {
    onClose();
    openRegister();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex h-[64vh] w-96 w-[866px] flex-col items-center justify-start rounded-[28px] bg-[#FFFFFF] p-8 shadow-lg">
        <div className="flex w-full justify-end">
          <button type="button" onClick={onClose} className="">
            <Image
              src={closeIcon}
              alt="logo"
              width={20}
              height={20}
              className="ml-2"
            />
          </button>
        </div>
        <Image src={lightbulbIcon} alt="lightbulbIcon" width={70} height={77} />
        <div className="flex items-baseline justify-center">
          <h2 className="my-4 text-[32px] font-semibold">Welcome to</h2>
          <Image
            src="/imgs/usaha.png"
            alt="logo"
            width={100}
            height={30}
            className="ml-2"
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-10 h-[40px] w-[600px]">
            <label className="block text-base font-semibold">Username</label>
            <input
              type="text"
              className="w-full rounded-lg border bg-[#F0F1F5] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-10 h-[40px] w-[600px]">
            <label className="block text-base font-semibold">Password</label>
            <input
              type="password"
              className="w-full rounded-lg border bg-[#F0F1F5] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="my-4 flex h-[16px] flex-col items-center justify-center">
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          </div>
          <div className="flex flex-col items-center justify-center">
            <button
              className="m-2 flex h-[50px] w-[224px] items-center justify-center rounded-[25px] bg-[#1973F9] text-[#FFFFFF] hover:bg-[#97BCF2]"
              type="submit"
            >
              <p className="text-[14px] font-semibold">Login</p>
            </button>
          </div>
        </form>
        <div className="flex w-[600px] flex-col items-center justify-center">
          <div className="mt-4 h-[1px] w-full bg-[#1973F9]"></div>
          <p className="my-4 text-base font-medium text-[#1973F9]">
            Belum punya akun?
          </p>
          <TextButton
            label="Registrasi"
            size="large"
            type="secondary"
            onClick={handleRegister}
          />
        </div>
      </div>
    </div>
  );
}
