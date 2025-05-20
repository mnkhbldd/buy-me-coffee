import React, { Dispatch, SetStateAction } from "react";

interface UserContextValue {
  userId: string;
  setUserId: (newUserId: string) => void;
}

export const UserContext = React.createContext<UserContextValue>({
  userId: "",
  setUserId: () => {},
});
