import { View, Text, Pressable } from "react-native";
import React from "react";
import { useAccount } from "../context/account/AccountContextProvider";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import PrimaryButton from "../components/PrimaryButton";
import NextIcon from "../assets/icons/next.svg";
import NutralIcon from "../assets/icons/user.svg";
import MaleIcon from "../assets/avatar/male-avatar.svg";
import FemaleIcon from "../assets/avatar/female-avatar.svg";
import { SafeAreaView } from "react-native-safe-area-context";

type RootStackParamList = {
  CreateProfileGenderScreen: undefined;
  CreateProfileProfessionScreen: undefined;
};

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "CreateProfileGenderScreen"
>;

export default function CreateProfileGenderScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { gender, setGender } = useAccount();

  const iconMap = {
    male: MaleIcon,
    female: FemaleIcon,
    neutral: NutralIcon,
  };

  const SelectedIcon = iconMap[gender];

  return (
    <View className="h-full w-full p-5 justify-between">
      <View className="w-full gap-5 items-center">
        <View className="bg-[#4f8cff]/15 w-40 h-40 rounded-full items-center justify-center">
          {SelectedIcon && (
            <SelectedIcon width={70} height={70} fill="#4f8cff" />
          )}
        </View>
        <Text className="text-white text-2xl font-bold">Gender (Optional)</Text>
        <View className="flex-row w-full h-12 justify-between">
          <Pressable
            className="bg-[#222222] w-[49%] h-fit items-center justify-center rounded-md"
            onPress={() => setGender("male")}
          >
            <Text style={{ color: gender === "male" ? "#4F8CFF" : "#ffffff" }}>
              Male
            </Text>
          </Pressable>
          <Pressable
            className="bg-[#222222] w-[49%] h-fit items-center justify-center rounded-md"
            onPress={() => setGender("female")}
          >
            <Text
              style={{ color: gender === "female" ? "#4F8CFF" : "#ffffff" }}
            >
              Female
            </Text>
          </Pressable>
        </View>
      </View>
      <View>
        <PrimaryButton
          icon={NextIcon}
          text="Next"
          onPress={() => {
            navigation.navigate("CreateProfileProfessionScreen");
          }}
        />
      </View>
    </View>
  );
}
