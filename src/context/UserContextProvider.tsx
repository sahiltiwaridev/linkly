// src/context/UserContext.tsx
import { useState, useEffect, ReactNode } from "react";
import userContext from "./UserContext";
import { getUser } from "../storage/stogare";

type Props = { children: ReactNode };

export default function UserContextProvider({ children }: Props) {
  const [hasAccount, setHasAccount] = useState(false);

  useEffect(() => {
    const user = getUser();
    if (user) setHasAccount(true);
  }, []);

  return (
    <userContext.Provider value={{ hasAccount, setHasAccount }}>
      {children}
    </userContext.Provider>
  );
}
