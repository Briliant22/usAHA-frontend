import Link from "next/link";
import Image from "next/image";
import { useUser } from "../isomorphic/userContext";

const profileIcon = "/icons/miscIcons/profile.svg";
const settingsIcon = "/icons/miscIcons/settings.svg";
const logoutIcon = "/icons/miscIcons/logout.svg";

export default function ProfileModal() {
  const { setUser } = useUser();

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/logout/`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.ok) {
        setUser(null);
        window.location.reload();
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="absolute right-0 z-50 mt-2 w-[20vw] rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5">
      <div
        className="py-1"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        <Link
          href={`/profile/`}
          className="block px-4 py-4 text-xl font-normal hover:bg-gray-100 hover:text-[#4082E5]"
          role="menuitem"
        >
          <span className="flex items-center justify-start space-x-4">
            <Image src={profileIcon} alt="profile" width={24} height={124} />
            <p>Profile Anda</p>
          </span>
        </Link>
        <button
          onClick={handleLogout}
          className="block w-full px-4 py-4 text-left text-xl font-normal hover:bg-gray-100 hover:text-red-600"
          role="menuitem"
        >
          <span className="flex items-center justify-start space-x-4">
            <Image src={logoutIcon} alt="logout" width={24} height={124} />
            <p>Sign Out</p>
          </span>
        </button>
      </div>
    </div>
  );
}
