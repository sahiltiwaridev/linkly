import React, { useEffect, useState, useCallback } from "react";
import { View, Text, BackHandler } from "react-native";
import Constants from "expo-constants";
import * as Network from "expo-network";

import CheckingIcon from "../../assets/icons/rotate.svg";
import UpdateIcon from "../../assets/icons/update.svg"; // replace path if needed

import Header from "../../components/layout/Header";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import ConfirmModal from "../../components/modals/ConfirmModal";

interface UpdateData {
  version: string;
  features: string[];
  updateUrl?: string;
}

export default function UpdateLinklyScreen({ navigation }: any) {
  const appVersion =
    Constants.expoConfig?.version ?? Constants.manifest?.version ?? "Unknown";

  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [updateData, setUpdateData] = useState<UpdateData | null>(null);
  const [showOfflineModal, setShowOfflineModal] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);

  // --------- NETWORK REQUEST PLACEHOLDER ----------
  const fetchUpdateData = async (): Promise<UpdateData | null> => {
    // TODO:
    // Make API request here
    // Compare version with appVersion
    // Return update data if available
    return null;
  };
  // ------------------------------------------------

  const checkInternet = async () => {
    const state = await Network.getNetworkStateAsync();
    return state.isConnected && state.isInternetReachable;
  };

  const handleCheckForUpdates = async () => {
    const isOnline = await checkInternet();

    if (!isOnline) {
      setShowOfflineModal(true);
      return;
    }

    const data = await fetchUpdateData();

    if (data) {
      setUpdateAvailable(true);
      setUpdateData(data);
    }
  };

  const handleLeaveAttempt = () => {
    setShowLeaveModal(true);
    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleLeaveAttempt,
    );

    return () => backHandler.remove();
  }, []);

  const confirmLeave = () => {
    setShowLeaveModal(false);
    navigation.goBack();
  };

  return (
    <View className="p-5 h-full justify-between">
      <View>
        <View className="pb-10">
          <Header
            currentScreenName="Update"
            backButtonProps={{
              onPress: handleLeaveAttempt,
            }}
          />
        </View>

        <View className="gap-4">
          <Text className="text-lg text-[#B3B3B3]">
            Current Version: {appVersion}
          </Text>

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
                Update Available
              </Text>

              {updateData?.features?.map((feature, index) => (
                <Text key={index} className="text-lg text-[#B3B3B3]">
                  • {feature}
                </Text>
              ))}
            </>
          )}
        </View>
      </View>

      <PrimaryButton
        text={updateAvailable ? "Install Now" : "Check for updates"}
        icon={updateAvailable ? UpdateIcon : CheckingIcon}
        onPress={handleCheckForUpdates}
      />

      {/* Offline Modal */}
      <ConfirmModal
        visible={showOfflineModal}
        title="You're Offline"
        message="You're currently offline. Linkly works without internet, but checking for updates needs a connection."
        cancelText="Close"
        confirmText=""
        onCancel={() => setShowOfflineModal(false)}
        onConfirm={() => {}}
      />

      {/* Leave Confirmation Modal */}
      <ConfirmModal
        visible={showLeaveModal}
        title="Leave Update Page?"
        message="If you leave now, you'll need to check for updates again when you return."
        cancelText="Stay"
        confirmText="Leave"
        onCancel={() => setShowLeaveModal(false)}
        onConfirm={confirmLeave}
      />
    </View>
  );
}


