import { View, Text } from "react-native";
import React, { useState } from "react";
import PrimaryInput from "../components/PrimaryInput";
import { useAccount } from "../context/account/AccountContextProvider";
import { userEmailValidator } from "../lib/validation/user.validators";
import PrimaryButton from "../components/PrimaryButton";
import NextIcon from "../assets/icons/next.svg";
import MailIcon from "../assets/icons/mail.svg";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

type RootStackParamList = {
  CreateProfileEmailScreen: undefined;
  CreateProfileBioScreen: undefined;
};

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "CreateProfileEmailScreen"
>;

export default function CreateProfileEmailScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { email, setEmail } = useAccount();
  const [emailError, setEmailError] = useState<string | null>(null);

  const canProceed = !emailError;
  return (
    <View className="h-full w-full p-5 justify-between">
      <View className="w-full gap-5 items-center">
        <View className="bg-[#4f8cff]/15 w-40 h-40 rounded-full items-center justify-center">
          <MailIcon width={80} height={80} fill={"#4f8cff"} />
        </View>
        <Text className="text-white text-2xl font-bold">
          What's your mail address?
        </Text>
        <PrimaryInput
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setEmailError(userEmailValidator(text));
          }}
          placeholder={"e.g. name@example.com"}
        />

        {emailError && <Text className="text-red-600">{emailError}</Text>}
      </View>
      <PrimaryButton
        icon={NextIcon}
        text="Save Profile"
        disabled={!canProceed}
        onPress={() => {
          navigation.navigate("CreateProfileBioScreen");
        }}
      />
    </View>
  );
}
