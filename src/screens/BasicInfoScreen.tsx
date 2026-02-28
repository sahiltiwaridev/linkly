import { View, Text, Pressable } from "react-native";
import { useState } from "react";
import Header from "../components/Header";
import NutralIcon from "../assets/icons/user.svg";
import MaleIcon from "../assets/avatar/male-avatar.svg";
import FemaleIcon from "../assets/avatar/female-avatar.svg";
import NextIcon from "../assets/icons/next.svg";
import { useNavigation } from "@react-navigation/native";
import { useAccount } from "../context/account/AccountContextProvider";
import PrimaryInput from "../components/PrimaryInput";
import { userNameValidator } from "../lib/validation/user.validators";
import PrimaryButton from "../components/PrimaryButton";

export default function BasicInfoScreen() {
  const navigation = useNavigation<any>();
  const { name, setName, gender, setGender } = useAccount();
  const [nameError, setNameError] = useState<string | null>(null);
  const iconMap = {
    male: MaleIcon,
    female: FemaleIcon,
    neutral: NutralIcon,
  };
  const SelectedIcon = iconMap[gender];
  const canProceed = !nameError && name.length > 0;

  return (
    <View className="p-5 h-full justify-between">
      <View className="gap-4">
        <Header currentScreenName={"Basic Info"} />
        <View className="items-center">
          <View className="bg-[#4f8cff]/15 w-28 h-28 rounded-full items-center justify-center">
            {SelectedIcon && (
              <SelectedIcon width={50} height={50} fill="#4f8cff" />
            )}
          </View>
        </View>
        <View className="gap-2">
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
        </View>
        {nameError && <Text className="text-red-600">{nameError}</Text>}
        <View className="gap-2">
          <Text className="text-white text-2xl font-bold">
            Gender (Optional)
          </Text>
          <View className="flex-row w-full h-12 justify-between">
            <Pressable
              className="bg-[#222222] w-[49%] h-fit items-center justify-center rounded-md"
              onPress={() => setGender("male")}
            >
              <Text
                style={{ color: gender === "male" ? "#4F8CFF" : "#ffffff" }}
              >
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
      </View>

      <PrimaryButton
        icon={NextIcon}
        text="Next"
        disabled={!canProceed}
        onPress={() => {
          navigation.navigate("AboutInfoScreen");
        }}
      />
    </View>
  );
}
