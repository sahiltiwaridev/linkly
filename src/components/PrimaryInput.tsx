import { TextInput, TextInputProps } from "react-native";
import React from "react";

type PrimaryInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
} & TextInputProps;

export default function PrimaryInput({
  value,
  onChangeText,
  placeholder,
  ...textInputProps
}: PrimaryInputProps) {
  return (
    <TextInput
      className="bg-[#222222] w-full h-14 text-white rounded-md p-3"
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#B3B3B3"
      {...textInputProps}
    />
  );
}
