import { View, Text, Pressable } from "react-native";
import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

// Define your stack param list
type RootStackParamList = {
  WelcomeScreen: undefined;
  CreateProfileScreen: undefined;
  HomeScreen: undefined;
};

type WelcomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "WelcomeScreen"
>;

export default function WelcomeScreen() {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>WelcomeScreen</Text>
      <Pressable onPress={() => navigation.navigate("CreateProfileScreen")}>
        <Text style={{ marginTop: 20, color: "#0af" }}>Create Profile</Text>
      </Pressable>
    </View>
  );
}
