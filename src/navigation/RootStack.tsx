import React, { useContext, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import userContext from "../context/user/userContext";
import OnboardingStack from "./OnboardingStack";
import HomeStack from "./HomeStack";
import { initStorage } from "../lib/storage/mmkv";

const Stack = createNativeStackNavigator();

export default function RootStack() {
  
  const userCtx = useContext(userContext);

  if (!userCtx) {
    throw new Error("RootStack must be wrapped in UserContextProvider");
  }

  const { hasAccount, isUserChecked } = userCtx;

  if (!isUserChecked) return null;

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
