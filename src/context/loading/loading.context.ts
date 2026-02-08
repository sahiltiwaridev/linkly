import { createContext } from "react";

export type LoadingContextType = {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
};

const loadingContext = createContext<LoadingContextType | undefined>(undefined);

export default loadingContext;
