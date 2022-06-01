import { registerRootComponent } from "expo";
import { AuthProvider } from "./src/contexts/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import { MenuProvider } from "react-native-popup-menu";

import App from "./App";

const RootComponent = () => (
  <AuthProvider>
    <NavigationContainer>
      <MenuProvider>
        <App />
      </MenuProvider>
    </NavigationContainer>
  </AuthProvider>
);
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(RootComponent);
