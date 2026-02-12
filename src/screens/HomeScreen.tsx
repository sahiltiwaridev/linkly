import { useNavigation } from "@react-navigation/native";
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  return (
    <SafeAreaView>
      <View>
        {/* <Text>HomeScreen</Text>
        <Text>
          {getUser() ? JSON.stringify(getUser(), null, 2) : "No user found"}
        </Text> */}
        <View className="bg-amber-600">
          <Text>Linkly</Text>
          <Pressable
            onPress={() => {
              navigation.navigate("SettingsScreen");
            }}
          >
            <Text>Settings</Text>
          </Pressable>
        </View>
        <View>
          <Pressable
            onPress={() => {
              navigation.navigate("ScanQRScreen");
            }}
          >
            <Text>Scan QR</Text>
            <Text>Connect with new people</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate("MyQRScreen");
            }}
          >
            <Text>My Code</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate("SavedProfilesScreen");
            }}
          >
            <Text>Saved</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
