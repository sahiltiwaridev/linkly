import { View, Text } from "react-native";
import React from "react";
import LinkIcon from "../../assets/icons/link.svg";
import InstagramIcon from "../../assets/icons/instagram.svg";
import GithubIcon from "../../assets/icons/github.svg";
import LinkedinIcon from "../../assets/icons/linkedin.svg";
import XIcon from "../../assets/icons/x.svg";
import PrimaryInput from "./PrimaryInput";
import SecondaryInput from "./SecondaryInput";
import IconSelector from "./IconSelector";
import { UserLinkInputProps } from "../../types/link.types";

const isValidLinkUrl = (value: string) => {
  const trimmed = value.trim();

  if (!trimmed) return true;

  if (/^(mailto|tel|sms):/i.test(trimmed)) return true;

  if (trimmed.includes("@") && !trimmed.includes("://")) return false;

  if (/^[\d+().\s-]+$/.test(trimmed)) return false;

  try {
    const url = new URL(trimmed.includes("://") ? trimmed : `https://${trimmed}`);
    return Boolean(url.hostname);
  } catch {
    return false;
  }
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
  } else if (trimmedTitle && trimmedUrl && !isValidLinkUrl(trimmedUrl)) {
    errorMessage = "Please enter a valid URL.";
  }

  return (
    <View className="gap-2">
      {errorMessage !== "" && (
        <Text className="text-[#e53e3e] text-sm">{errorMessage}</Text>
      )}

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
    </View>
  );
}
