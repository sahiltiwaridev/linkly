import { View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { parseScannedUserQRPayload } from "../lib/qr/qrParser";

export default function PreviewProfileScreen() {
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
    </SafeAreaView>
  );
}
