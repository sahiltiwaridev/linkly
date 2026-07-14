import "react-native-get-random-values";
import "./global.css";
import { useEffect, useState } from "react";
import { Dimensions, PixelRatio } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { initStorage } from "./src/lib/storage/storage.mmkv";
import RootStack from "./src/navigation/RootStack";
import LoadingScreen from "./src/screens/onboarding/LoadingScreen";
import TabletUnsupportedScreen from "./src/screens/TabletUnsupportedScreen";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import * as Device from "expo-device";

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#0f0f0f",
  },
};

export default function App() {
  const [ready, setReady] = useState(false);
  const [isTablet, setIsTablet] = useState<boolean | null>(null);

  useEffect(() => {
    async function boot() {
      try {
        await initStorage();

        let tablet = false;
        const nativeDeviceType = Device.deviceType;

        if (nativeDeviceType === Device.DeviceType.TABLET) {
          tablet = true;
        } else if (nativeDeviceType === Device.DeviceType.PHONE) {
          tablet = false;
        } else {
          try {
            const asyncDeviceType = await Device.getDeviceTypeAsync();
            tablet = asyncDeviceType === Device.DeviceType.TABLET;
          } catch {
            const { width, height } = Dimensions.get("window");
            const diagonalInches =
              Math.sqrt(width * width + height * height) / PixelRatio.get();
            tablet = diagonalInches >= 7;
          }
        }

        setIsTablet(tablet);
      } catch (error) {
        console.warn("Initialization failed:", error);
      } finally {
        setReady(true);
      }
    }

    boot();
  }, []);

  if (!ready || isTablet === null) {
    return <LoadingScreen />;
  }

  if (isTablet) {
    return <TabletUnsupportedScreen />;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#0f0f0f" }}>
        <NavigationContainer theme={navTheme}>
          <RootStack />
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}