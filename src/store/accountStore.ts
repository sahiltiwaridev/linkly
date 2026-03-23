import { create } from "zustand";
import { Gender, UserData } from "../types/user.types";

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

export const useAccountStore = create((set) => ({
  ...INITIAL_STATE,

  setName: (name: string) => set({ name }),
  setGender: (gender: Gender) => set({ gender }),
  setProfession: (profession: string) => set({ profession }),
  setBio: (bio: string) => set({ bio }),
  setPhone: (phone: string) => set({ phone }),
  setEmail: (email: string) => set({ email }),
  setWhatsapp: (whatsapp: string) => set({ whatsapp }),

  setLinkOneUrl: (linkOneUrl: string) => set({ linkOneUrl }),
  setLinkTwoUrl: (linkTwoUrl: string) => set({ linkTwoUrl }),
  setLinkThreeUrl: (linkThreeUrl: string) => set({ linkThreeUrl }),
  setLinkFourUrl: (linkFourUrl: string) => set({ linkFourUrl }),
  setLinkFiveUrl: (linkFiveUrl: string) => set({ linkFiveUrl }),

  setLinkOneTitle: (linkOneTitle: string) => set({ linkOneTitle }),
  setLinkTwoTitle: (linkTwoTitle: string) => set({ linkTwoTitle }),
  setLinkThreeTitle: (linkThreeTitle: string) => set({ linkThreeTitle }),
  setLinkFourTitle: (linkFourTitle: string) => set({ linkFourTitle }),
  setLinkFiveTitle: (linkFiveTitle: string) => set({ linkFiveTitle }),

  resetAccount: () => set(INITIAL_STATE),
}));
