import { View } from "react-native";
import React from "react";
import PrimaryInput from "../components/PrimaryInput";
import { useAccount } from "../context/account/AccountContextProvider";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import NextIcon from "../assets/icons/next.svg";
import PrimaryButton from "../components/PrimaryButton";

type RootStackParamList = {
  CreateProfileGenderScreen: undefined;
  CreateProfileEmailScreen: undefined;
};

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "CreateProfileGenderScreen"
>;

export default function CreateProfileProfessionScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { profession, setProfession } = useAccount();
  return (
    <View>
      <PrimaryInput
        label={"Profession"}
        value={profession}
        onChangeText={setProfession}
        placeholder={"e.g. Software Engineer"}
      />
      <View>
        <PrimaryButton
          icon={NextIcon}
          text="Next"
          onPress={() => {
            navigation.navigate("CreateProfileEmailScreen");
          }}
        />
      </View>
    </View>
  );
}
