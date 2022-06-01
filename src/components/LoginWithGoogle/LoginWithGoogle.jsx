import { Text } from "react-native";
import { StyleSheet } from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import GoogleIcon from "@res/icons/google.svg";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";

GoogleSignin.configure({
  webClientId:
    "950764784194-mt7u0qevqkfv232s7cd6vqqm22h14tag.apps.googleusercontent.com",
});

export default function LoginWithGoogle() {
  const handleClick = async () => {
    const { idToken } = await GoogleSignin.signIn();
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  };

  return (
    <Pressable
      onPress={handleClick}
      style={({ pressed }) => [
        { backgroundColor: pressed ? "gray" : "white" },
        styles.container,
      ]}
    >
      <GoogleIcon width={22} height={22} />
      <Text style={styles.text}>Start With Google</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: "center",
  },
  text: {
    marginLeft: 7,
    color: "#000",
    fontSize: 13,
    fontFamily: "Jost_500Medium",
  },
});
