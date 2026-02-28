// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "../utils/toast";

type Admin = {
  adminId: string;
  username: string;
  name: string;
  position: string;
};

type AuthType = {
  admin: Admin | null;
  loading: boolean;
  login: (u: string, p: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthType>({} as AuthType);

export const AuthProvider = ({ children }: any) => {
  const [admin, setAdmin] = useState<Admin | null>(null);

  const [loading, setLoading] = useState(true);

  const verify = async () => {
    try {
      const res = await api.get("/auth/verify");

      setAdmin(res.data.admin);
    } catch (err: any) {
      // ✅ ถ้า 401 = ยังไม่ login (ปกติ)
      if (err.response?.status !== 401) {
        console.error(err);
      }

      setAdmin(null);
    }

    setLoading(false);
  };

  useEffect(() => {
    verify();
  }, []);

  const login = async (username: string, password: string) => {
    const res = await api.post("/auth/login", {
      username,
      password,
    });

    toast(
      "success",
      "เข้าสู่ระบบสำเร็จ",
      `ยินดีต้อนรับ ${res.data.admin?.name || username}`,
    );

    await verify();
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");

      toast("success", "ออกจากระบบสำเร็จ");
    } catch {
      toast("error", "ออกจากระบบไม่สำเร็จ");
    }

    console.clear();
    if (import.meta.env.PROD) {
      console.clear();
    }

    setAdmin(null);
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
