import { View, Text, Pressable } from "react-native";
import { CameraView } from "expo-camera";
import { useQRScanner } from "../../lib/qr/qr.scanner";
import { useEffect, useState, useCallback } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import NoCameraIcon from "../../assets/icons/no-camera.svg";
import RequestingCameraIcon from "../../assets/icons/requesting.svg";
import CloseIcon from "../../assets/icons/close.svg";

function AnimatedDots() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev.length >= 3) return "";
        return prev + ".";
      });
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <Text className="text-white text-lg font-semibold tracking-wide">
      Scanning{dots}
    </Text>
  );
}

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

      <Pressable
        onPress={() => navigation.goBack()}
        className="absolute inset-0 top-5 left-5 bg-[#1A1A1A] rounded-4xl w-32 h-14 items-center justify-center flex-row gap-3"
      >
        <CloseIcon width={24} height={24} fill={"#4f8cff"} />
        <Text className="text-[#B3B3B3] text-lg font-semibold">Close</Text>
      </Pressable>

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

      <View className="absolute bottom-24 self-center bg-[#1A1A1A] rounded-3xl w-40 h-14 items-center justify-center">
        <View>
          {isScanLocked ? (
            <Text className="text-white text-lg font-semibold tracking-wide">
              Scanned
            </Text>
          ) : (
            <AnimatedDots />
          )}
        </View>
      </View>
    </View>
  );
}
