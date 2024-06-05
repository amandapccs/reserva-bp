import React, { createContext } from "react";
import { IHandleLoginProps, useAuth } from "../hooks";

interface IAuthContextProps {
  authenticated: boolean;
  loading: boolean;
  handleLogin: (props: IHandleLoginProps) => Promise<void | string>;
  handleLogout: () => void;
}

export const AuthContext = createContext({} as IAuthContextProps);

interface IAuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const { authenticated, loading, handleLogin, handleLogout } = useAuth();

  return (
    <AuthContext.Provider
      value={{ loading, authenticated, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
