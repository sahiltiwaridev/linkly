import { View, Text } from "react-native";
import { CameraView } from "expo-camera";
import { useQRScanner } from "../lib/qr/qr.scanner";
import { useEffect, useState, useCallback } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

export default function QRScannerView() {
  const navigation = useNavigation<any>();
  const { permission, isScanLocked, handleQRCodeScanned, resetScan } =
    useQRScanner();
  const [scannedData, setScannedData] = useState<string | null>(null);

  useEffect(() => {
    if (scannedData) {
      navigation.navigate("PreviewProfileScreen", {
        result: scannedData,
      });
    }
  }, [scannedData, navigation]);

  useFocusEffect(
    useCallback(() => {
      setScannedData(null);
      resetScan();
    }, [resetScan]),
  );

  if (!permission) return <Text>Requesting permission...</Text>;
  if (!permission.granted) return <Text>Camera permission denied</Text>;

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        style={{ flex: 1 }}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        onBarcodeScanned={({ data }) => {
          if (isScanLocked) return;

          const result = handleQRCodeScanned(data);
          if (result) {
            setScannedData(result);
          }
        }}
      />

      {/* debug / testing */}
      <Text
        style={{
          position: "absolute",
          bottom: 40,
          color: "white",
          alignSelf: "center",
        }}
      >
        {isScanLocked ? "Scanned" : "Scanning..."}
      </Text>
    </View>
  );
}
