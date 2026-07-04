import { View, Text, Pressable, BackHandler, Keyboard, TextInput } from "react-native";
import { useState, useCallback, useEffect } from "react";
import Header from "../../components/layout/Header";
import NutralIcon from "../../assets/icons/user.svg";
import MaleIcon from "../../assets/avatar/male-avatar.svg";
import FemaleIcon from "../../assets/avatar/female-avatar.svg";
import NextIcon from "../../assets/icons/next.svg";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useAccountStore } from "../../store/accountStore";
import { useResponsive } from "../../lib/utils/responsive.utils";
import { AccountStore } from "../../store/accountStore";
import PrimaryInput from "../../components/inputs/PrimaryInput";
import { userNameValidator } from "../../lib/validation/user.validators";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { Gender } from "../../types/user.types";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function BasicInfoScreen() {
  const navigation = useNavigation<any>();
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const name = useAccountStore((state: AccountStore) => state.name);
  const setName = useAccountStore((state: AccountStore) => state.setName);
  const gender = useAccountStore((state: AccountStore) => state.gender);
  const setGender = useAccountStore((state: AccountStore) => state.setGender);
  const profession = useAccountStore((state: AccountStore) => state.profession);
  const setProfession = useAccountStore((state: AccountStore) => state.setProfession);
  const bio = useAccountStore((state: AccountStore) => state.bio);
  const setBio = useAccountStore((state: AccountStore) => state.setBio);
  const resetAccount = useAccountStore((state: AccountStore) => state.resetAccount);

  const [nameError, setNameError] = useState<string | null>(null);

  const iconMap = {
    male: MaleIcon,
    female: FemaleIcon,
    neutral: NutralIcon,
  };

  const { sizes } = useResponsive();
  const SelectedIcon = iconMap[gender as Gender];
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

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () => setKeyboardVisible(true));
    const hideSub = Keyboard.addListener("keyboardDidHide", () => setKeyboardVisible(false));
    return () => { showSub.remove(); hideSub.remove(); };
  }, []);

  return (
    <View className="flex-1 p-5">
      <Header
        currentScreenName={"Personal Info"}
        backButtonProps={{ onPress: handleBack }}
      />
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 120, flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        enableOnAndroid
        enableAutomaticScroll
        extraScrollHeight={120}
        extraHeight={150}
      >
        <View className="gap-4 mt-4">
          <View className="items-center">
            <View
              style={{
                width: sizes.avatarLg,
                height: sizes.avatarLg,
                borderRadius: sizes.avatarLg / 2,
                backgroundColor: 'rgba(79, 140, 255, 0.15)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {SelectedIcon && (
                <SelectedIcon width={sizes.iconXl} height={sizes.iconXl} fill="#4f8cff" />
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
              placeholder="Enter your full name"
            />
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
                onPress={() => setGender('male')}
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
                onPress={() => setGender('female')}
              >
                <Text style={{ color: gender === 'female' ? '#4F8CFF' : '#ffffff' }}>
                  Female
                </Text>
              </Pressable>
            </View>
          </View>
          <View className="gap-2">
            <Text className="text-white text-2xl font-bold">What you do</Text>
            <PrimaryInput
              value={profession}
              onChangeText={setProfession}
              placeholder="Enter your profession or role"
            />
          </View>
          <View className="gap-2">
            <View className="flex-row justify-between">
              <Text className="text-white text-2xl font-bold">Quick intro</Text>
              <Text className="text-[#B3B3B3] text-right mt-2">{bio.length}/150</Text>
            </View>
            <TextInput
              value={bio}
              onChangeText={setBio}
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
        </View>
      </KeyboardAwareScrollView>
      {!keyboardVisible && (
        <PrimaryButton
          icon={NextIcon}
          text="Next"
          disabled={!canProceed}
          onPress={() => navigation.navigate("ContactInfoScreen")}
        />
      )}
    </View>
  );
}
