import { ReactNode, useState } from "react";
import loadingContext from "./loading.context";

type Props = { children: ReactNode };

export default function LoadingContextProvider({ children }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <loadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </loadingContext.Provider>
  );
}
