import { createContext } from "react";

export type userContextType = {
  hasAccount: boolean;
};

const userContext = createContext<userContextType | undefined>(undefined);

export default userContext;
