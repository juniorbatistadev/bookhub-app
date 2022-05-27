import { StyleSheet, Text, View } from "react-native";
import LoginWithGoogle from "@components/LoginWithGoogle/LoginWithGoogle";
import Leaves from "@res/icons/leaves.svg";

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <Leaves width={226} height={346} />
      <Text style={styles.title}>BookHub</Text>
      <Text style={styles.text}>Minimal Book Tracker</Text>
      <LoginWithGoogle />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#152924",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#fff",
    fontSize: 33,
    fontFamily: "Jost_500Medium",
    marginBottom: 40,
    letterSpacing: 4,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Jost_400Regular",
    marginBottom: 60,
    letterSpacing: 3,
  },
});
