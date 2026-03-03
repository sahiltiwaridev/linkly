import React from "react";
import { Text, View } from "react-native";
import UserLinkInput from "../inputs/UserLinkInput";

interface LinkItem {
  titleValue: string;
  urlValue: string;
  onChangeTitle: (value: string) => void;
  onChangeUrl: (value: string) => void;
  urlPlaceholder: string;
}

interface EditProfileLinksSectionProps {
  links: LinkItem[];
}

export default function EditProfileLinksSection({
  links,
}: EditProfileLinksSectionProps) {
  return (
    <View className="gap-4">
      <Text className="text-white text-2xl font-bold text-center">
        Profile Links
      </Text>
      {links.map((link, index) => (
        <UserLinkInput
          key={index}
          titleValue={link.titleValue}
          urlValue={link.urlValue}
          onChangeTitle={link.onChangeTitle}
          onChangeUrl={link.onChangeUrl}
          titlePlaceholder="Link title"
          urlPlaceholder={link.urlPlaceholder}
        />
      ))}
    </View>
  );
}
