import { View, Text } from "react-native";
import React from "react";
import Header from "../components/Header";

export default function UserManualScreen() {
  return (
    <View>
      <Header currentScreenName={"User Manual"} />
      <Text>UserManualScreen</Text>
    </View>
  );
}
