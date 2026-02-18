import { View, Text, TextInput, TextInputProps } from "react-native";
import React from "react";

type PrimaryInputProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
} & TextInputProps;

export default function PrimaryInput({
  label,
  value,
  onChangeText,
  placeholder,
  ...textInputProps
}: PrimaryInputProps) {
  return (
    <View className="w-full gap-1">
      <Text className="text-white text-lg w-full">{label}</Text>

      <TextInput
        className="bg-[#222222] w-full h-14 text-white rounded-md"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#B3B3B3"
        {...textInputProps}
      />
    </View>
  );
}
