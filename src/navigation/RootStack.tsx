import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import userContext from "../context/user/userContext";
import HomeScreen from "../screens/HomeScreen";
import OnboardingStack from "./OnboardingStack";

const Stack = createNativeStackNavigator();

export default function RootStack() {
  const { hasAccount } = useContext(userContext)!;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {hasAccount ? (
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      ) : (
        <Stack.Screen name="OnboardingStack" component={OnboardingStack} />
      )}
    </Stack.Navigator>
  );
}
