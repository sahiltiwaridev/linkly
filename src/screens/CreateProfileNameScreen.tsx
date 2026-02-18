import { View, Text } from "react-native";
import React, { useState } from "react";
import PrimaryInput from "../components/PrimaryInput";
import { useAccount } from "../context/account/AccountContextProvider";
import { userNameValidator } from "../lib/validation/user.validators";
import PrimaryButton from "../components/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import NextIcon from "../assets/icons/next.svg";

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
    <View className="w-full">
      <PrimaryInput
        label={"Full Name"}
        value={name}
        onChangeText={(text) => {
          setName(text);
          setNameError(userNameValidator(text));
        }}
        placeholder={"e.g. Tony Stark"}
      />
      {nameError && <Text className="text-red-600">{nameError}</Text>}
      <View>
        <PrimaryButton
          icon={NextIcon}
          text="Next"
          disabled={!canProceed}
          onPress={() => {
            navigation.navigate("CreateProfileGenderScreen");
          }}
        />
      </View>
    </View>
  );
}
