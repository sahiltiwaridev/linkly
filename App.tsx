import { NavigationContainer } from "@react-navigation/native";
import UserContextProvider from "./src/context/user/UserContextProvider";
import LoadingContextProvider from "./src/context/loading/LoadingContextProvider";
import RootStack from "./src/navigation/RootStack";
import LoadingScreen from "./src/screens/LoadingScreen";
import { useContext } from "react";
import loadingContext from "./src/context/loading/loadingContext";

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
