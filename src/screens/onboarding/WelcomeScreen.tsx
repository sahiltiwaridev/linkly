import { View, Text } from "react-native";
import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import QRIcon from "../../assets/icons/qr.svg";
import UserIcon from "../../assets/icons/user.svg";
import ShareIcon from "../../assets/icons/share.svg";
import CreateIcon from "../../assets/icons/add.svg";
import FeatureHighlighter from "../../components/onboarding/FeatureHighlighter";
import { useResponsive } from "../../lib/utils/responsive.utils";

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
  const { sizes } = useResponsive();

  return (
    <View style={{ flex: 1, justifyContent: 'space-between', width: '100%', padding: sizes.spacing.lg }}>
      <View style={{ width: '100%', alignItems: 'center', gap: sizes.spacing.lg }}>
        <View
          style={{
            backgroundColor: '#1a1a1a',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: sizes.containerMd * 1.2,
            width: '100%',
            borderRadius: 18,
          }}
        >
          <View
            style={{
              backgroundColor: 'rgba(79, 140, 255, 0.15)',
              width: sizes.qrMedium,
              height: sizes.qrMedium,
              borderRadius: sizes.qrMedium / 2,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <QRIcon width={sizes.iconXl} height={sizes.iconXl} fill={"#4f8cff"} />
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

