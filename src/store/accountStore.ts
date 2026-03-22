import { create } from "zustand";
import { Gender } from "../types/user.types";

const INITIAL_STATE = {
  name: "",
  gender: "neutral" as Gender,
  profession: "",
  bio: "",
  phone: "",
  email: "",
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

  setLinkOneUrl: (linkOneUrl: string) => set({ linkOneUrl }),
  setLinkOneTitle: (linkOneTitle: string) => set({ linkOneTitle }),
  setLinkTwoUrl: (linkTwoUrl: string) => set({ linkTwoUrl }),
  setLinkTwoTitle: (linkTwoTitle: string) => set({ linkTwoTitle }),
  setLinkThreeUrl: (linkThreeUrl: string) => set({ linkThreeUrl }),
  setLinkThreeTitle: (linkThreeTitle: string) => set({ linkThreeTitle }),
  setLinkFourUrl: (linkFourUrl: string) => set({ linkFourUrl }),
  setLinkFourTitle: (linkFourTitle: string) => set({ linkFourTitle }),
  setLinkFiveUrl: (linkFiveUrl: string) => set({ linkFiveUrl }),
  setLinkFiveTitle: (linkFiveTitle: string) => set({ linkFiveTitle }),

  resetAccount: () => set(INITIAL_STATE),
}));
