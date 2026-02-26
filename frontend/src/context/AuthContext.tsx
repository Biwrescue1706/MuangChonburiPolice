import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import api from "../api/axios";

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

const AuthContext = createContext<AuthType>(
  {} as AuthType
);

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  const [admin, setAdmin] =
    useState<Admin | null>(null);

  const [loading, setLoading] =
    useState(true);

  // ================= VERIFY =================
  const verify = async () => {
    try {
      const res = await api.get("/admin/verify");

      if (res.data.valid) {
        setAdmin(res.data.admin);
      } else {
        setAdmin(null);
      }

    } catch {
      // ❌ ไม่ log อะไรเลย
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verify();
  }, []);

  // ================= LOGIN =================
  const login = async (
    username: string,
    password: string
  ) => {

    const res = await api.post(
      "/admin/login",
      { username, password }
    );

    if (!res.data.success) {
      throw new Error(res.data.error);
    }

    await verify();
  };

  // ================= LOGOUT =================
  const logout = async () => {
    await api.post("/admin/logout");
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

export const useAuth = () =>
  useContext(AuthContext);