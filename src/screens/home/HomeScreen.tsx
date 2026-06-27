import { useNavigation } from "@react-navigation/native";
import { View, Text, Pressable } from "react-native";
import SettingsIcon from "../../assets/icons/settings.svg";
import ScannerIcon from "../../assets/icons/qr-scan.svg";
import NextIcon from "../../assets/icons/next.svg";
import QRIcon from "../../assets/icons/qr.svg";
import ConnectingIcon from "../../assets/icons/connecting.svg";
import PrimaryCard from "../../components/cards/PrimaryCard";
import { useResponsive } from "../../lib/utils/responsive.utils";

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const { sizes } = useResponsive();

  const circleLarge = sizes.containerXs;
  const circleMedium = circleLarge * 0.8;
  const circleSmall = circleLarge * 0.6;
  const iconSize = Math.min(sizes.iconXl, circleLarge * 0.3);

  return (
    <View className="p-5 h-full justify-between items-center">
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
      <View className="justify-center items-center gap-10">
        <View className="justify-center items-center">
          <View
            style={{
              width: circleLarge,
              height: circleLarge,
              position: 'absolute',
              borderRadius: circleLarge / 2,
              borderWidth: 1,
              borderColor: 'rgba(79, 140, 255, 0.25)',
            }}
          />
          <View
            style={{
              width: circleMedium,
              height: circleMedium,
              position: 'absolute',
              borderRadius: circleMedium / 2,
              borderWidth: 1,
              borderColor: 'rgba(79, 140, 255, 0.5)',
            }}
          />
          <View
            style={{
              width: circleSmall,
              height: circleSmall,
              position: 'absolute',
              borderRadius: circleSmall / 2,
              borderWidth: 1,
              borderColor: 'rgba(79, 140, 255, 0.75)',
            }}
          />
          <ConnectingIcon width={iconSize} height={iconSize} fill="#4f8cff" />
        </View>
        <View className="justify-center items-center gap-1">
          <Text className="text-white">Ready to Connect?</Text>
          <Text className="text-[#B3B3B3]">
            Share your digital profile instantly.
          </Text>
        </View>
      </View>
      <View className="w-full gap-4">
        <Pressable
          className="bg-[#4f8cff] py-5 px-3 flex-row items-center justify-between rounded-xl"
          onPress={() => {
            navigation.navigate("ScanQRScreen");
          }}
        >
          <View className="flex-row items-center gap-3">
            <ScannerIcon width={sizes.iconLg} height={sizes.iconLg} fill={"#ffffff"} />
            <View>
              <Text className="text-white text-xl font-semibold">Scan QR</Text>
              <Text className="text-white">Connect with new people</Text>
            </View>
          </View>
          <NextIcon width={sizes.iconLg} height={sizes.iconLg} fill={"#ffffff"} />
        </Pressable>
        <View className="flex-row justify-between items-center gap-3">
          <PrimaryCard
            icon={QRIcon}
            text="My QR"
            onPress={() => {
              navigation.navigate("SelectFieldsScreen");
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
  );
}
