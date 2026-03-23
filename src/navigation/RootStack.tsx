import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useUserStore } from "../store/userStore";
import OnboardingStack from "./OnboardingStack";
import HomeStack from "./HomeStack";

const Stack = createNativeStackNavigator();

export default function RootStack() {
  const { hasAccount, isUserInitialized, initialize } = useUserStore();

  useEffect(() => {
    initialize();
  }, []);

  if (!isUserInitialized) return null;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {hasAccount ? (
        <Stack.Screen name="HomeStack" component={HomeStack} />
      ) : (
        <Stack.Screen name="OnboardingStack" component={OnboardingStack} />
      )}
    </Stack.Navigator>
  );
}