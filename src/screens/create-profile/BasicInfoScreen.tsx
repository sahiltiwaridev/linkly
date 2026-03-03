import { View, Text, Pressable, BackHandler } from "react-native";
import { useState, useCallback } from "react";
import Header from "../../components/layout/Header";
import NutralIcon from "../../assets/icons/user.svg";
import MaleIcon from "../../assets/avatar/male-avatar.svg";
import FemaleIcon from "../../assets/avatar/female-avatar.svg";
import NextIcon from "../../assets/icons/next.svg";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useAccount } from "../../context/account/AccountContextProvider";
import PrimaryInput from "../../components/inputs/PrimaryInput";
import { userNameValidator } from "../../lib/validation/user.validators";
import PrimaryButton from "../../components/buttons/PrimaryButton";

export default function BasicInfoScreen() {
  const navigation = useNavigation<any>();
  const { name, setName, gender, setGender, resetAccount } = useAccount();
  const [nameError, setNameError] = useState<string | null>(null);
  const iconMap = {
    male: MaleIcon,
    female: FemaleIcon,
    neutral: NutralIcon,
  };
  const SelectedIcon = iconMap[gender];
  const canProceed = !nameError && name.length > 0;
  const shortNameError = !nameError
    ? null
    : nameError === "Name is required"
      ? "Required"
      : nameError === "Name must be at least 3 characters"
        ? "Too short"
        : "Invalid name";

  const handleBack = useCallback(() => {
    resetAccount();
    navigation.goBack();
  }, [navigation, resetAccount]);

  useFocusEffect(
    useCallback(() => {
      const sub = BackHandler.addEventListener("hardwareBackPress", () => {
        handleBack();
        return true;
      });

      return () => sub.remove();
    }, [handleBack]),
  );

  return (
    <View className="p-5 h-full justify-between">
      <View className="gap-4">
        <Header
          currentScreenName={"Basic Info"}
          backButtonProps={{ onPress: handleBack }}
        />
        <View className="items-center">
          <View className="bg-[#4f8cff]/15 w-28 h-28 rounded-full items-center justify-center">
            {SelectedIcon && (
              <SelectedIcon width={50} height={50} fill="#4f8cff" />
            )}
          </View>
        </View>
        <View className="gap-2">
          <View className="flex-row items-center justify-between">
            <Text className="text-white text-2xl font-bold">Full name</Text>
            {shortNameError && (
              <Text className="text-red-600 text-sm">{shortNameError}</Text>
            )}
          </View>
          <PrimaryInput
            value={name}
            onChangeText={(text) => {
              setName(text);
              setNameError(userNameValidator(text));
            }}
            placeholder={"e.g. Tony Stark"}
          />
        </View>
        <View className="gap-2">
          <Text className="text-white text-2xl font-bold">Gender</Text>
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


