import "./global.css";
import { useEffect, useState, useContext } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import { initStorage } from "./src/lib/storage/storage.mmkv";

import UserContextProvider from "./src/context/user/UserContextProvider";
import LoadingContextProvider from "./src/context/loading/LoadingContextProvider";
import loadingContext from "./src/context/loading/loading.context";

import RootStack from "./src/navigation/RootStack";
import LoadingScreen from "./src/screens/onboarding/LoadingScreen";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AccountContextProvider from "./src/context/account/AccountContextProvider";

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#0f0f0f",
  },
};

function AppContent() {
  const { isLoading } = useContext(loadingContext)!;

  return (
    <>
      {isLoading && <LoadingScreen />}
      <RootStack />
    </>
  );
}

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function boot() {
      await initStorage();
      setReady(true);
    }

    boot();
  }, []);

  if (!ready) {
    return <LoadingScreen />;
  }

  return (
    <LoadingContextProvider>
      <UserContextProvider>
        <AccountContextProvider>
          <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor: "#0f0f0f" }}>
              <NavigationContainer theme={navTheme}>
                <AppContent />
              </NavigationContainer>
            </SafeAreaView>
          </SafeAreaProvider>
        </AccountContextProvider>
      </UserContextProvider>
    </LoadingContextProvider>
  );
}
