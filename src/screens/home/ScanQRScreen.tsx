import { View, Text, Pressable } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useQRScanner } from "../../lib/qr/qr.scanner";
import { useEffect, useState, useCallback } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import NoCameraIcon from "../../assets/icons/no-camera.svg";
import RequestingCameraIcon from "../../assets/icons/requesting.svg";
import CloseIcon from "../../assets/icons/close.svg";
import Header from "../../components/layout/Header";
import { useResponsive } from "../../lib/utils/responsive.utils";

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
  const { isScanLocked, handleQRCodeScanned, resetScan } = useQRScanner();
  const { sizes, width, height } = useResponsive();
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [permission, requestPermission] = useCameraPermissions();

  // Responsive scanner frame size (max 80% of smallest dimension)
  const scannerFrameSize = Math.min(width * 0.8, height * 0.7);
  const cornerSize = scannerFrameSize * 0.1;
  const cornerBorder = cornerSize * 0.15;

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

  useFocusEffect(
    useCallback(() => {
      if (!permission?.granted) {
        requestPermission();
      }
    }, [permission]),
  );

  if (!permission) {
    return (
      <View className="flex-1 p-5">
        <Header currentScreenName="Scan QR" />
        <View className="flex-1 items-center justify-center gap-3">
          <RequestingCameraIcon width={72} height={72} fill="#4f8cff" />
          <Text className="text-white font-semibold text-2xl">
            Requesting permission...
          </Text>
        </View>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 p-5">
        <Header currentScreenName="Scan QR" />
        <View className="flex-1 items-center justify-center gap-3">
          <NoCameraIcon width={72} height={72} fill="#4f8cff" />
          <Text className="text-white font-semibold text-2xl">
            Camera permission denied
          </Text>
          <Text className="text-[#B3B3B3] text-lg text-center">
            Grant camera access from settings to use the scanner.
          </Text>
        </View>
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

      <Pressable
        onPress={() => navigation.goBack()}
        style={{
          position: 'absolute',
          top: 20,
          left: 20,
          backgroundColor: '#1A1A1A',
          borderRadius: 24,
          paddingHorizontal: 12,
          paddingVertical: 8,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          gap: 12,
        }}
      >
        <CloseIcon width={24} height={24} fill={"#4f8cff"} />
        <Text className="text-[#B3B3B3] text-lg font-semibold">Close</Text>
      </Pressable>

      <View
        pointerEvents="none"
        className="absolute inset-0 items-center justify-center"
      >
        <View style={{ width: scannerFrameSize, height: scannerFrameSize }}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: cornerSize,
              height: cornerSize,
              borderTopWidth: cornerBorder,
              borderLeftWidth: cornerBorder,
              borderTopColor: '#4f8cff',
              borderLeftColor: '#4f8cff',
              borderTopLeftRadius: 16,
            }}
          />
          <View
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: cornerSize,
              height: cornerSize,
              borderTopWidth: cornerBorder,
              borderRightWidth: cornerBorder,
              borderTopColor: '#4f8cff',
              borderRightColor: '#4f8cff',
              borderTopRightRadius: 16,
            }}
          />
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: cornerSize,
              height: cornerSize,
              borderBottomWidth: cornerBorder,
              borderLeftWidth: cornerBorder,
              borderBottomColor: '#4f8cff',
              borderLeftColor: '#4f8cff',
              borderBottomLeftRadius: 16,
            }}
          />
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: cornerSize,
              height: cornerSize,
              borderBottomWidth: cornerBorder,
              borderRightWidth: cornerBorder,
              borderBottomColor: '#4f8cff',
              borderRightColor: '#4f8cff',
              borderBottomRightRadius: 16,
            }}
          />
        </View>
      </View>

      <View
        style={{
          position: 'absolute',
          bottom: 60,
          alignSelf: 'center',
          backgroundColor: '#1A1A1A',
          borderRadius: 24,
          paddingHorizontal: 16,
          paddingVertical: 12,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
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
