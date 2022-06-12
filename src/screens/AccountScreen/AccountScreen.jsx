import { StyleSheet, Text, View } from "react-native";
import React from "react";
import auth from "@react-native-firebase/auth";
import { Pressable, Image, Button } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useColorScheme } from "react-native";
import { getThemedStyles } from "../../themesStyles";

export default function AccountScreen() {
  const { currentUser } = useContext(AuthContext);
  const scheme = useColorScheme();

  const { themedContainer } = getThemedStyles(scheme);

  const logOut = () => {
    auth()
      .signOut()
      .then(() => console.log("User signed out!"));
  };

  return (
    <View style={[styles.container, themedContainer]}>
      <Image
        style={styles.avatar}
        source={{
          uri: currentUser.photoURL,
        }}
      />
      <Text>{currentUser.displayName}</Text>
      <Text>{currentUser.email}</Text>
      {/* <Pressable onPress={logOut}> */}
      <Button onPress={logOut} title="Logout" />
      {/* </Pressable> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
});
