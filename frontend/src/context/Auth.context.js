import { json } from "express";
import { createContext, useContext, useState } from "react";

const authContext = createContext();

export const useAuthContext = () => {
  return useContext(authContext);
};

export const AuthContextProvider = ({ childern }) => {
  const [authUser, setAuthUSer] = useState(
    json.parse(localStorage.getItem("chat-user")) || null
  );
  return (
    <authContext.Provider value={{ authUser, setAuthUSer }}>
      {childern}
    </authContext.Provider>
  );
};
