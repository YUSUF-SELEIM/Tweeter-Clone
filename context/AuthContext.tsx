"use client";

import { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import {jwtDecode} from "jwt-decode";

interface AuthContextProps {
  authorId: string | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps>({
  authorId: null,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  // Read token synchronously from localStorage on the client.
  // NOTE: This removes the async validation step and avoids useEffect
  // as requested. It will decode the token (if present) and expose the
  // `authorId` immediately. This keeps the provider purely client-side.
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const initialAuthorId = token ? (jwtDecode(token) as { userId: string }).userId : null;
  const [authorId] = useState<string | null>(initialAuthorId);
  const [loading] = useState(false);

  return (
    <AuthContext.Provider value={{ authorId, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
