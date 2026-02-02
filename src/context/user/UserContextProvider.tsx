import { useState, useEffect, ReactNode, useContext } from "react";
import userContext from "./userContext";
import { getUser } from "../../lib/storage/user.storage";
import loadingContext from "../loading/loadingContext";

type Props = { children: ReactNode };

export default function UserContextProvider({ children }: Props) {
  const [hasAccount, setHasAccount] = useState(false);
  const [isUserChecked, setIsUserChecked] = useState(false);

  const loadingCtx = useContext(loadingContext);

  if (!loadingCtx) {
    throw new Error(
      "UserContextProvider must be wrapped in LoadingContextProvider",
    );
  }

  const { setIsLoading } = loadingCtx;

  useEffect(() => {
    const checkUser = async () => {
      setIsLoading(true);

      const user = getUser();
      if (user) setHasAccount(true);

      setIsUserChecked(true);
      setIsLoading(false);
    };

    checkUser();
  }, []);

  return (
    <userContext.Provider value={{ hasAccount, setHasAccount, isUserChecked }}>
      {children}
    </userContext.Provider>
  );
}
