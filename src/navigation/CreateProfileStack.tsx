import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateProfileBioScreen from "../screens/CreateProfileBioScreen";
import CreateProfileEmailScreen from "../screens/CreateProfileEmailScreen";
import CreateProfileGenderScreen from "../screens/CreateProfileGenderScreen";
import CreateProfileNameScreen from "../screens/CreateProfileNameScreen";
import CreateProfileProfessionScreen from "../screens/CreateProfileProfessionScreen";

const Stack = createNativeStackNavigator();

export default function CreateProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="CreateProfileNameScreen"
        component={CreateProfileNameScreen}
      />
      <Stack.Screen
        name="CreateProfileGenderScreen"
        component={CreateProfileGenderScreen}
      />
      <Stack.Screen
        name="CreateProfileProfessionScreen"
        component={CreateProfileProfessionScreen}
      />
      <Stack.Screen
        name="CreateProfileEmailScreen"
        component={CreateProfileEmailScreen}
      />
      <Stack.Screen
        name="CreateProfileBioScreen"
        component={CreateProfileBioScreen}
      />
    </Stack.Navigator>
  );
}
