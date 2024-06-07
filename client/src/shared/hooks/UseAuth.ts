import { useState, useEffect } from "react";

import { api } from "../services/api";
import { LOGIN_ERROR_MESSAGE } from "../utils";

export interface IHandleLoginProps {
  email: string | undefined;
  password: string | undefined;
}

export const useAuth = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }

    setLoading(false);
  }, []);

  const handleLogin = async ({
    email,
    password,
  }: IHandleLoginProps): Promise<void | { errorMessage: string }> => {
    if (!email || !password) return { errorMessage: LOGIN_ERROR_MESSAGE };

    const { data } = await api.post("login", { email, password });

    if (!data?.token) return { errorMessage: LOGIN_ERROR_MESSAGE };

    localStorage.setItem("token", JSON.stringify(data?.token));
    api.defaults.headers.Authorization = `Bearer ${data?.token}`;
    setAuthenticated(true);
  };

  const handleLogout = () => {
    setAuthenticated(false);
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = "";
  };

  return { authenticated, loading, handleLogin, handleLogout };
};
