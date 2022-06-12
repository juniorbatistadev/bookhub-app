import { registerRootComponent } from "expo";
import { AuthProvider } from "./src/contexts/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import { MenuProvider } from "react-native-popup-menu";
import { useColorScheme } from "react-native";
import { DefaultTheme, DarkTheme } from "@react-navigation/native";
import App from "./App";

const RootComponent = () => {
  const scheme = useColorScheme();

  console.log(DarkTheme);

  return (
    <AuthProvider>
      <NavigationContainer theme={scheme === "dark" ? DarkTheme : DefaultTheme}>
        <MenuProvider>
          <App />
        </MenuProvider>
      </NavigationContainer>
    </AuthProvider>
  );
};
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(RootComponent);
