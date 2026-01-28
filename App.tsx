import { NavigationContainer } from "@react-navigation/native";
import UserContextProvider from "./src/context/UserContextProvider";
import RootStack from "./src/navigation/RootStack";

export default function App() {
  return (
    <NavigationContainer>
      <UserContextProvider>
        <RootStack />
      </UserContextProvider>
    </NavigationContainer>
  );
}
