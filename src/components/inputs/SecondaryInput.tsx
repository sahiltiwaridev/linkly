import { TextInput, TextInputProps } from "react-native";
import React from "react";

type SecondaryInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
} & TextInputProps;

export default function SecondaryInput({
  value,
  onChangeText,
  placeholder,
  ...textInputProps
}: SecondaryInputProps) {
  return (
    <TextInput
      className="bg-[#222222] w-[85%] h-12 text-white rounded-md p-3"
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#B3B3B3"
      {...textInputProps}
    />
  );
}