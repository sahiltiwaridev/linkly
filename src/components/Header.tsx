import { View, Text, Pressable } from "react-native";
import BackIcon from "../assets/icons/back.svg";
import { useNavigation } from "@react-navigation/native";

type HeaderProps = {
  currentScreenName: string;
};

export default function Header({ currentScreenName }: HeaderProps) {
  const navigation = useNavigation();
  return (
    <View className="flex-row justify-between items-center pb-5">
      <Pressable
        onPress={() => navigation.goBack()}
        className="flex-row items-center gap-2"
      >
        <BackIcon width={24} height={24} fill="#4f8cff" />
        <Text className="text-[#B3B3B3] text-xl">Back</Text>
      </Pressable>

      <Text className="text-white text-2xl font-bold">{currentScreenName}</Text>

      <View className="w-20"></View>
    </View>
  );
}
