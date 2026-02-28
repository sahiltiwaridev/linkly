import { View, Text, Pressable } from "react-native";
import Header from "../components/Header";
import ContactIcon from "../assets/icons/contacts.svg";
import NextIcon from "../assets/icons/next.svg";
import PrimaryInput from "../components/PrimaryInput";
import { useAccount } from "../context/account/AccountContextProvider";
import { userEmailValidator } from "../lib/validation/user.validators";
import { useState, useEffect } from "react";
import PrimaryButton from "../components/PrimaryButton";
import { useNavigation } from "@react-navigation/native";

const phoneValidator = (value: string): string | null => {
  if (!value) return null;
  if (value.length !== 10) return "Must be exactly 10 digits.";
  return null;
};

export default function ContactInfoScreen() {
  const navigation = useNavigation<any>();
  const { phone, setPhone, whatsapp, setWhatsapp, email, setEmail } =
    useAccount();
  const [emailError, setEmailError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [whatsappError, setWhatsappError] = useState<string | null>(null);
  const [sameAsPhone, setSameAsPhone] = useState(false);

  useEffect(() => {
    if (sameAsPhone) {
      setWhatsapp(phone);
      setWhatsappError(phoneValidator(phone));
    }
  }, [phone, sameAsPhone]);

  const canProceed = !emailError && !phoneError && !whatsappError;

  return (
    <View className="p-5 h-full justify-between">
      <View className="gap-4">
        <Header currentScreenName={"About Info"} />

        <View className="items-center">
          <View className="bg-[#4f8cff]/15 w-28 h-28 rounded-full items-center justify-center">
            <ContactIcon width={50} height={50} fill="#4f8cff" />
          </View>
        </View>

        {/* Phone */}
        <View className="gap-1">
          <Text className="text-white text-xl font-bold">
            Your phone number?
          </Text>

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

          {phoneError && <Text className="text-red-600">{phoneError}</Text>}
        </View>

        {/* Checkbox */}
        <Pressable
          onPress={() => setSameAsPhone((prev) => !prev)}
          className="flex-row items-center gap-3"
        >
          <View
            className={`w-5 h-5 border rounded-sm items-center justify-center ${
              sameAsPhone ? "bg-[#4f8cff] border-[#4f8cff]" : "border-gray-400"
            }`}
          >
            {sameAsPhone && (
              <Text className="text-white text-xs font-bold">✓</Text>
            )}
          </View>
          <Text className="text-[#B3B3B3]">
            WhatsApp number is same as phone number
          </Text>
        </Pressable>

        {/* WhatsApp */}
        {!sameAsPhone && (
          <View className="gap-1">
            <Text className="text-white text-xl font-bold">
              Your WhatsApp number?
            </Text>

            <PrimaryInput
              value={whatsapp}
              onChangeText={(text) => {
                const digits = text.replace(/\D/g, "").slice(0, 10);
                setWhatsapp(digits);
                setWhatsappError(phoneValidator(digits));
              }}
              placeholder="e.g. 9876543210"
              keyboardType="number-pad"
              maxLength={10}
            />

            {whatsappError && (
              <Text className="text-red-600">{whatsappError}</Text>
            )}
          </View>
        )}

        {/* Email */}
        <View className="gap-1">
          <Text className="text-white text-xl font-bold">
            What's your mail address?
          </Text>

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

          {emailError && <Text className="text-red-600">{emailError}</Text>}
        </View>
      </View>

      <PrimaryButton
        icon={NextIcon}
        text="Next"
        disabled={!canProceed}
        onPress={() => {
          navigation.navigate("ProfileLinksScreen");
        }}
      />
    </View>
  );
}
