import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import ScanQRScreen from "../screens/ScanQRScreen";
import MyQRScreen from "../screens/MyQRScreen";
import SavedProfilesScreen from "../screens/SavedProfilesScreen";
import SettingsScreen from "../screens/SettingsScreen";
import PreviewProfileScreen from "../screens/PreviewProfileScreen";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ScanQRScreen" component={ScanQRScreen} />
      <Stack.Screen name="MyQRScreen" component={MyQRScreen} />
      <Stack.Screen
        name="PreviewProfileScreen"
        component={PreviewProfileScreen}
      />
      <Stack.Screen
        name="SavedProfilesScreen"
        component={SavedProfilesScreen}
      />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      {/* <Stack.Screen name="" component={} /> */}
    </Stack.Navigator>
  );
}
