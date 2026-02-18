import { View, Text, TextInput } from "react-native";
import React, { useContext } from "react";
import { useAccount } from "../context/account/AccountContextProvider";
import PrimaryButton from "../components/PrimaryButton";
import SaveIcon from "../assets/icons/save.svg";
import BioIcon from "../assets/icons/user-bio.svg";
import LockIcon from "../assets/icons/secure.svg";
import { createUser } from "../lib/storage/user.storage";
import userContext from "../context/user/user.context";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreateProfileBioScreen() {
  const { name, gender, profession, email, bio, setBio } = useAccount();
  const { setHasAccount } = useContext(userContext)!;
  const saveUserData = () => {
    try {
      createUser({ name, gender, profession, email, bio });
      setHasAccount(true);
    } catch {
      alert("Something went wrong! Please try again.");
    }
  };
  return (
    <SafeAreaView>
      <View className="h-full w-full px-5 justify-between">
        <View className="w-full gap-5 items-center">
          <View className="bg-[#4f8cff]/15 w-40 h-40 rounded-full items-center justify-center">
            <BioIcon width={70} height={70} fill={"#4f8cff"} />
          </View>
          <Text className="text-white text-2xl font-bold">Short Bio?</Text>
          <TextInput
            value={bio}
            onChangeText={setBio}
            placeholder="Briefly describe yourself"
            className="bg-[#222222] p-5 h-52 align-top w-full text-white rounded-md will-change-variable"
            multiline
            textAlignVertical="top"
            placeholderTextColor="#B3B3B3"
          />
        </View>
        <View className="items-center gap-3">
          <PrimaryButton
            icon={SaveIcon}
            text="Save Profile"
            onPress={saveUserData}
          />
          <View className="flex-row items-center gap-1">
            <LockIcon width={12} height={12} fill={"#4f8cff"} />
            <Text className="text-[#B3B3B3]">
              Your data is stored locally on this device
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
