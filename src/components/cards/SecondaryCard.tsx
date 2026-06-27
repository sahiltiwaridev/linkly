import { View, Text, Pressable, PressableProps } from "react-native";
import React from "react";
import { useResponsive } from "../../lib/utils/responsive.utils";

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
  const { sizes } = useResponsive();
  const iconContainerSize = sizes.iconLg;

  return (
    <Pressable
      disabled={disabled}
      style={{
        minWidth: Math.max(sizes.containerSm, 100),
        minHeight: sizes.containerMd,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        gap: 12,
        backgroundColor: disabled ? 'rgba(26, 26, 26, 0.5)' : '#1A1A1A',
      }}
      {...rest}
    >
      <View
        style={{
          backgroundColor: '#0F0F0F',
          width: iconContainerSize,
          height: iconContainerSize,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: iconContainerSize / 2,
        }}
      >
        {Icon && (
          <Icon
            width={sizes.iconMd}
            height={sizes.iconMd}
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
