"use client";

import { createContext, useContext, ReactNode } from "react";
import { useCurrentUser } from "@/hooks/use-api";

interface User {
  id: string;
  email: string;
  name: string | null;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthContextType {
  user: User | undefined;
  isLoading: boolean;
  isError: any;
  mutate: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: user, isLoading, isError, mutate } = useCurrentUser();

  return (
    <AuthContext.Provider value={{ user, isLoading, isError, mutate }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
