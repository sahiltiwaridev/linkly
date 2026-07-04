import { View, Text, Pressable, PressableProps } from "react-native";
import React from "react";
import { useResponsive } from "../../lib/utils/responsive.utils";

type SecondaryButtonProps = {
  text: string;
  icon?: React.ComponentType<any>;
} & PressableProps;

export default function SecondaryButton({
  text,
  icon: Icon,

  ...rest
}: SecondaryButtonProps) {
  const { sizes, ui } = useResponsive();

  return (
    <Pressable
      style={{
        width: '100%',
        height: ui.buttonHeight,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        backgroundColor: '#e53e3e',
      }}
      {...rest}
    >
      <View className="flex-row justify-center items-center gap-2">
        {Icon && <Icon width={sizes.iconMd} height={sizes.iconMd} fill="#ffffff" />}
        <Text style={{ color: '#ffffff', fontSize: ui.bodyFontSize, fontWeight: '600' }}>{text}</Text>
      </View>
    </Pressable>
  );
}
