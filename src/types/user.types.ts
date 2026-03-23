export type Gender = "male" | "female" | "neutral";

export type UserData = {
  name: string;
  gender: Gender;
  profession: string;
  email: string;
  bio: string;
  phone: string;
  whatsapp: string;

  linkOneUrl: string;
  linkTwoUrl: string;
  linkThreeUrl: string;
  linkFourUrl: string;
  linkFiveUrl: string;

  linkOneTitle: string;
  linkTwoTitle: string;
  linkThreeTitle: string;
  linkFourTitle: string;
  linkFiveTitle: string;
};

export type Contact = UserData & {
  id: string;
};
