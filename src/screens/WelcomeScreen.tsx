import { View, Text } from "react-native";
import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import PrimaryButton from "../components/PrimaryButton";
import QRIcon from "../assets/icons/qr.svg";
import UserIcon from "../assets/icons/user.svg";
import ShareIcon from "../assets/icons/share.svg";
import CreateIcon from "../assets/icons/add.svg";
import FeatureHighlighter from "../components/FeatureHighlighter";

type RootStackParamList = {
  WelcomeScreen: undefined;
  CreateProfileStack: undefined;
  HomeScreen: undefined;
};

type WelcomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "WelcomeScreen"
>;

export default function WelcomeScreen() {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  return (
    <View className="justify-between h-full w-full p-5">
      <View className="w-full items-center gap-5">
        <View className="bg-[#1a1a1a] items-center justify-center h-60 w-full rounded-xl">
          <View className="bg-[#4f8cff]/15 w-52 h-52 rounded-full items-center justify-center">
            <QRIcon width={80} height={80} fill={"#4f8cff"} />
          </View>
        </View>
        <View className="items-center">
          <Text className="text-white text-4xl font-bold">
            Welcome to Linkly
          </Text>
          <Text className="text-[#b3b3b3]">
            Offline profile sharing made simple.
          </Text>
        </View>
        <FeatureHighlighter
          icon={UserIcon}
          headingText={"Create your profile"}
          primaryText={"Set up your digital card securely on your device."}
        />
        <FeatureHighlighter
          icon={ShareIcon}
          headingText={"Share it using QR"}
          primaryText={"Let others scan your code to connect instantly."}
        />
        <FeatureHighlighter
          icon={QRIcon}
          headingText={"Scan and save others"}
          primaryText={"Build your network without the internet."}
        />
      </View>
      <PrimaryButton
        icon={CreateIcon}
        text="Create Profile"
        onPress={() => navigation.navigate("CreateProfileStack")}
      />
    </View>
  );
}
