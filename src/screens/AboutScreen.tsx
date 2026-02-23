import { View, Text } from "react-native";
import React from "react";
import Header from "../components/Header";

export default function AboutScreen() {
  return (
    <View>
      <Header currentScreenName={"About"} />
      <Text>AboutScreen</Text>
    </View>
  );
}
