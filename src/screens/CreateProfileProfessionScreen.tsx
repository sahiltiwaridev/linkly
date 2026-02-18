import { Text, View } from "react-native";
import React from "react";
import PrimaryInput from "../components/PrimaryInput";
import { useAccount } from "../context/account/AccountContextProvider";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import NextIcon from "../assets/icons/next.svg";
import JobIcon from "../assets/icons/job.svg";
import PrimaryButton from "../components/PrimaryButton";
import { SafeAreaView } from "react-native-safe-area-context";

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
    <SafeAreaView>
      <View className="h-full w-full px-5 justify-between">
        <View className="w-full gap-5 items-center">
          <View className="bg-[#4f8cff]/15 w-40 h-40 rounded-full items-center justify-center">
            <JobIcon width={70} height={70} fill={"#4f8cff"} />
          </View>
          <Text className="text-white text-2xl font-bold">
            What do you do for a living?
          </Text>
          <PrimaryInput
            value={profession}
            onChangeText={setProfession}
            placeholder={"e.g. Software Engineer"}
          />
        </View>
        <PrimaryButton
          icon={NextIcon}
          text="Next"
          onPress={() => {
            navigation.navigate("CreateProfileEmailScreen");
          }}
        />
      </View>
    </SafeAreaView>
  );
}
