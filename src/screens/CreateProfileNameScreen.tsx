import { View, Text } from "react-native";
import React, { useState } from "react";
import PrimaryInput from "../components/PrimaryInput";
import { useAccount } from "../context/account/AccountContextProvider";
import { userNameValidator } from "../lib/validation/user.validators";
import PrimaryButton from "../components/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import NextIcon from "../assets/icons/next.svg";
import NameScreenIcon from "../assets/icons/user.svg";
import { SafeAreaView } from "react-native-safe-area-context";

type RootStackParamList = {
  CreateProfileNameScreen: undefined;
  CreateProfileGenderScreen: undefined;
};

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "CreateProfileNameScreen"
>;

export default function CreateProfileNameScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { name, setName } = useAccount();
  const [nameError, setNameError] = useState<string | null>(null);

  const canProceed = !nameError && name.length > 0;
  return (
    <SafeAreaView>
      <View className="h-full w-full px-5 justify-between">
        <View className="w-full gap-5 items-center">
          <View className="bg-[#4f8cff]/15 w-40 h-40 rounded-full items-center justify-center">
            <NameScreenIcon width={70} height={70} fill={"#4f8cff"} />
          </View>
          <Text className="text-white text-2xl font-bold">
            What's your name?
          </Text>
          <PrimaryInput
            value={name}
            onChangeText={(text) => {
              setName(text);
              setNameError(userNameValidator(text));
            }}
            placeholder={"e.g. Tony Stark"}
          />
          {nameError && <Text className="text-red-600">{nameError}</Text>}
        </View>
        <PrimaryButton
          icon={NextIcon}
          text="Next"
          disabled={!canProceed}
          onPress={() => {
            navigation.navigate("CreateProfileGenderScreen");
          }}
        />
      </View>
    </SafeAreaView>
  );
}
