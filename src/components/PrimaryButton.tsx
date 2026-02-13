import { Pressable, Text, View } from "react-native";
import AddIcon from "../assets/icons/add.svg";

type PrimaryButtonProps = {
  text: string;
  onPress?: () => void;
};

export default function PrimaryButton({ text, onPress }: PrimaryButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      className="w-full h-14 justify-center items-center bg-[#4f8cff] rounded-xl"
    >
      <View className="w-full flex-row justify-center items-center gap-2">
        <AddIcon width={18} height={18} fill={"#ffffff"}/>
        <Text className="text-white font-semibold text-lg">{text}</Text>
      </View>
    </Pressable>
  );
}
