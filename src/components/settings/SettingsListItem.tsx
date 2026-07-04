import { View, Text, PressableProps, Pressable } from "react-native";
import React from "react";
import NextIcon from "../../assets/icons/next.svg";
import { useResponsive } from "../../lib/utils/responsive.utils";

type SettingsListItemProps = {
  heading: string;
  text: string;
  icon?: React.ComponentType<any>;
} & PressableProps;

export default function SettingsListItem({
  text,
  heading,
  icon: Icon,
  ...rest
}: SettingsListItemProps) {
  const { sizes } = useResponsive();

  return (
    <Pressable
      style={{
        backgroundColor: "#1A1A1A",
        flexDirection: "row",
        padding: sizes.spacing.md,
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        borderRadius: 16,
      }}
      {...rest}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: sizes.spacing.md,
        }}
      >
        {Icon && (
          <Icon width={sizes.iconMd} height={sizes.iconMd} fill="#4f8cff" />
        )}
        <View>
          <Text className="text-white font-bold text-lg">{heading}</Text>
          <Text className="text-[#B3B3B3]">{text}</Text>
        </View>
      </View>
      <NextIcon width={sizes.iconLg} height={sizes.iconLg} fill={"#4f8cff"} />
    </Pressable>
  );
}
