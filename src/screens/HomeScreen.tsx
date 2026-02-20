import { useNavigation } from "@react-navigation/native";
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SettingsIcon from "../assets/icons/settings.svg";
import ScannerIcon from "../assets/icons/qr-scan.svg";
import NextIcon from "../assets/icons/next.svg";
import QRIcon from "../assets/icons/qr.svg";
import ConnectingIcon from "../assets/icons/connecting.svg";
import PrimaryCard from "../components/PrimaryCard";

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  return (
    <SafeAreaView>
      <View className="px-5 h-full justify-between items-center">
        <View className="w-full flex-row items-center justify-between">
          <View className="flex-row items-center justify-between gap-3">
            <QRIcon width={24} height={24} fill={"#4f8cff"} />
            <Text className="text-white font-bold text-2xl">Linkly</Text>
          </View>
          <Pressable
            onPress={() => {
              navigation.navigate("SettingsScreen");
            }}
          >
            <SettingsIcon width={24} height={24} fill={"#ffffff"} />
          </Pressable>
        </View>
        <View className="h-56 w-56 justify-center items-center">
          <View className="absolute h-60 w-60 rounded-full border border-[#4f8cff]/25" />
          <View className="absolute h-48 w-48 rounded-full border border-[#4f8cff]/50" />
          <View className="absolute h-36 w-36 rounded-full border border-[#4f8cff]/75" />
          <ConnectingIcon width={72} height={72} fill="#4f8cff" />
        </View>
        <View className="w-full gap-4">
          <Pressable
            className="bg-[#4f8cff] py-5 px-3 flex-row items-center justify-between rounded-xl"
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
