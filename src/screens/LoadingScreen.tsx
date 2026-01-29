import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoadingScreen() {
  return (
    <SafeAreaView>
      <View>
        <ActivityIndicator size="large" color="#0af" />
        <Text>Hang on...</Text>
      </View>
    </SafeAreaView>
  );
}
