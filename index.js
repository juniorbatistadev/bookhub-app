import { registerRootComponent } from "expo";
import { AuthProvider } from "./src/contexts/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import { MenuProvider } from "react-native-popup-menu";
import { useColorScheme } from "react-native";
import { DefaultTheme, DarkTheme } from "@react-navigation/native";
import App from "./App";
import { colors } from "./src/themesStyles";

const RootComponent = () => {
  const scheme = useColorScheme();

  const customLightTheme = {
    ...DefaultTheme,
    colors: { background: colors.white },
  };

  const customDarkTheme = {
    ...DarkTheme,
    colors: { background: colors.lighterBlack },
  };

  return (
    <AuthProvider>
      <NavigationContainer
        theme={scheme === "dark" ? customDarkTheme : customLightTheme}
      >
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
