import { useEffect, useState, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { initStorage } from "./src/lib/storage/mmkv";

import UserContextProvider from "./src/context/user/UserContextProvider";
import LoadingContextProvider from "./src/context/loading/LoadingContextProvider";
import loadingContext from "./src/context/loading/LoadingContext";

import RootStack from "./src/navigation/RootStack";
import LoadingScreen from "./src/screens/LoadingScreen";

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
        <NavigationContainer>
          <AppContent />
        </NavigationContainer>
      </UserContextProvider>
    </LoadingContextProvider>
  );
}
