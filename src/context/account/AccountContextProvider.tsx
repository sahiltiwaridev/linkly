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
  userLinkFirst: string;
  setUserLinkFirst: (userLinkFirst: string) => void;
  userLinkSecond: string;
  setUserLinkSecond: (userLinkSecond: string) => void;
  userLinkThird: string;
  setUserLinkThird: (userLinkThird: string) => void;
  userLinkTitleFirst: string;
  setUserLinkTitleFirst: (userLinkTitleFirst: string) => void;
  userLinkTitleSecond: string;
  setUserLinkTitleSecond: (userLinkTitleSecond: string) => void;
  userLinkTitleThird: string;
  setUserLinkTitleThird: (userLinkTitleThird: string) => void;
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
  const [userLinkFirst, setUserLinkFirst] = useState("");
  const [userLinkSecond, setUserLinkSecond] = useState("");
  const [userLinkThird, setUserLinkThird] = useState("");
  const [userLinkTitleFirst, setUserLinkTitleFirst] = useState("");
  const [userLinkTitleSecond, setUserLinkTitleSecond] = useState("");
  const [userLinkTitleThird, setUserLinkTitleThird] = useState("");

  const value: AccountContextType = {
    name,
    setName,
    gender,
    setGender,
    profession,
    setProfession,
    email,
    setEmail,
    userLinkFirst,
    setUserLinkFirst,
    userLinkSecond,
    setUserLinkSecond,
    userLinkThird,
    setUserLinkThird,
    userLinkTitleFirst,
    setUserLinkTitleFirst,
    userLinkTitleSecond,
    setUserLinkTitleSecond,
    userLinkTitleThird,
    setUserLinkTitleThird,
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
