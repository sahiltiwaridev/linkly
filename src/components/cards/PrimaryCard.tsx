import { View, Text, Pressable, PressableProps } from "react-native";
import React from "react";
import { useResponsive } from "../../lib/utils/responsive.utils";

type PrimaryCardProps = {
  text: string;
  icon?: React.ComponentType<any>;
} & PressableProps;

export default function PrimaryCard({
  text,
  icon: Icon,
  ...rest
}: PrimaryCardProps) {
  const { sizes } = useResponsive();
  const iconContainerSize = sizes.iconLg;

  return (
    <Pressable
      style={{
        flex: 1,
        minHeight: sizes.containerMd,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        backgroundColor: '#1A1A1A',
        gap: 12,
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
        {Icon && <Icon width={sizes.iconMd} height={sizes.iconMd} fill="#ffffff" />}
      </View>
      <Text className="text-white text-lg">{text}</Text>
    </Pressable>
  );
}
