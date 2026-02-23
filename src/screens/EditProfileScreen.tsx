import { View, Text } from "react-native";
import React from "react";
import Header from "../components/Header";

export default function EditProfileScreen() {
  return (
    <View>
      <Header currentScreenName={"Edit Profile"} />
      <Text>EditProfileScreen</Text>
    </View>
  );
}
