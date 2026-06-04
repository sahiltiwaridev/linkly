import { create } from "zustand";
import { Gender, UserData } from "../types/user.types";

export type AccountStore = UserData & {
  setName: (name: string) => void;
  setGender: (gender: Gender) => void;
  setProfession: (profession: string) => void;
  setBio: (bio: string) => void;
  setPhone: (phone: string) => void;
  setEmail: (email: string) => void;
  setWhatsapp: (whatsapp: string) => void;
  setLinkOneUrl: (linkOneUrl: string) => void;
  setLinkTwoUrl: (linkTwoUrl: string) => void;
  setLinkThreeUrl: (linkThreeUrl: string) => void;
  setLinkFourUrl: (linkFourUrl: string) => void;
  setLinkFiveUrl: (linkFiveUrl: string) => void;
  setLinkOneTitle: (linkOneTitle: string) => void;
  setLinkTwoTitle: (linkTwoTitle: string) => void;
  setLinkThreeTitle: (linkThreeTitle: string) => void;
  setLinkFourTitle: (linkFourTitle: string) => void;
  setLinkFiveTitle: (linkFiveTitle: string) => void;
  resetAccount: () => void;
};

const INITIAL_STATE: UserData = {
  name: "",
  gender: "neutral" as Gender,
  profession: "",
  bio: "",
  phone: "",
  email: "",
  whatsapp: "",
  linkOneUrl: "",
  linkOneTitle: "",
  linkTwoUrl: "",
  linkTwoTitle: "",
  linkThreeUrl: "",
  linkThreeTitle: "",
  linkFourUrl: "",
  linkFourTitle: "",
  linkFiveUrl: "",
  linkFiveTitle: "",
};

export const useAccountStore = create<AccountStore>((set) => ({
  ...INITIAL_STATE,

  setName: (name) => set({ name }),
  setGender: (gender) => set({ gender }),
  setProfession: (profession) => set({ profession }),
  setBio: (bio) => set({ bio }),
  setPhone: (phone) => set({ phone }),
  setEmail: (email) => set({ email }),
  setWhatsapp: (whatsapp) => set({ whatsapp }),

  setLinkOneUrl: (linkOneUrl) => set({ linkOneUrl }),
  setLinkTwoUrl: (linkTwoUrl) => set({ linkTwoUrl }),
  setLinkThreeUrl: (linkThreeUrl) => set({ linkThreeUrl }),
  setLinkFourUrl: (linkFourUrl) => set({ linkFourUrl }),
  setLinkFiveUrl: (linkFiveUrl) => set({ linkFiveUrl }),

  setLinkOneTitle: (linkOneTitle) => set({ linkOneTitle }),
  setLinkTwoTitle: (linkTwoTitle) => set({ linkTwoTitle }),
  setLinkThreeTitle: (linkThreeTitle) => set({ linkThreeTitle }),
  setLinkFourTitle: (linkFourTitle) => set({ linkFourTitle }),
  setLinkFiveTitle: (linkFiveTitle) => set({ linkFiveTitle }),

  resetAccount: () => set(INITIAL_STATE),
}));