import { View, Text } from "react-native";
import React, { useState } from "react";
import PrimaryInput from "../components/PrimaryInput";
import { useAccount } from "../context/account/AccountContextProvider";
import { userEmailValidator } from "../lib/validation/user.validators";
import PrimaryButton from "../components/PrimaryButton";
import NextIcon from "../assets/icons/next.svg";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

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
    <View>
      <PrimaryInput
        label={"Email ID"}
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setEmailError(userEmailValidator(text));
        }}
        placeholder={"e.g. name@example.com"}
      />

      {emailError && <Text className="text-red-600">{emailError}</Text>}
      <View>
        <PrimaryButton
          icon={NextIcon}
          text="Save Profile"
          disabled={!canProceed}
          onPress={() => {
            navigation.navigate("CreateProfileBioScreen");
          }}
        />
      </View>
    </View>
  );
}
