import { View, Text, Pressable, PressableProps } from "react-native";
import React from "react";

type PrimaryCardProps = {
  text: string;
  icon?: React.ComponentType<any>;
} & PressableProps;

export default function PrimaryCard({
  text,
  icon: Icon,
  ...rest
}: PrimaryCardProps) {
  return (
    <Pressable
      className="flex-1 h-36 justify-center items-center rounded-xl bg-[#1A1A1A] gap-3"
      {...rest}
    >
      <View className="bg-[#0F0F0F] w-14 h-14 justify-center items-center rounded-full">
        {Icon && <Icon width={18} height={18} fill="#ffffff" />}
      </View>
      <Text className="text-white text-lg">{text}</Text>
    </Pressable>
  );
}
