import React, { FormEvent, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const lightbulbIcon = "icons/miscIcons/lightbulb.svg";
const closeIcon = "icons/miscIcons/close.svg";

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  if (!isOpen) return null;

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
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
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="flex flex-col justify-start items-center bg-[#FFFFFF] w-[866px] h-[60vh] p-8 rounded-[28px] shadow-lg w-96">
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
        <div className="flex justify-center items-baseline">
          <h2 className="text-[32px] font-semibold my-4">Welcome to</h2>
          <Image
            src="/imgs/usaha.png"
            alt="logo"
            width={100}
            height={30}
            className="ml-2"
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="w-[600px] h-[40px] mb-10">
            <label className="block text-base font-semibold">Username</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="w-[600px] h-[40px] mb-10">
            <label className="block text-base font-semibold">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="flex bg-[#1973F9] w-56 h-12 rounded-3xl justify-center items-center"
            >
              <p className="text-[#FFFFFF] text-base font-medium">Login</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
