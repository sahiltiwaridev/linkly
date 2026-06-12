import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { AppState } from "react-native";
import BasicInfoScreen from "../screens/create-profile/BasicInfoScreen";
import ContactInfoScreen from "../screens/create-profile/ContactInfoScreen";
import { useAccountStore } from "../store/accountStore";
import { AccountStore } from "../store/accountStore";

const Stack = createNativeStackNavigator();

export default function CreateProfileStack() {
  const resetAccount = useAccountStore((state: AccountStore) => state.resetAccount);

  useEffect(() => {
    const sub = AppState.addEventListener("change", (state) => {
      if (state !== "active") {
        resetAccount();
      }
    });

    return () => sub.remove();
  }, [resetAccount]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BasicInfoScreen" component={BasicInfoScreen} />
      <Stack.Screen name="ContactInfoScreen" component={ContactInfoScreen} />
    </Stack.Navigator>
  );
}
