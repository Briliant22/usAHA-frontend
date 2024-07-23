import { useUser } from "../isomorphic/userContext";

export default function ProfileModal() {
  const { user, setUser } = useUser();

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8000/auth/logout/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setUser(null);
        console.log("Logout successful");
        window.location.href = "/sewa-tempat";
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="absolute right-0 z-50 mt-2 w-[20vw] rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
      <div
        className="py-1"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        <a
          href="#"
          className="block px-4 py-4 text-[20px] hover:bg-gray-100 hover:text-[#4082E5]"
          role="menuitem"
        >
          Your Profile
        </a>
        <a
          href="#"
          className="block px-4 py-4 text-[20px] hover:bg-gray-100 hover:text-[#4082E5]"
          role="menuitem"
        >
          Settings
        </a>
        <button
          onClick={handleLogout}
          className="block w-full px-4 py-4 text-left text-[20px] hover:bg-gray-100 hover:text-red-600"
          role="menuitem"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
