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
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: sizes.spacing.sm }}>
      <Pressable
        onPress={() => navigation.goBack()}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: sizes.spacing.sm,
          marginRight: sizes.spacing.md,
        }}
        {...backButtonProps}
      >
        <BackIcon width={sizes.iconLg} height={sizes.iconLg} fill="#4f8cff" />
        <Text className="text-[#B3B3B3] text-xl">Back</Text>
      </Pressable>

      <Text
        className="text-white text-2xl font-bold"
        numberOfLines={1}
        adjustsFontSizeToFit
      >
        {currentScreenName}
      </Text>
    </View>
  );
}
