import { View, Text, Pressable, PressableProps } from "react-native";
import React from "react";

type SecondaryCardProps = {
  text: string;
  icon?: React.ComponentType<any>;
} & PressableProps;

export default function SecondaryCard({
  text,
  icon: Icon,
  disabled,
  ...rest
}: SecondaryCardProps) {
  return (
    <Pressable
      disabled={disabled}
      className={`w-32 h-36 justify-center items-center rounded-xl 
         gap-3 ${disabled ? "bg-[#1A1A1A]/50" : "bg-[#1A1A1A]"}`}
      {...rest}
    >
      <View className="bg-[#0F0F0F] w-14 h-14 justify-center items-center rounded-full">
        {Icon && (
          <Icon
            width={18}
            height={18}
            fill="#ffffff"
            opacity={disabled ? 0.6 : 1}
          />
        )}
      </View>
      <Text className={`text-white text-lg ${disabled ? "opacity-60" : ""}`}>
        {text}
      </Text>
    </Pressable>
  );
}
