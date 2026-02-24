import { View, Text } from "react-native";
import { CameraView } from "expo-camera";
import { useQRScanner } from "../lib/qr/qr.scanner";
import { useEffect, useState, useCallback } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import NoCameraIcon from "../assets/icons/no-camera.svg";
import RequestingCameraIcon from "../assets/icons/requesting.svg";

export default function QRScannerView() {
  const navigation = useNavigation<any>();
  const { permission, isScanLocked, handleQRCodeScanned, resetScan } =
    useQRScanner();
  const [scannedData, setScannedData] = useState<string | null>(null);

  useEffect(() => {
    if (!scannedData) return;

    navigation.navigate("PreviewProfileScreen", {
      result: scannedData,
    });
  }, [scannedData, navigation]);

  useFocusEffect(
    useCallback(() => {
      setScannedData(null);
      resetScan();
    }, [resetScan]),
  );

  if (!permission || permission.status === "undetermined") {
    return (
      <View className="flex-1 items-center justify-center">
        <RequestingCameraIcon width={72} height={72} fill="#4f8cff" />
        <Text className="text-white font-semibold text-2xl mt-4">
          Requesting permission...
        </Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 items-center justify-center gap-3">
        <NoCameraIcon width={72} height={72} fill="#4f8cff" />
        <Text className="text-white font-semibold text-2xl">
          Camera permission denied
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <CameraView
        style={{ flex: 1 }}
        facing="back"
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        onBarcodeScanned={({ data }) => {
          if (isScanLocked) return;

          const result = handleQRCodeScanned(data);
          if (result) setScannedData(result);
        }}
      />
      <View
        pointerEvents="none"
        className="absolute inset-0 items-center justify-center"
      >
        <View className="w-80 h-80">
          <View className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-[#4f8cff] rounded-tl-xl" />
          <View className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-[#4f8cff] rounded-tr-xl" />
          <View className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-[#4f8cff] rounded-bl-xl" />
          <View className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-[#4f8cff] rounded-br-xl" />
        </View>
      </View>
      <View className="absolute bottom-24 self-center">
        <Text className="text-[#4f8cff] text-lg font-semibold tracking-wide">
          {isScanLocked ? "Scanned" : "Scanning..."}
        </Text>
      </View>
    </View>
  );
}
