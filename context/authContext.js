"use client";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuthPage = () => {
  return useContext(AuthContext);
};

export const AuthPageProvider = ({ children }) => {
  const [loginPage, setLoginPage] = useState(false);
  const [registerPage, setRegisterPage] = useState(false);

  return (
    <AuthContext.Provider
      value={{ loginPage, registerPage, setLoginPage, setRegisterPage }}
    >
      {children}
    </AuthContext.Provider>
  );
};
