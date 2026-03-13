import { View, Text, BackHandler } from "react-native";
import Header from "../../components/layout/Header";
import ContactIcon from "../../assets/icons/contacts.svg";
import NextIcon from "../../assets/icons/next.svg";
import PrimaryInput from "../../components/inputs/PrimaryInput";
import { useAccount } from "../../context/account/AccountContextProvider";
import { userEmailValidator } from "../../lib/validation/user.validators";
import { useState, useCallback } from "react";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const phoneValidator = (value: string): string | null => {
  if (!value) return null;
  if (value.length !== 10) return "Must be exactly 10 digits.";
  return null;
};

export default function ContactInfoScreen() {
  const navigation = useNavigation<any>();
  const { phone, setPhone, email, setEmail, resetAccount } = useAccount();
  const [emailError, setEmailError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const shortEmailError = emailError ? "Invalid email" : null;
  const shortPhoneError = phoneError ? "Invalid number" : null;

  const canProceed = !emailError && !phoneError;

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
          currentScreenName={"Contact Info"}
          backButtonProps={{ onPress: handleBack }}
        />

        <View className="items-center">
          <View className="bg-[#4f8cff]/15 w-28 h-28 rounded-full items-center justify-center">
            <ContactIcon width={50} height={50} fill="#4f8cff" />
          </View>
        </View>

        <View className="gap-1">
          <View className="flex-row items-center justify-between">
            <Text className="text-white text-xl font-bold">Phone</Text>
            {shortPhoneError && (
              <Text className="text-red-600 text-sm">{shortPhoneError}</Text>
            )}
          </View>
          <PrimaryInput
            value={phone}
            onChangeText={(text) => {
              const digits = text.replace(/\D/g, "").slice(0, 10);
              setPhone(digits);
              setPhoneError(phoneValidator(digits));
            }}
            placeholder="e.g. 9876543210"
            keyboardType="number-pad"
            maxLength={10}
          />
        </View>

        <View className="gap-1">
          <View className="flex-row items-center justify-between">
            <Text className="text-white text-xl font-bold">Email</Text>
            {shortEmailError && (
              <Text className="text-red-600 text-sm">{shortEmailError}</Text>
            )}
          </View>
          <PrimaryInput
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setEmailError(userEmailValidator(text));
            }}
            placeholder="e.g. name@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
      </View>

      <View className="mt-8">
        <PrimaryButton
          icon={NextIcon}
          text="Next"
          disabled={!canProceed}
          onPress={() => {
            navigation.navigate("ProfileLinksScreen");
          }}
        />
      </View>
    </View>
  );
}
