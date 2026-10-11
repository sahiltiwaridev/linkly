import { View, Text, Switch, Alert } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import * as LocalAuthentication from "expo-local-authentication";
import Header from "../../components/layout/Header";
import { authenticate } from "../../lib/validation/biomatrics.validators";
import {
  isBiometricLockEnabled,
  setBiometricLock,
} from "../../lib/storage/settings.storage";

export default function BiomatricsLockScreen() {
  const navigation = useNavigation<any>();
  const [enabled, setEnabled] = useState(isBiometricLockEnabled());
  const [busy, setBusy] = useState(false);

  const onToggle = async (next: boolean) => {
    if (busy) return;
    setBusy(true);
    try {
      if (next) {
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        const enrolled = await LocalAuthentication.isEnrolledAsync();
        if (!hasHardware || !enrolled) {
          Alert.alert(
            "No screen lock found",
            "Set up a PIN, pattern or fingerprint in your phone settings first.",
          );
          return;
        }
      }

      const ok = await authenticate();
      if (!ok) return;

      setBiometricLock(next);
      setEnabled(next);
    } finally {
      setBusy(false);
    }
  };

  return (
    <View className="flex-1 p-5">
      <Header
        currentScreenName={"Screen Lock"}
        backButtonProps={{ onPress: () => navigation.goBack() }}
      />
      <View
        style={{
          marginTop: 24,
          backgroundColor: "#1A1A1A",
          borderRadius: 16,
          padding: 16,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flex: 1, paddingRight: 12 }}>
          <Text className="text-white font-bold text-lg">App lock</Text>
          <Text className="text-[#B3B3B3]">
            Ask for your phone's fingerprint, face or PIN when Linkly opens.
          </Text>
        </View>
        <Switch
          value={enabled}
          onValueChange={onToggle}
          disabled={busy}
          trackColor={{ false: "#3a3a3a", true: "#4f8cff" }}
        />
      </View>
    </View>
  );
}