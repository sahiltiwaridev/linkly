import { createContext } from "react";

export type UserContextType = {
  hasAccount: boolean;
  setHasAccount: (value: boolean) => void;
  isUserChecked: boolean;
};

const userContext = createContext<UserContextType | undefined>(undefined);

export default userContext;
