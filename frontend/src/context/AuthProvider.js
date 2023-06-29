import { createContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  // eslint-disable-next-line no-unused-vars
  const [localUser, setLocalUser] = useLocalStorage("user", null);

  const [auth, setAuth] = useState(localUser);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
