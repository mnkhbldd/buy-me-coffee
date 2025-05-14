import React, { Dispatch, SetStateAction } from "react";

interface AuthContextValue {
  user: string;
  setUser: Dispatch<SetStateAction<string>>;
}

export const AuthContext = React.createContext<AuthContextValue>({
  user: "",
  setUser: () => {},
});
