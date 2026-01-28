import { createContext, Dispatch, SetStateAction } from "react";

export type userContextType = {
  hasAccount: boolean;
  setHasAccount: Dispatch<SetStateAction<boolean>>;
};

const userContext = createContext<userContextType | undefined>(undefined);

export default userContext;
