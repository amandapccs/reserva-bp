import React, { createContext } from "react";
import { IHandleLoginProps, useAuth } from "../hooks";

interface IAuthContextProps {
  handleLogin: (
    props: IHandleLoginProps
  ) => Promise<void | { errorMessage: string }>;
  handleLogout: () => void;
}

export const AuthContext = createContext({} as IAuthContextProps);

interface IAuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const { handleLogin, handleLogout } = useAuth();

  return (
    <AuthContext.Provider value={{ handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
