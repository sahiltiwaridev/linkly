import { TextInput, TextInputProps } from "react-native";
import React from "react";
import { useResponsive } from "../../lib/utils/responsive.utils";

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
  const { sizes } = useResponsive();

  return (
    <TextInput
      style={{
        backgroundColor: '#222222',
        width: '100%',
        height: sizes.buttonSm,
        color: '#ffffff',
        borderRadius: 12,
        paddingHorizontal: sizes.spacing.md,
        paddingVertical: sizes.spacing.sm,
      }}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#B3B3B3"
      {...textInputProps}
    />
  );
}