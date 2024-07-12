import React, { ChangeEvent, FormEvent, useState } from "react";
import Image from "next/image";

type RegisterModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const lightbulbIcon = "icons/miscIcons/lightbulb.svg";
const closeIcon = "icons/miscIcons/close.svg";
const cameraIcon = "icons/miscIcons/camera.svg";

export function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  if (!isOpen) return null;

  const [username, setUsername] = useState<string>("");
  const [first_name, setFirstName] = useState<string>("");
  const [last_name, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [contact_number, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirm_password, setConfirmPassword] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirm_password) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:8000/auth/registration/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          username,
          first_name,
          last_name,
          email,
          contact_number,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Register failed");
      }

      window.location.reload();
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="flex flex-col justify-start items-center bg-[#FFFFFF] w-[866px] h-[75vh] p-5 rounded-[28px] shadow-lg w-96">
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
        <div className="flex justify-center items-baseline">
          <h2 className="text-[28px] font-semibold my-4">Gabung di</h2>
          <Image
            src="/imgs/usaha.png"
            alt="logo"
            width={94}
            height={30}
            className="ml-2"
          />
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col w-full px-8">
          <div className="flex justify-between w-full space-x-4">
            <div className="flex flex-col w-full space-y-2">
              <label className="block text-base font-semibold">Username</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#F0F1F5]"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label className="block text-base font-semibold">
                Nama Depan
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#F0F1F5]"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <label className="block text-base font-semibold">
                Nama Belakang
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#F0F1F5]"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              <label className="block text-base font-semibold">Email</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#F0F1F5]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label className="block text-base font-semibold">
                Nomor Telepon
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#F0F1F5]"
                value={contact_number}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <div className="bg-[#1973F9] w-[3px] h-[400px]"></div>
            <div className="flex flex-col w-full space-y-2">
              <label className="block text-base font-semibold">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#F0F1F5]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label className="block text-base font-semibold">
                Konfirmasi Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#F0F1F5]"
                value={confirm_password}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <label className="block text-base font-semibold">
                Upload Image
              </label>
              <div className="relative w-full h-full">
                <div className="absolute inset-0 flex items-center justify-center bg-[#F0F1F5] rounded-lg">
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
                </div>
                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center h-[16px] my-4">
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          </div>
          <div className="flex flex-col justify-center items-center my-4">
            <button
              type="submit"
              className="flex bg-[#1973F9] w-56 h-12 rounded-[20px] justify-center items-center mt-2"
            >
              <p className="text-[#FFFFFF] text-base font-medium">Register</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
