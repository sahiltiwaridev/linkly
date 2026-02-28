import { View, Text } from "react-native";
import React from "react";
import LinkIcon from "../assets/icons/link.svg";
import InstagramIcon from "../assets/icons/instagram.svg";
import GithubIcon from "../assets/icons/github.svg";
import LinkedinIcon from "../assets/icons/linkedin.svg";
import XIcon from "../assets/icons/x.svg";
import PrimaryInput from "./PrimaryInput";
import SecondaryInput from "./SecondaryInput";
import IconSelector from "./IconSelector";

type UserLinkInputProps = {
  titleValue: string;
  urlValue: string;
  onChangeTitle: (text: string) => void;
  onChangeUrl: (text: string) => void;
  titlePlaceholder?: string;
  urlPlaceholder?: string;
};

const getIconFromUrl = (url: string) => {
  const value = url.toLowerCase();

  if (value.includes("instagram")) return InstagramIcon;
  if (value.includes("github")) return GithubIcon;
  if (value.includes("linkedin")) return LinkedinIcon;
  if (value.includes("x.com") || value.includes("twitter")) return XIcon;

  return LinkIcon;
};

export default function UserLinkInput({
  titleValue,
  urlValue,
  onChangeTitle,
  onChangeUrl,
  titlePlaceholder = "Link name",
  urlPlaceholder = "Paste link",
}: UserLinkInputProps) {
  const SelectedIcon = getIconFromUrl(urlValue);

  const trimmedTitle = titleValue.trim();
  const trimmedUrl = urlValue.trim();

  let errorMessage = "";

  if (trimmedUrl && !trimmedTitle) {
    errorMessage = "Please add a name for this link.";
  } else if (trimmedTitle && !trimmedUrl) {
    errorMessage = "Please paste the link URL.";
  }

  return (
    <View className="gap-2">
      <View className="flex-row items-center gap-3">
        <IconSelector icon={SelectedIcon} />

        <SecondaryInput
          value={titleValue}
          onChangeText={onChangeTitle}
          placeholder={titlePlaceholder}
        />
      </View>

      <PrimaryInput
        value={urlValue}
        onChangeText={onChangeUrl}
        placeholder={urlPlaceholder}
      />

      {errorMessage !== "" && (
        <Text className="text-[#e53e3e] text-sm">
          {errorMessage}
        </Text>
      )}
    </View>
  );
}