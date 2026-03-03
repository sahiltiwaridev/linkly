import React from "react";
import { Text, View } from "react-native";
import PrimaryInput from "../inputs/PrimaryInput";

interface EditProfileContactSectionProps {
  phone: string;
  whatsapp: string;
  email: string;
  shortPhoneError: string | null;
  shortWhatsappError: string | null;
  shortEmailError: string | null;
  onChangePhone: (value: string) => void;
  onChangeWhatsapp: (value: string) => void;
  onChangeEmail: (value: string) => void;
}

export default function EditProfileContactSection({
  phone,
  whatsapp,
  email,
  shortPhoneError,
  shortWhatsappError,
  shortEmailError,
  onChangePhone,
  onChangeWhatsapp,
  onChangeEmail,
}: EditProfileContactSectionProps) {
  return (
    <>
      <View className="gap-1">
        <View className="flex-row items-center justify-between">
          <Text className="text-white text-xl font-bold">Phone</Text>
          {shortPhoneError && (
            <Text className="text-red-600 text-sm">{shortPhoneError}</Text>
          )}
        </View>
        <PrimaryInput
          value={phone}
          onChangeText={onChangePhone}
          placeholder="e.g. 9876543210"
          keyboardType="number-pad"
          maxLength={10}
        />
      </View>

      <View className="gap-1">
        <View className="flex-row items-center justify-between">
          <Text className="text-white text-xl font-bold">WhatsApp</Text>
          {shortWhatsappError && (
            <Text className="text-red-600 text-sm">{shortWhatsappError}</Text>
          )}
        </View>
        <PrimaryInput
          value={whatsapp}
          onChangeText={onChangeWhatsapp}
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
          onChangeText={onChangeEmail}
          placeholder="e.g. name@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
    </>
  );
}
