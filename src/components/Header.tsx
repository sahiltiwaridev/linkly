import { View, Text, Pressable } from "react-native";
import BackIcon from "../assets/icons/back.svg";
import { useNavigation } from "@react-navigation/native";

type HeaderProps = {
  currentScreenName: string;
};

export default function Header({ currentScreenName }: HeaderProps) {
  const navigation = useNavigation<any>();
  return (
    <View className="w-full justify-center">
      <Pressable
        onPress={() => navigation.goBack()}
        className="absolute left-0 flex-row items-center gap-2 z-10"
      >
        <BackIcon width={24} height={24} fill="#4f8cff" />
        <Text className="text-[#B3B3B3] text-xl">Back</Text>
      </Pressable>
      <Text className="text-white text-2xl font-bold text-center z-0">
        {currentScreenName}
      </Text>
    </View>
  );
}
