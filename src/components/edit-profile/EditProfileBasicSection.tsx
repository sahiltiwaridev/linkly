import React from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import PrimaryInput from "../inputs/PrimaryInput";
import NutralIcon from "../../assets/icons/user.svg";
import MaleIcon from "../../assets/avatar/male-avatar.svg";
import FemaleIcon from "../../assets/avatar/female-avatar.svg";

type Gender = "male" | "female" | "neutral";

interface EditProfileBasicSectionProps {
  gender: Gender;
  name: string;
  profession: string;
  bio: string;
  shortNameError: string | null;
  onChangeGender: (value: Gender) => void;
  onChangeName: (value: string) => void;
  onChangeProfession: (value: string) => void;
  onChangeBio: (value: string) => void;
}

export default function EditProfileBasicSection({
  gender,
  name,
  profession,
  bio,
  shortNameError,
  onChangeGender,
  onChangeName,
  onChangeProfession,
  onChangeBio,
}: EditProfileBasicSectionProps) {
  const iconMap = {
    male: MaleIcon,
    female: FemaleIcon,
    neutral: NutralIcon,
  };

  const SelectedIcon = iconMap[gender];

  return (
    <>
      <View className="bg-[#4f8cff]/15 w-28 h-28 rounded-full items-center justify-center self-center">
        {SelectedIcon && <SelectedIcon width={50} height={50} fill="#4f8cff" />}
      </View>

      <View className="gap-2">
        <Text className="text-white text-2xl font-bold">Gender</Text>
        <View className="flex-row w-full h-12 justify-between">
          <Pressable
            className="bg-[#222222] w-[49%] h-fit items-center justify-center rounded-md"
            onPress={() => onChangeGender("male")}
          >
            <Text style={{ color: gender === "male" ? "#4F8CFF" : "#ffffff" }}>
              Male
            </Text>
          </Pressable>
          <Pressable
            className="bg-[#222222] w-[49%] h-fit items-center justify-center rounded-md"
            onPress={() => onChangeGender("female")}
          >
            <Text style={{ color: gender === "female" ? "#4F8CFF" : "#ffffff" }}>
              Female
            </Text>
          </Pressable>
        </View>
      </View>

      <View className="flex-row items-center justify-between">
        <Text className="text-white text-2xl font-bold">Full name</Text>
        {shortNameError && (
          <Text className="text-red-600 text-sm">{shortNameError}</Text>
        )}
      </View>
      <PrimaryInput
        value={name}
        onChangeText={onChangeName}
        placeholder="e.g. Tony Stark"
      />

      <View className="gap-2">
        <Text className="text-white text-2xl font-bold">Profession</Text>
        <PrimaryInput
          value={profession}
          onChangeText={onChangeProfession}
          placeholder="e.g. Software Engineer"
        />
      </View>

      <View className="gap-2">
        <View className="flex-row justify-between">
          <Text className="text-white text-2xl font-bold">Bio</Text>
          <Text className="text-[#B3B3B3] text-right mt-2">{bio.length}/150</Text>
        </View>
        <TextInput
          value={bio}
          onChangeText={onChangeBio}
          placeholder="Briefly describe yourself"
          className="bg-[#222222] p-5 h-32 w-full text-white rounded-md"
          multiline
          textAlignVertical="top"
          placeholderTextColor="#B3B3B3"
          maxLength={150}
        />
      </View>
    </>
  );
}
