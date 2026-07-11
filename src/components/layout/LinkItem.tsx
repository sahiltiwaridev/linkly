import { Pressable, Text, Linking } from "react-native";

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

const normalizeUrl = (value: string) => {
  const trimmed = value.trim();

  if (!trimmed) return "";

  // Add https:// if the user didn't provide a scheme
  if (!/^https?:\/\//i.test(trimmed)) {
    return `https://${trimmed}`;
  }

  return trimmed;
};

export default function LinkItem({ url, title }: LinkItemProps) {
  const normalizedUrl = normalizeUrl(url);
  const SelectedIcon = getIconFromUrl(normalizedUrl);

  const handleOpenLink = async () => {
    if (!normalizedUrl) {
      console.warn("Invalid URL:", url);
      return;
    }

    try {
      console.log("Opening:", normalizedUrl);
      await Linking.openURL(normalizedUrl);
    } catch (error) {
      console.error("Failed to open URL:", normalizedUrl, error);
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