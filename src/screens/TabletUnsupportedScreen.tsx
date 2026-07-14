import { BackHandler, Platform, SafeAreaView, Text, View } from "react-native";
import PrimaryButton from "../components/buttons/PrimaryButton";

export default function TabletUnsupportedScreen() {
  const handleCloseApp = () => {
    if (Platform.OS === "android") {
      BackHandler.exitApp();
      return;
    }

    console.warn("Tablet support is not available on this platform.");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0f0f0f]">
      <View className="flex-1 items-center justify-center px-6">
        <View className="w-full rounded-[28px] bg-[#121212] p-8 shadow-none">
          <Text className="text-white text-3xl font-bold text-center">
            Tablet Support Coming Soon
          </Text>
          <Text className="text-[#B3B3B3] text-base text-center leading-7 mt-4">
            Linkly is currently optimized for phones. Tablet support is planned
            for a future update.
          </Text>
          <View className="mt-8 w-full">
            <PrimaryButton text="Close App" onPress={handleCloseApp} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
