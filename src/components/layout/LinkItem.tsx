import { View, Text, Pressable, Linking } from "react-native";
import React from "react";

import LinkIcon from "../../assets/icons/link.svg";
import InstagramIcon from "../../assets/icons/instagram.svg";
import GithubIcon from "../../assets/icons/github.svg";
import LinkedinIcon from "../../assets/icons/linkedin.svg";
import XIcon from "../../assets/icons/x.svg";
import { LinkItemProps } from "../../types/link.types";

const getIconFromUrl = (url: string) => {
  const value = url.toLowerCase();

  if (value.includes("instagram")) return InstagramIcon;
  if (value.includes("github")) return GithubIcon;
  if (value.includes("linkedin")) return LinkedinIcon;
  if (value.includes("x.com") || value.includes("twitter")) return XIcon;

  return LinkIcon;
};

export default function LinkItem({ url, title }: LinkItemProps) {
  const SelectedIcon = getIconFromUrl(url);

  const handleOpenLink = async () => {
    try {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        console.warn("Cannot open this URL:", url);
      }
    } catch (error) {
      console.error("Error opening link:", error);
    }
  };

  return (
    <Pressable
      onPress={handleOpenLink}
      className="flex-row items-center gap-3 bg-[#1a1a1a] p-4 rounded-xl"
    >
      <SelectedIcon width={22} height={22} />

      <Text className="text-white text-base flex-1" numberOfLines={1}>
        {title}
      </Text>
    </Pressable>
  );
}
