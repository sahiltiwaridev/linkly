import { View, Text, Pressable, PressableProps } from "react-native";
import BackIcon from "../../assets/icons/back.svg";
import { useNavigation } from "@react-navigation/native";
import { useResponsive } from "../../lib/utils/responsive.utils";

type HeaderProps = {
  currentScreenName: string;
  backButtonProps?: PressableProps;
};

export default function Header({
  currentScreenName,
  backButtonProps,
}: HeaderProps) {
  const navigation = useNavigation();
  const { sizes } = useResponsive();

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: sizes.spacing.lg }}>
      <Pressable
        onPress={() => navigation.goBack()}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: sizes.spacing.sm,
          width: sizes.iconXl * 3,
        }}
        {...backButtonProps}
      >
        <BackIcon width={sizes.iconLg} height={sizes.iconLg} fill="#4f8cff" />
        <Text className="text-[#B3B3B3] text-xl">Back</Text>
      </Pressable>

      <Text
        className="text-white text-2xl font-bold flex-1 text-center"
        numberOfLines={1}
        adjustsFontSizeToFit
      >
        {currentScreenName}
      </Text>

      <View style={{ width: sizes.iconXl * 3 }} />
    </View>
  );
}
