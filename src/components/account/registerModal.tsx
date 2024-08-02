"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type RegisterModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const lightbulbIcon = "/icons/miscIcons/lightbulb.svg";
const closeIcon = "/icons/miscIcons/close.svg";
const cameraIcon = "/icons/miscIcons/camera.svg";

export function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [first_name, setFirstName] = useState<string>("");
  const [last_name, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [contact_number, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirm_password, setConfirmPassword] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirm_password) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setErrorMessage("");

    const formData = new FormData();
    formData.append("username", username);
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("email", email);
    formData.append("contact_number", contact_number);
    formData.append("password", password);
    if (selectedFile) {
      formData.append("profile_pic", selectedFile);
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/registration/`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error("Register failed");
      }

      router.push("/sewa-tempat");
    } catch (error) {
      console.error("Error registering:", error);
      setErrorMessage("Registration failed. Please try again.");
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex min-h-fit w-[866px] flex-col items-center justify-start rounded-[28px] bg-[#FFFFFF] p-5 shadow-lg">
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
        <Image src={lightbulbIcon} alt="lightbulbIcon" width={58} height={64} />
        <div className="flex items-baseline justify-center">
          <h2 className="my-4 text-[28px] font-semibold">Gabung di</h2>
          <Image
            src="/imgs/usaha.png"
            alt="logo"
            width={94}
            height={30}
            className="ml-2"
          />
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col items-center justify-center px-8"
        >
          <div className="flex w-full justify-between space-x-4">
            <div className="flex w-full flex-col space-y-2">
              <label className="block text-base font-semibold">Username</label>
              <input
                type="text"
                className="w-full rounded-lg border bg-[#F0F1F5] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label className="block text-base font-semibold">
                Nama Depan
              </label>
              <input
                type="text"
                className="w-full rounded-lg border bg-[#F0F1F5] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <label className="block text-base font-semibold">
                Nama Belakang
              </label>
              <input
                type="text"
                className="w-full rounded-lg border bg-[#F0F1F5] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              <label className="block text-base font-semibold">Email</label>
              <input
                type="email"
                className="w-full rounded-lg border bg-[#F0F1F5] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label className="block text-base font-semibold">
                Nomor Telepon
              </label>
              <input
                type="text"
                className="w-full rounded-lg border bg-[#F0F1F5] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={contact_number}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <div className="h-[400px] w-[3px] bg-[#1973F9]"></div>
            <div className="flex w-full flex-col space-y-2">
              <label className="block text-base font-semibold">Password</label>
              <input
                type="password"
                className="w-full rounded-lg border bg-[#F0F1F5] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label className="block text-base font-semibold">
                Konfirmasi Password
              </label>
              <input
                type="password"
                className="w-full rounded-lg border bg-[#F0F1F5] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={confirm_password}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <label className="block text-base font-semibold">
                Upload Image
              </label>
              <div className="relative h-full w-full">
                <div
                  className="absolute inset-0 flex items-center justify-center rounded-lg bg-[#F0F1F5]"
                  style={{
                    backgroundImage: previewUrl ? `url(${previewUrl})` : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {!previewUrl && (
                    <div className="flex flex-col items-center justify-center">
                      <Image
                        src={cameraIcon}
                        alt="image input"
                        width={34}
                        height={34}
                        className=""
                      />
                      <p className="block text-base font-medium">
                        Upload foto anda (Optional)
                      </p>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </div>
            </div>
          </div>
          <div className="my-4 flex h-[16px] flex-col items-center justify-center">
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          </div>
          <button
            className="m-2 flex h-[50px] w-[224px] items-center justify-center rounded-[25px] bg-[#1973F9] text-[#FFFFFF] hover:bg-[#97BCF2]"
            type="submit"
          >
            <p className="text-[14px] font-semibold">Register</p>
          </button>
        </form>
      </div>
    </div>
  );
}
