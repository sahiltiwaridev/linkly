import { View, Text, ActivityIndicator } from "react-native";

export default function LoadingScreen() {
  return (
    <View className="justify-center items-center bg-[#0f0f0f] h-full gap-5">
      <ActivityIndicator size="large" color="#4f8cff" />
      <Text className="text-white">Hang on...</Text>
    </View>
  );
}
