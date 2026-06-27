import { View, Text, PressableProps, Pressable } from "react-native";
import React from "react";
import { useResponsive } from "../../lib/utils/responsive.utils";

type IconSelectorProps = {
  icon?: React.ComponentType<any>;
} & PressableProps;

export default function IconSelector({ icon: Icon, ...rest }: IconSelectorProps) {
  const { sizes } = useResponsive();

  return (
    <View>
      <Pressable
        style={{
          width: sizes.iconXl,
          height: sizes.iconXl,
          backgroundColor: '#222222',
          borderRadius: 16,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        {...rest}
      >
        {Icon && <Icon width={sizes.iconMd} height={sizes.iconMd} fill="#ffffff" />}
      </Pressable>
    </View>
  );
}
