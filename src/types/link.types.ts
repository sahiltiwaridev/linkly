export type UserLinkPair = {
  title: string;
  url: string;
};

export type LinkItemProps = UserLinkPair;

export type UserLinkInputProps = {
  titleValue: string;
  urlValue: string;
  onChangeTitle: (text: string) => void;
  onChangeUrl: (text: string) => void;
  titlePlaceholder?: string;
  urlPlaceholder?: string;
};
