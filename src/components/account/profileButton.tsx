import { useEffect, useRef, useState } from "react";
import { LoginModal } from "./loginModal";
import { useUser } from "../isomorphic/userContext";
import { RegisterModal } from "./registerModal";
import Image from "next/image";
import ProfileModal from "./profileModal";

export default function ProfileButton() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, setUser } = useUser();

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const openRegisterModal = () => {
    setIsRegisterModalOpen(true);
  };

  const closeRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const profileButton = !user ? (
    <button
      onClick={openLoginModal}
      className="flex h-[54px] w-[176px] items-center justify-center rounded-full border border-[#1973F9]"
    >
      <p className="w-full font-inter font-medium text-[#1973F9]">Log In</p>
    </button>
  ) : (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex h-[54px] w-[176px] items-center justify-center rounded-full border border-[#1973F9]"
      >
        <div className="flex w-full items-center justify-start space-x-2 p-3">
          <Image
            src={
              user.profile_pic
                ? user.profile_pic
                : "/icons/miscIcons/defPfp.svg"
            }
            alt="Profile Image"
            className="h-[36px] w-[36px] rounded-full object-cover"
            width={36}
            height={36}
          />
          <div className="flex justify-center px-3">
            <p className="text-[14px] font-semibold text-[#1973F9]">
              {user.username}
            </p>
          </div>
        </div>
      </button>
      {isDropdownOpen && <ProfileModal />}
    </div>
  );

  return (
    <div>
      {profileButton}
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
  );
}
