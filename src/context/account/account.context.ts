import { createContext } from "react";

type Gender = "male" | "female" | "neutral";

export type AccountContextType = {
  name: string;
  setName: (name: string) => void;
  gender: Gender;
  setGender: (gender: Gender) => void;
  profession: string;
  setProfession: (profession: string) => void;
  email: string;
  setEmail: (email: string) => void;
  bio: string;
  setBio: (bio: string) => void;
};

const accountContext = createContext<AccountContextType | null>(null);

export default accountContext;
