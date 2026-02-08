import { View, Text } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { generateUserQRPayload } from "../lib/qr/qr.parser";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyQRScreen() {
  const qrPayload = generateUserQRPayload();

  if (!qrPayload) {
    return (
      <SafeAreaView>
        <View>
          <Text>Unable to generate QR code</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <View>
        <QRCode value={qrPayload} size={200} />
      </View>
    </SafeAreaView>
  );
}
