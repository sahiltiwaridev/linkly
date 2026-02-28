import { View, Text, PressableProps, Pressable } from "react-native";
import React from "react";

type IconSelectorProps = {
  icon?: React.ComponentType<any>;
} & PressableProps;

export default function IconSelector({ icon: Icon }: IconSelectorProps) {
  return (
    <View>
      <Pressable className="h-12 w-12 bg-[#222222] rounded-lg justify-center items-center">
        {Icon && <Icon width={18} height={18} fill="#ffffff" />}
      </Pressable>
    </View>
  );
}
