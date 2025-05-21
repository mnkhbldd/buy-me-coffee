import React, { Dispatch, SetStateAction } from "react";

interface AuthContextValue {
  profile: any;
}

export const AuthContext = React.createContext<AuthContextValue>({
  profile: null,
});
