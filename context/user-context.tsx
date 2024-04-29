"use client";

import React, { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";

export type User = {
  _id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
};
interface UserContextType {
  user: User;
  setUser: (user: User) => void;
  logout: () => void;
}
const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: React.ReactNode;
}
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({});
  const router = useRouter();

  const logout = () => {
    setUser({});
    Cookie.remove("admin-token");
    router.push("/");
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
