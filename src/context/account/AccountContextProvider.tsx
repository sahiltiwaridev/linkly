import { createContext, ReactNode, useContext, useState } from "react";

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

const AccountContext = createContext<AccountContextType | null>(null);

type Props = { children: ReactNode };

export default function AccountContextProvider({ children }: Props) {
  const [name, setName] = useState("");
  const [gender, setGender] = useState<Gender>("neutral");
  const [profession, setProfession] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");

  const value: AccountContextType = {
    name,
    setName,
    gender,
    setGender,
    profession,
    setProfession,
    email,
    setEmail,
    bio,
    setBio,
  };

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
}

export function useAccount() {
  const context = useContext(AccountContext);

  if (!context) {
    throw new Error("useAccount must be used inside AccountContextProvider");
  }

  return context;
}
