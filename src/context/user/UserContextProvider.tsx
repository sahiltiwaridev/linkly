import { useState, useEffect, ReactNode, useContext } from "react";
import userContext from "./userContext";
import { getUser } from "../../lib/storage/user.storage";
import loadingContext from "../loading/loadingContext";

type Props = { children: ReactNode };

export default function UserContextProvider({ children }: Props) {
  const [hasAccount, setHasAccount] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const loadingCtx = (loadingContext as any)._currentValue;
      if (loadingCtx?.setIsLoading) {
        loadingCtx.setIsLoading(true);
      }

      const user = getUser();
      if (user) setHasAccount(true);

      if (loadingCtx?.setIsLoading) {
        loadingCtx.setIsLoading(false);
      }
    };
    checkUser();
  }, []);

  return (
    <userContext.Provider value={{ hasAccount, setHasAccount }}>
      {children}
    </userContext.Provider>
  );
}
