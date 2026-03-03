import { View, Text, Pressable, PressableProps } from "react-native";
import React from "react";

type SecondaryButtonProps = {
  text: string;
  icon?: React.ComponentType<any>;
} & PressableProps;

export default function SecondaryButton({
  text,
  icon: Icon,

  ...rest
}: SecondaryButtonProps) {
  return (
    <Pressable
      className="w-full h-14 justify-center items-center rounded-xl 
          bg-[#e53e3e]"
      {...rest}
    >
      <View className="flex-row justify-center items-center gap-2">
        {Icon && <Icon width={18} height={18} fill="#ffffff" />}
        <Text className="text-white font-semibold text-lg ">{text}</Text>
      </View>
    </Pressable>
  );
}
