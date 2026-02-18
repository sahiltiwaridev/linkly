import { View, Text, TextInput } from "react-native";
import React, { useContext } from "react";
import { useAccount } from "../context/account/AccountContextProvider";
import PrimaryButton from "../components/PrimaryButton";
import SaveIcon from "../assets/icons/save.svg";
import { createUser } from "../lib/storage/user.storage";
import userContext from "../context/user/user.context";

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
    <View>
      <Text className="text-white text-lg">Short Bio</Text>
      <TextInput
        value={bio}
        onChangeText={setBio}
        placeholder="Briefly describe yourself"
        className="bg-[#222222] h-32 align-top w-full text-white rounded-md will-change-variable"
        multiline
        textAlignVertical="top"
        placeholderTextColor="#B3B3B3"
      />
      <View className="items-center gap-1">
        <PrimaryButton
          icon={SaveIcon}
          text="Save Profile"
          onPress={saveUserData}
        />
        <Text className="text-[#B3B3B3]">
          Your data is stored locally on this device
        </Text>
      </View>
    </View>
  );
}
