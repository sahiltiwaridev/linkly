import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { AppState } from "react-native";
import BasicInfoScreen from "../screens/create-profile/BasicInfoScreen";
import AboutInfoScreen from "../screens/create-profile/AboutInfoScreen";
import ContactInfoScreen from "../screens/create-profile/ContactInfoScreen";
import ProfileLinksScreen from "../screens/create-profile/ProfileLinksScreen";
import { useAccountStore } from "../store/accountStore";

const Stack = createNativeStackNavigator();

export default function CreateProfileStack() {
  const resetAccount = useAccountStore((state:any) => state.resetAccount);

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
      <Stack.Screen name="AboutInfoScreen" component={AboutInfoScreen} />
      <Stack.Screen name="ContactInfoScreen" component={ContactInfoScreen} />
      <Stack.Screen name="ProfileLinksScreen" component={ProfileLinksScreen} />
    </Stack.Navigator>
  );
}