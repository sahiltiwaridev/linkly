import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import userContext from "../context/UserContext";
import HomeScreen from "../screens/HomeScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import CreateProfileScreen from "../screens/CreateProfileScreen";

const Stack = createNativeStackNavigator();

export default function RootStack() {
  const { hasAccount } = useContext(userContext)!;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {hasAccount ? (
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      ) : (
        <>
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen
            name="CreateProfileScreen"
            component={CreateProfileScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
