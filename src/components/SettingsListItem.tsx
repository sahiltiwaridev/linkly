import { View, Text, PressableProps, Pressable } from "react-native";
import React from "react";
import NextIcon from "../assets/icons/next.svg";

type SettingsListItemProps = {
  heading: string;
  text: string;
  icon?: React.ComponentType<any>;
} & PressableProps;

export default function SettingsListItem({
  text,
  heading,
  icon: Icon,
  ...rest
}: SettingsListItemProps) {
  return (
    <Pressable
      className="bg-[#1A1A1A] flex-row p-5 justify-between items-center w-full rounded-xl"
      {...rest}
    >
      <View className="flex-row items-center gap-3">
        <View className="bg-[#4f8cff]/40 h-14 w-14 rounded-full justify-center items-center">
          {Icon && <Icon width={24} height={24} fill="#4f8cff" />}
        </View>
        <View>
          <Text className="text-white font-bold text-lg">{heading}</Text>
          <Text className="text-[#B3B3B3]">{text}</Text>
        </View>
      </View>
      <NextIcon width={24} height={24} fill={"#4f8cff"} />
    </Pressable>
  );
}
