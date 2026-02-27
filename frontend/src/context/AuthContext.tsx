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
}: any) => {
  const [admin, setAdmin] =
    useState<Admin | null>(null);

  const [loading, setLoading] =
    useState(true);

  const verify = async () => {
    try {
      const res =
        await api.get("/admin/verify");

      setAdmin(res.data.admin);
    } catch {
      setAdmin(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    verify();
  }, []);

  const login = async (
  username: string,
  password: string
) => {

  await api.post("/admin/login", {
    username,
    password,
  });

  await verify();
};

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