import { createContext, Dispatch, SetStateAction } from "react";

export type loadingContextType = {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

const loadingContext = createContext<loadingContextType | undefined>(undefined);

export default loadingContext;
