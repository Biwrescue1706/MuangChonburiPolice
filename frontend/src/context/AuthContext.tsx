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
  verify: () => Promise<void>; // 🔥 เพิ่มไว้เรียกใช้เองได้
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
      if (err.response?.status !== 401) {
        console.error("Verify error:", err);
      }
      setAdmin(null);
    } finally {
      setLoading(false); // 🔥 กัน loading ค้าง
    }
  };

  useEffect(() => {
    verify();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const res = await api.post("/auth/login", {
        username,
        password,
      });

      toast(
        "success",
        "เข้าสู่ระบบสำเร็จ",
        `ยินดีต้อนรับ ${res.data.admin?.name || username}`,
      );

      await verify(); // 🔥 sync state หลัง login
    } catch (err: any) {
      toast(
        "error",
        "เข้าสู่ระบบไม่สำเร็จ",
        err.response?.data?.error || "เกิดข้อผิดพลาด",
      );
      throw err;
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
      toast("success", "ออกจากระบบสำเร็จ");
    } catch {
      toast("error", "ออกจากระบบไม่สำเร็จ");
    } finally {
      setAdmin(null); // 🔥 เคลียร์ state แน่นอน
    }
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        loading,
        login,
        logout,
        verify, // 🔥 export ออกไปใช้ได้
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
