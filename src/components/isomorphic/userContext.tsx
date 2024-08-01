"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface User {
  id: string;
  username: string;
  email: string;
  date_joined: string;
  first_name: string;
  last_name: string;
  bio: string;
  contact_number: string;
  profile_pic: string;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoggedIn: () => boolean;
  fetchWithCredentials: (
    url: string,
    options?: RequestInit,
  ) => Promise<Response>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetchWithCredentials(
          "http://localhost:8000/auth/user/",
        );
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  const isLoggedIn = () => !!user;

  const fetchWithCredentials = (url: string, options: RequestInit = {}) => {
    const headers = new Headers(options.headers);

    if (options.body && !(options.body instanceof FormData)) {
      headers.set("Content-Type", "application/json");
    }

    return fetch(url, {
      ...options,
      credentials: "include",
      headers: headers,
    });
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, isLoggedIn, fetchWithCredentials }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
