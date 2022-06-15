import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { useColorScheme } from "react-native";
import { colors, getThemedStyles, sizes } from "../../themesStyles";

function CustomModal({ isVisible, title, children, cancelInfo, confirmInfo }) {
  const scheme = useColorScheme();
  const { themedHeader, themedContainer } = getThemedStyles(scheme);

  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent={true}
      statusBarTranslucent={true}
    >
      <View style={styles.centeredView}>
        <View style={[styles.modalView, themedContainer]}>
          <Text
            style={[{ ...styles.modalTitle, fontSize: sizes.m }, themedHeader]}
          >
            {title}
          </Text>
          {children}
          <View style={styles.buttonsContainer}>
            <Pressable onPress={cancelInfo.handleCancel}>
              <Text
                style={{
                  ...styles.textStyle,
                  fontSize: sizes.m,
                  color:
                    scheme === "dark" ? colors.lightGray : colors.lightGray,
                }}
              >
                {cancelInfo.text}
              </Text>
            </Pressable>
            <Pressable
              onPress={confirmInfo.handleConfirm}
              style={{ marginLeft: 15 }}
            >
              <Text
                style={{
                  ...styles.textStyle,
                  fontSize: sizes.m,
                  color: scheme === "dark" ? colors.white : colors.darkGreen,
                }}
              >
                {confirmInfo.text}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    width: "80%",
    borderWidth: 1,
    borderColor: "gray",
    backgroundColor: "white",
    borderRadius: 5,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 7,
      height: 10,
    },
  },

  modalTitle: {
    fontFamily: "Jost_700Bold",
    marginRight: "auto",
  },
  buttonsContainer: {
    flexDirection: "row",
    marginLeft: "auto",
  },
  textStyle: {
    fontFamily: "Jost_500Medium",
  },
});

export default CustomModal;
