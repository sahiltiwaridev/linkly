import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BasicInfoScreen from "../screens/BasicInfoScreen";
import AboutInfoScreen from "../screens/AboutInfoScreen";
import ContactInfoScreen from "../screens/ContactInfoScreen";
import ProfileLinksScreen from "../screens/ProfileLinksScreen";

const Stack = createNativeStackNavigator();

export default function CreateProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BasicInfoScreen" component={BasicInfoScreen} />
      <Stack.Screen name="AboutInfoScreen" component={AboutInfoScreen} />
      <Stack.Screen name="ContactInfoScreen" component={ContactInfoScreen} />
      <Stack.Screen name="ProfileLinksScreen" component={ProfileLinksScreen} />
    </Stack.Navigator>
  );
}
