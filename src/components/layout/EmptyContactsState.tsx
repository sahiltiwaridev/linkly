import { View, Text } from "react-native";
import React from "react";
import PrimaryButton from "../buttons/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import ScanIcon from "../../assets/icons/qr-scan.svg";

export default function EmptyContactsState() {
  const navigation = useNavigation<any>();

  return (
    <View className="flex h-full justify-between">
      <View></View> 
      <View className="items-center">
        <Text className="font-bold text-white text-2xl text-center mb-2">
          No saved contacts yet
        </Text>
        <Text className="text-[#B3B3B3] text-lg text-center mb-6">
          Scan a Linkly QR to add one
        </Text>
      </View>
      <PrimaryButton
        onPress={() => navigation.navigate("ScanQRScreen")}
        text="Scan QR"
        icon={ScanIcon}
      />
    </View>
  );
}
