import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUser } from "../lib/storage/stogare";

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <View>
        <Text>HomeScreen</Text>
        <Text>{getUser()}</Text>
      </View>
    </SafeAreaView>
  );
}
