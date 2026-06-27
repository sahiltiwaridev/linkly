import React, { useState } from "react";
import { View, Text, Linking } from "react-native";
import Constants from "expo-constants";
import * as Network from "expo-network";

import CheckingIcon from "../../assets/icons/rotate.svg";
import UpdateIcon from "../../assets/icons/update.svg";

import Header from "../../components/layout/Header";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import ConfirmModal from "../../components/modals/ConfirmModal";

interface UpdateData {
  latestVersion: string;
  versionCode: number;
  apkUrl: string;
  releaseNotes: string[];
}

const isNewer = (latest: string, current: string): boolean => {
  const l = latest.split(".").map(Number);
  const c = current.split(".").map(Number);
  for (let i = 0; i < 3; i++) {
    if (l[i] > c[i]) return true;
    if (l[i] < c[i]) return false;
  }
  return false;
};

export default function UpdateLinklyScreen({ navigation }: any) {
  const appVersion = Constants.expoConfig?.version ?? Constants.manifest?.version ?? "Unknown";
  // const appVersion = "0.9.0";

  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [updateData, setUpdateData] = useState<UpdateData | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [showOfflineModal, setShowOfflineModal] = useState(false);

  const checkInternet = async () => {
    const state = await Network.getNetworkStateAsync();
    return state.isConnected && state.isInternetReachable;
  };

  const fetchUpdateData = async (): Promise<UpdateData | null> => {
    const response = await fetch("https://linkly-website.vercel.app/src/public/update.json");
    if (!response.ok) throw new Error("Failed to fetch");
    const data: UpdateData = await response.json();
    if (isNewer(data.latestVersion, appVersion)) {
      return data;
    }
    return null;
  };

  const handleCheckForUpdates = async () => {
    const isOnline = await checkInternet();

    if (!isOnline) {
      setShowOfflineModal(true);
      return;
    }

    try {
      const data = await fetchUpdateData();
      if (data) {
        setUpdateAvailable(true);
        setUpdateData(data);
        setMessage(null);
      } else {
        setMessage("You're on the latest version.");
      }
    } catch {
      setMessage("Unable to check for updates. Try again.");
    }
  };

  const handleUpdate = () => {
    if (updateData?.apkUrl) {
      Linking.openURL(updateData.apkUrl);
    }
  };

  return (
    <View className="p-5 h-full justify-between">
      <View>
        <View className="pb-10">
          <Header
            currentScreenName="Update"
            backButtonProps={{
              onPress: () => navigation.goBack(),
            }}
          />
        </View>

        <View className="gap-4">
          <Text className="text-lg text-[#B3B3B3]">
            Current Version: {appVersion}
          </Text>

          {message && (
            <Text className="text-lg text-green-500 font-semibold">
              {message}
            </Text>
          )}

          {!updateAvailable ? (
            <>
              <Text className="text-lg text-[#B3B3B3]">
                Manually check if a newer version is available.
              </Text>
              <Text className="text-lg text-[#B3B3B3]">
                Updates may include improvements and new features.
              </Text>
            </>
          ) : (
            <>
              <Text className="text-lg text-green-500 font-semibold">
                Update Available — v{updateData?.latestVersion}
              </Text>
              {updateData?.releaseNotes?.map((note, index) => (
                <Text key={index} className="text-lg text-[#B3B3B3]">
                  • {note}
                </Text>
              ))}
              <Text className="text-[#555] text-sm">
                If prompted, allow installation from this source.
              </Text>
            </>
          )}
        </View>
      </View>

      <PrimaryButton
        text={updateAvailable ? "Install Now" : "Check for updates"}
        icon={updateAvailable ? UpdateIcon : CheckingIcon}
        onPress={updateAvailable ? handleUpdate : handleCheckForUpdates}
      />

      <ConfirmModal
        visible={showOfflineModal}
        title="You're Offline"
        message="You're currently offline. Linkly works without internet, but checking for updates needs a connection."
        cancelText="Close"
        confirmText=""
        onCancel={() => setShowOfflineModal(false)}
        onConfirm={() => {}}
      />
    </View>
  );
}