export type Gender = "male" | "female" | "neutral";

export type UserData = {
  name: string;
  gender: Gender;
  profession: string;
  email: string;
  bio: string;
  phone: string;
  whatsapp: string;
  userLinkFirst: string;
  userLinkSecond: string;
  userLinkThird: string;
  userLinkFourth: string;
  userLinkFifth: string;
  userLinkTitleFirst: string;
  userLinkTitleSecond: string;
  userLinkTitleThird: string;
  userLinkTitleFourth: string;
  userLinkTitleFifth: string;
};

export type Contact = UserData & {
  id: string;
};
