import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import userContext from "../context/user/userContext";
import OnboardingStack from "./OnboardingStack";
import HomeStack from "./HomeStack";

const Stack = createNativeStackNavigator();

export default function RootStack() {
  const { hasAccount } = useContext(userContext)!;

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
