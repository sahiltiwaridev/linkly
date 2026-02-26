import { View } from "react-native";
import React, { useState, useContext } from "react";
import userContext from "../context/user/user.context";
import Header from "../components/Header";
import SecondaryButton from "../components/SecondaryButton";
import DeleteIcon from "../assets/icons/trash.svg";
import ConfirmModal from "../components/ConfirmModal";
import { removeUser } from "../lib/storage/user.storage";

export default function EditProfileScreen() {
  const [showConfirm, setShowConfirm] = useState(false);
  const userCtx = useContext(userContext);

  const handleDeleteProfile = () => {
    removeUser();
    userCtx?.setHasAccount(false);
    setShowConfirm(false);
  };

  return (
    <View className="flex-1 p-5 h-full justify-between">
      <View className="pb-10">
        <Header currentScreenName={"Edit Profile"} />
      </View>

      <View className="gap-6">
        <SecondaryButton
          onPress={() => setShowConfirm(true)}
          text={"Delete Profile"}
          icon={DeleteIcon}
        />
      </View>

      <ConfirmModal
        visible={showConfirm}
        title="Delete Profile?"
        message="This will permanently remove your profile and all local data. This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDeleteProfile}
        onCancel={() => setShowConfirm(false)}
      />
    </View>
  );
}
