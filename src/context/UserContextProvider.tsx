import { useEffect, useState, ReactNode } from "react";
import UserContext from "./UserContext";
import { getUser } from "../storage/stogare";

type Props = {
  children: ReactNode;
};

const UserContextProvider = ({ children }: Props) => {
  const [hasAccount, setHasAccount] = useState(false);

  useEffect(() => {
    const user = getUser();

    if (user) {
      setHasAccount(true);
    }
  }, []);

  return (
    <UserContext.Provider value={{ hasAccount }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
