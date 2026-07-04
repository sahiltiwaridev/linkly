import "react-native-get-random-values";
import "./global.css";
import { useEffect, useState } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { initStorage } from "./src/lib/storage/storage.mmkv";
import RootStack from "./src/navigation/RootStack";
import LoadingScreen from "./src/screens/onboarding/LoadingScreen";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#0f0f0f",
  },
};

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function boot() {
      try {
        await initStorage();
      } catch (error) {
        console.warn("Storage initialization failed:", error);
      } finally {
        setReady(true);
      }
    }

    boot();
  }, []);

  if (!ready) {
    return <LoadingScreen />;
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