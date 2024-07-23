import React, { ChangeEvent, FormEvent, useState } from "react";
import Image from "next/image";
import { useUser } from "../isomorphic/userContext";

interface EditPfpModal {
  isOpen: boolean;
  onClose: () => void;
}

const closeIcon = "/icons/miscIcons/close.svg";
const cameraIcon = "/icons/miscIcons/camera.svg";

export default function EditPfpModal({ isOpen, onClose }: EditPfpModal) {
  if (!isOpen) return null;
  const { fetchWithCredentials } = useUser();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    if (selectedFile) {
      formData.append("profile_pic", selectedFile);
    }

    try {
      const response = await fetchWithCredentials(
        "http://localhost:8000/profiles/pfp/edit/",
        {
          method: "PUT",
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error("Edit failed");
      }

      window.location.reload();
      onClose();
    } catch (error) {
      console.error("Error changing profile picture:", error);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex h-[75vh] w-96 w-[866px] flex-col items-center justify-start rounded-[28px] bg-[#FFFFFF] p-5 shadow-lg">
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
        <form
          onSubmit={handleSubmit}
          className="flex h-full w-full flex-col items-center justify-center"
        >
          <div className="relative h-3/4 w-3/4">
            <div
              className="absolute inset-0 flex items-center justify-center rounded-[28px] bg-[#F0F1F5]"
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
          <button
            type="submit"
            className="mt-10 flex h-[50px] w-[150px] items-center justify-center rounded-[25px] bg-[#4082E5] p-2 hover:bg-[#2F6BC5]"
          >
            <p className="text-[14px] font-bold text-[#FFFFFF]">
              Edit Profile Pic
            </p>
          </button>
        </form>
      </div>
    </div>
  );
}
