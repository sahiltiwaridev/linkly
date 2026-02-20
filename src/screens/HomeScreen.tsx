import { useNavigation } from "@react-navigation/native";
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SettingsIcon from "../assets/icons/settings.svg";
import ScannerIcon from "../assets/icons/qr-scan.svg";
import NextIcon from "../assets/icons/next.svg";
import QRIcon from "../assets/icons/qr.svg";
import PrimaryCard from "../components/PrimaryCard";

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  return (
    <SafeAreaView>
      <View className="px-5 h-full justify-between">
        <View className="w-full flex-row items-center justify-between">
          <Text className="text-white font-bold text-2xl">Linkly</Text>
          <Pressable
            onPress={() => {
              navigation.navigate("SettingsScreen");
            }}
          >
            <SettingsIcon width={24} height={24} fill={"#ffffff"} />
          </Pressable>
        </View>
        <View>
          <Pressable
            className="bg-[#4f8cff] p-3 flex-row items-center justify-between rounded-xl"
            onPress={() => {
              navigation.navigate("ScanQRScreen");
            }}
          >
            <View className="flex-row items-center gap-3">
              <ScannerIcon width={24} height={24} fill={"#ffffff"} />
              <View>
                <Text className="text-white text-xl font-semibold">
                  Scan QR
                </Text>
                <Text className="text-white">Connect with new people</Text>
              </View>
            </View>
            <NextIcon width={24} height={24} fill={"#ffffff"} />
          </Pressable>
          <View className="flex-row justify-between items-center">
            <PrimaryCard
              icon={QRIcon}
              text="My Code"
              onPress={() => {
                navigation.navigate("MyQRScreen");
              }}
            />

            <PrimaryCard
              icon={QRIcon}
              text="Saved"
              onPress={() => {
                navigation.navigate("SavedProfilesScreen");
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
