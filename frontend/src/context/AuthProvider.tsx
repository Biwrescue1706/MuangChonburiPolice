import { useCallback, useEffect, useState, type ReactNode } from "react";
import api from "../api/axios";
import { toast } from "../utils/toast";
import { AuthContext } from "./authContext";
import type { Admin } from "./authContext";

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);

  const verify = useCallback(async () => {
    try {
      const res = await api.get("/auth/verify");
      const verifiedAdmin = res.data.admin ?? null;

      setAdmin(verifiedAdmin);
      return verifiedAdmin;
    } catch (err: unknown) {
      const error = err as {
        response?: { status?: number };
      };

      if (error.response?.status !== 401) {
        console.error("Verify error:", err);
      }

      setAdmin(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void verify();
  }, [verify]);

  const login = async (username: string, password: string) => {
    try {
      const res = await api.post("/auth/login", {
        username,
        password,
      });

      if (!res.data.admin) {
        throw new Error("ไม่พบข้อมูลผู้ใช้งานหลังเข้าสู่ระบบ");
      }

      const verifiedAdmin = await verify();

      if (!verifiedAdmin) {
        throw new Error("เข้าสู่ระบบแล้ว แต่ไม่สามารถยืนยัน Session ได้");
      }

      toast(
        "success",
        "เข้าสู่ระบบสำเร็จ",
        `ยินดีต้อนรับ ${verifiedAdmin.name || username}`,
      );
    } catch (err: unknown) {
      const error = err as {
        response?: { data?: { error?: string } };
        message?: string;
      };

      toast(
        "error",
        "เข้าสู่ระบบไม่สำเร็จ",
        error.response?.data?.error || error.message || "เกิดข้อผิดพลาด",
      );

      throw err;
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setAdmin(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        loading,
        login,
        logout,
        verify,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};