import Constants from "expo-constants";
import { View, Text } from "react-native";
import React, { useState } from "react";
import SettingsListItem from "../../components/settings/SettingsListItem";
import EditIcon from "../../assets/icons/edit.svg";
import UserManualIcon from "../../assets/icons/user-manual.svg";
import AboutIcon from "../../assets/icons/about.svg";
import UpdateIcon from "../../assets/icons/update.svg";
import QRIcon from "../../assets/icons/qr.svg";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/layout/Header";
import ConfirmModal from "../../components/modals/ConfirmModal";

export default function SettingsScreen() {
  const navigation = useNavigation<any>();
  const [showEntryModal, setShowEntryModal] = useState(false);
  const version = Constants.expoConfig?.version ?? "1.0.0";

  return (
    <View className="justify-between h-full p-5">
      <View>
        <View className="pb-10">
          <Header currentScreenName={"Settings"} />
        </View>
        <View className="gap-3">
          <SettingsListItem
            icon={EditIcon}
            heading={"Edit my profile"}
            text={"Update your name, bio and avatar"}
            onPress={() => {
              navigation.navigate("EditProfileScreen");
            }}
          />
          <SettingsListItem
            icon={UpdateIcon}
            heading={"Update Linkly"}
            text={"Check for the latest version"}
            onPress={() => {
              setShowEntryModal(true);
            }}
          />
          <SettingsListItem
            icon={UserManualIcon}
            heading={"User manual"}
            text={"Learn how to use Linkly"}
            onPress={() => {
              navigation.navigate("UserManualScreen");
            }}
          />
          <SettingsListItem
            icon={AboutIcon}
            heading={"About Linkly"}
            text={"App version, privacy and details"}
            onPress={() => {
              navigation.navigate("AboutScreen");
            }}
          />
        </View>
      </View>

      {/* Entry Msg */}
      <ConfirmModal
        visible={showEntryModal}
        title="Work in Progress"
        message="This page is still under development. Some features may not work as expected."
        cancelText="Go Back"
        confirmText="Continue"
        onCancel={() => setShowEntryModal(false)}
        onConfirm={() => {
          setShowEntryModal(false);
          navigation.navigate("UpdateLinklyScreen");
        }}
      />
      <View>
        <View className="justify-center items-center gap-2">
          <View
            style={{
              width: 56,
              height: 56,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(79, 140, 255, 0.25)',
              borderRadius: 18,
            }}
          >
            <QRIcon width={24} height={24} fill={"#4f8cff"} />
          </View>
          <Text className="text-[#B3B3B3]">Linkly v{version}</Text>
        </View>
      </View>
    </View>
  );
}
