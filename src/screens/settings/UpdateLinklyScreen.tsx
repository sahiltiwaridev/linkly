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
  const appVersion =
    Constants.expoConfig?.version ??
    Constants.manifest?.version ??
    "Unknown";

  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [updateData, setUpdateData] = useState<UpdateData | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [showOfflineModal, setShowOfflineModal] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);

  const checkInternet = async () => {
    const state = await Network.getNetworkStateAsync();
    return state.isConnected && state.isInternetReachable;
  };

  const fetchUpdateData = async (): Promise<UpdateData | null> => {
    const response = await fetch(
      "https://linkly-website.vercel.app/src/public/update.json"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch update.");
    }

    const data: UpdateData = await response.json();

    return isNewer(data.latestVersion, appVersion) ? data : null;
  };

  const handleCheckForUpdates = async () => {
    setIsChecking(true);

    try {
      const isOnline = await checkInternet();

      if (!isOnline) {
        setShowOfflineModal(true);
        return;
      }

      const data = await fetchUpdateData();

      setHasChecked(true);

      if (data) {
        setUpdateAvailable(true);
        setUpdateData(data);
        setMessage(null);
      } else {
        setUpdateAvailable(false);
        setUpdateData(null);
        setMessage("You're using the latest version of Linkly.");
      }
    } catch {
      setMessage("Couldn't check for updates. Please try again.");
    } finally {
      setIsChecking(false);
    }
  };

  const handleUpdate = async () => {
    if (!updateData?.apkUrl) return;

    try {
      await Linking.openURL(updateData.apkUrl);
    } catch (error) {
      console.error("Failed to open update URL:", error);
    }
  };

  return (
    <View className="flex-1 p-5 justify-between">
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
            Installed Version: {appVersion}
          </Text>

          {message && (
            <Text className="text-lg text-green-500 font-semibold">
              {message}
            </Text>
          )}

          {!updateAvailable ? (
            <>
              <Text className="text-lg text-[#B3B3B3]">
                Tap "Check for Updates" to see if a newer version of Linkly is
                available.
              </Text>

              <Text className="text-lg text-[#B3B3B3]">
                Updates may include new features, performance improvements, and
                bug fixes.
              </Text>
            </>
          ) : (
            <>
              <Text className="text-2xl text-green-500 font-bold">
                A new version is available
              </Text>

              <Text className="text-lg text-[#B3B3B3]">
                Version {updateData?.latestVersion}
              </Text>

              <View className="pt-2 gap-2">
                {updateData?.releaseNotes.map((note, index) => (
                  <Text key={index} className="text-lg text-[#B3B3B3]">
                    • {note}
                  </Text>
                ))}
              </View>

              <Text className="text-sm text-[#666666] pt-2">
                Tap "Install Update" to download the latest version of Linkly.
              </Text>
            </>
          )}
        </View>
      </View>

      <PrimaryButton
        disabled={isChecking}
        text={
          isChecking
            ? "..."
            : updateAvailable
            ? "Install Update"
            : hasChecked
            ? "Check Again"
            : "Check for Updates"
        }
        icon={updateAvailable ? UpdateIcon : CheckingIcon}
        onPress={updateAvailable ? handleUpdate : handleCheckForUpdates}
      />

      <ConfirmModal
        visible={showOfflineModal}
        title="No Internet Connection"
        message="Connect to the internet to check for updates. Linkly will continue to work normally while you're offline."
        cancelText="Close"
        confirmText=""
        onCancel={() => setShowOfflineModal(false)}
        onConfirm={() => {}}
      />
    </View>
  );
}