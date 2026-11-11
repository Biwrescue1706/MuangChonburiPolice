import { createContext } from "react";

export type Admin = {
  id?: string | number;
  username?: string;
  name?: string;
  position?: string;
};

export type AuthContextType = {
  admin: Admin | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  verify: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);
