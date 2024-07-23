"use client";
import { useUser } from "../isomorphic/userContext";
import Image from "next/image";
import { FormEvent, useState } from "react";
import EditPfpModal from "./editPfpModal";

interface EditProfileProps {
  onCancel: () => void;
}

export default function EditProfile({ onCancel }: EditProfileProps) {
  const { user, isLoggedIn, fetchWithCredentials } = useUser();
  const name = !user ? "" : user.username;
  const firstName = !user ? "" : user.first_name;
  const lastName = !user ? "" : user.last_name;
  const emailAccount = !user ? "" : user.email;
  const phoneNumber = !user ? "" : user.contact_number;
  const userBio = !user ? "" : user.bio;

  const [editPfp, setEditPfp] = useState<boolean>(false);
  const [username, setUsername] = useState<string>(name);
  const [first_name, setFirstName] = useState<string>(firstName);
  const [last_name, setLastName] = useState<string>(lastName);
  const [email, setEmail] = useState<string>(emailAccount);
  const [contact_number, setPhoneNumber] = useState<string>(phoneNumber);
  const [bio, setBio] = useState<string>(userBio);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const openEditPfpModal = () => {
    setEditPfp(true);
  };

  const closeEditPfpModal = () => {
    setEditPfp(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("email", email);
    formData.append("contact_number", contact_number);
    formData.append("bio", bio);

    try {
      const response = await fetchWithCredentials(
        "http://localhost:8000/auth/user/",
        {
          method: "PUT",
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error("Edit failed");
      }

      window.location.reload();
      onCancel();
    } catch (error) {
      console.error("Error changing profile picture:", error);
    }
  };

  return (
    <div className="flex h-full w-full min-w-fit items-center justify-center">
      {isLoggedIn() ? (
        <div className="flex w-3/5 flex-col items-center justify-center space-y-10">
          <div className="relative flex h-64 w-64 min-w-fit items-center justify-center">
            <Image
              src={
                user?.profile_pic
                  ? user?.profile_pic
                  : "/icons/miscIcons/defPfp.svg"
              }
              alt="Profile Image"
              className="h-64 w-64 rounded-full object-cover"
              width={250}
              height={250}
            />
            <button
              onClick={openEditPfpModal}
              className="absolute bottom-0 right-4 flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#1973F9]"
            >
              <Image
                src="/icons/miscIcons/edit.svg"
                alt="Edit Profile"
                className="h-[27px] w-[27px] rounded-full object-cover"
                width={27}
                height={27}
              />
            </button>
            <EditPfpModal isOpen={editPfp} onClose={closeEditPfpModal} />
          </div>
          <form onSubmit={handleSubmit} className="flex w-full flex-col px-8">
            <div className="flex h-full w-full justify-between space-x-4">
              <div className="flex h-full w-full flex-col space-y-2">
                <label className="block text-base font-semibold">
                  Username
                </label>
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
              <div className="flex h-full w-full flex-col space-y-2">
                <label className="block text-base font-semibold">Bio</label>
                <textarea
                  className="h-[372px] w-full rounded-lg border bg-[#F0F1F5] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  required
                  style={{ resize: "none" }}
                />
              </div>
            </div>
            <div className="my-4 flex h-[16px] flex-col items-center justify-center">
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            </div>
            <div className="my-4 flex flex-col items-center justify-center">
              <div className="flex items-center justify-center space-x-10">
                <button
                  onClick={onCancel}
                  className="mt-2 flex h-12 w-56 items-center justify-center rounded-[20px] bg-red-600 p-2 hover:bg-red-400"
                >
                  <p className="text-base font-medium text-[#FFFFFF]">Cancel</p>
                </button>
                <button
                  type="submit"
                  className="mt-2 flex h-12 w-56 items-center justify-center rounded-[20px] bg-[#1973F9] hover:bg-[#97BCF2]"
                >
                  <p className="text-base font-medium text-[#FFFFFF]">
                    Confirm Change
                  </p>
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}
