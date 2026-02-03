import { View, Text, Pressable } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { parseScannedUserQRPayload } from "../lib/qr/qrParser";
import { saveContact } from "../lib/storage/contacts.storage";

export default function PreviewProfileScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { result } = route.params;
  const scannedData = parseScannedUserQRPayload(result);

  return (
    <SafeAreaView>
      <View>
        <Text>Scanned Data:</Text>
        {/* debug / testing */}
        <Text>{scannedData?.name}</Text>
      </View>
      <View>
        <Pressable
          onPress={() => {
            saveContact(scannedData);
            navigation.navigate("SavedProfilesScreen"); // Temporary
          }}
        >
          <Text>Save Profile</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
