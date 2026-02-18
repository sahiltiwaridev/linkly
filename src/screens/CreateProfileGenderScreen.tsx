import { View, Text, Pressable } from "react-native";
import React from "react";
import { useAccount } from "../context/account/AccountContextProvider";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import PrimaryButton from "../components/PrimaryButton";
import NextIcon from "../assets/icons/next.svg";

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
  return (
    <View>
      <View className="h-28 w-28 bg-[#1A1A1A] rounded-full"></View>
      <Text className="text-white text-lg">Gender (Optional)</Text>
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
          <Text style={{ color: gender === "female" ? "#4F8CFF" : "#ffffff" }}>
            Female
          </Text>
        </Pressable>
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
