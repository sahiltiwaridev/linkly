import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUser } from "../lib/storage/user.storage";

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <View>
        <Text>HomeScreen</Text>
        <Text>
          {getUser() ? JSON.stringify(getUser(), null, 2) : "No user found"}
        </Text>
      </View>
    </SafeAreaView>
  );
}
