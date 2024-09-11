"use client";

import { createContext, useContext, useEffect, useState } from "react";
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
  const [authorId, setAuthorId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/"); // Redirect to login if token is missing
      return;
    }

    const validateToken = async () => {
      try {
        const response = await fetch("/api/auth/validate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          router.push("/"); // Invalid token, redirect to login
        } else {
          const decodedToken: { userId: string } = jwtDecode(token);
          setAuthorId(decodedToken.userId); // Set the userId from the token
        }
      } catch (err) {
        console.error("Error validating token:", err);
        router.push("/"); // Error, redirect to login
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, [router]);

  return (
    <AuthContext.Provider value={{ authorId, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
