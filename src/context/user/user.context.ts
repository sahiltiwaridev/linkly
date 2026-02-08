import { createContext } from "react";

export type UserContextType = {
  hasAccount: boolean;
  setHasAccount: (value: boolean) => void;
  isUserInitialized: boolean;
};

const userContext = createContext<UserContextType | undefined>(undefined);

export default userContext;
