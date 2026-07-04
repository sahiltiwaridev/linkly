import React from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import PrimaryInput from "../inputs/PrimaryInput";
import NutralIcon from "../../assets/icons/user.svg";
import MaleIcon from "../../assets/avatar/male-avatar.svg";
import FemaleIcon from "../../assets/avatar/female-avatar.svg";
import { useResponsive } from "../../lib/utils/responsive.utils";

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
  const { sizes } = useResponsive();

  return (
    <>
      <View
        style={{
          width: sizes.avatarLg,
          height: sizes.avatarLg,
          borderRadius: sizes.avatarLg / 2,
          backgroundColor: 'rgba(79, 140, 255, 0.15)',
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
        }}
      >
        {SelectedIcon && (
          <SelectedIcon width={sizes.iconXl} height={sizes.iconXl} fill="#4f8cff" />
        )}
      </View>

      <View className="gap-2">
        <Text className="text-white text-2xl font-bold">Gender</Text>
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', gap: sizes.spacing.sm }}>
          <Pressable
            style={{
              flex: 1,
              backgroundColor: '#222222',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 12,
              paddingVertical: sizes.spacing.sm,
            }}
            onPress={() => onChangeGender('male')}
          >
            <Text style={{ color: gender === 'male' ? '#4F8CFF' : '#ffffff' }}>
              Male
            </Text>
          </Pressable>
          <Pressable
            style={{
              flex: 1,
              backgroundColor: '#222222',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 12,
              paddingVertical: sizes.spacing.sm,
            }}
            onPress={() => onChangeGender('female')}
          >
            <Text style={{ color: gender === 'female' ? '#4F8CFF' : '#ffffff' }}>
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
        placeholder="Enter your full name"
      />

      <View className="gap-2">
        <Text className="text-white text-2xl font-bold">Profession</Text>
        <PrimaryInput
          value={profession}
          onChangeText={onChangeProfession}
          placeholder="Enter your profession or role"
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
          placeholder="Write a short intro about yourself"
          style={{
            backgroundColor: '#222222',
            padding: sizes.spacing.lg,
            minHeight: sizes.containerSm,
            width: '100%',
            color: '#ffffff',
            borderRadius: 12,
          }}
          multiline
          textAlignVertical="top"
          placeholderTextColor="#B3B3B3"
          maxLength={150}
        />
      </View>
    </>
  );
}
