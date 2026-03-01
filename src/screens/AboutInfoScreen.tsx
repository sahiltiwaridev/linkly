import { View, Text, TextInput, BackHandler } from "react-native";
import { useCallback } from "react";
import Header from "../components/Header";
import AboutIcon from "../assets/icons/about.svg";
import NextIcon from "../assets/icons/next.svg";
import { useAccount } from "../context/account/AccountContextProvider";
import PrimaryInput from "../components/PrimaryInput";
import PrimaryButton from "../components/PrimaryButton";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

export default function AboutInfoScreen() {
  const navigation = useNavigation<any>();
  const { profession, setProfession, bio, setBio, resetAccount } = useAccount();

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
          currentScreenName={"About Info"}
          backButtonProps={{ onPress: handleBack }}
        />
        <View className="items-center">
          <View className="bg-[#4f8cff]/15 w-28 h-28 rounded-full items-center justify-center">
            <AboutIcon width={50} height={50} fill="#4f8cff" />
          </View>
        </View>
        <View className="gap-2">
          <Text className="text-white text-2xl font-bold">What you do</Text>
          <PrimaryInput
            value={profession}
            onChangeText={setProfession}
            placeholder={"e.g. Software Engineer"}
          />
        </View>
        <View className="gap-2">
          <View className="flex-row justify-between">
            <Text className="text-white text-2xl font-bold">Quick intro</Text>
            <Text className="text-[#B3B3B3] text-right mt-2">
              {bio.length}/150
            </Text>
          </View>
          <TextInput
            value={bio}
            onChangeText={setBio}
            placeholder="Briefly describe yourself"
            className="bg-[#222222] p-5 h-32 w-full text-white rounded-md"
            multiline
            textAlignVertical="top"
            placeholderTextColor="#B3B3B3"
            maxLength={150}
          />
        </View>
      </View>
      <PrimaryButton
        icon={NextIcon}
        text="Next"
        onPress={() => {
          navigation.navigate("ContactInfoScreen");
        }}
      />
    </View>
  );
}
