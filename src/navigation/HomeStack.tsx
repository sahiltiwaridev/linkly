import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/home/HomeScreen";
import ScanQRScreen from "../screens/home/ScanQRScreen";
import SelectFieldsScreen from "../screens/home/SelectFieldsScreen";
import MyQRScreen from "../screens/home/MyQRScreen";
import SavedProfilesScreen from "../screens/home/SavedProfilesScreen";
import PreviewProfileScreen from "../screens/home/PreviewProfileScreen";
import SettingsScreen from "../screens/settings/SettingsScreen";
import EditProfileScreen from "../screens/settings/EditProfileScreen";
import UpdateLinklyScreen from "../screens/settings/UpdateLinklyScreen";
import UserManualScreen from "../screens/settings/UserManualScreen";
import AboutScreen from "../screens/settings/AboutScreen";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ScanQRScreen" component={ScanQRScreen} />
      <Stack.Screen name="SelectFieldsScreen" component={SelectFieldsScreen} />
      <Stack.Screen name="MyQRScreen" component={MyQRScreen} />
      <Stack.Screen name="PreviewProfileScreen" component={PreviewProfileScreen} />
      <Stack.Screen name="SavedProfilesScreen" component={SavedProfilesScreen} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <Stack.Screen name="AboutScreen" component={AboutScreen} />
      <Stack.Screen name="UserManualScreen" component={UserManualScreen} />
      <Stack.Screen name="UpdateLinklyScreen" component={UpdateLinklyScreen} />
    </Stack.Navigator>
  );
}