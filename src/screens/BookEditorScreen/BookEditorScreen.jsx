import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { useRef } from "react";
import { Formik } from "formik";
import { Button } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import BookResult from "../SearchScreen/BookResult";
import { Slider } from "@miblanchard/react-native-slider";
import firestore from "@react-native-firebase/firestore";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import * as Yup from "yup";
import { useEffect } from "react";
import { colors, getThemedStyles } from "../../themesStyles";
import Checkbox from "expo-checkbox";
import ActionsButtonsEditor from "./ActionsButtonsEditor";
import { PreferencesContext } from "../../contexts/PreferencesContext";
import i18n from "i18n-js";

const BookSchema = Yup.object().shape({
  title: Yup.string().required("Please provide a title").max(500),
  authors: Yup.string().max(500),
  notes: Yup.string(),
  pagesRead: Yup.number(),
  totalPages: Yup.number(),
  image: Yup.string(),
});

export default function BookEditorScreen({ route, navigation }) {
  const { currentUser } = useContext(AuthContext);
  const editorRef = useRef();
  const { theme } = useContext(PreferencesContext);
  const { themedContainer } = getThemedStyles(theme.name);

  const book = route?.params?.book;

  useEffect(() => {
    navigation.setOptions({
      title:
        book?.action === "edit"
          ? i18n.t("library.updateBook")
          : i18n.t("library.addBook"),
      headerRight: () => (
        <>{book?.action === "edit" && <ActionsButtonsEditor book={book} />}</>
      ),
    });
  }, []);

  const onPress = (values) => {
    const { authors } = values;
    const authorsFormatted = authors.split(",");

    //validate pages read are less than total pages
    if (values.pagesRead[0] > values.totalPages) {
      Alert.alert("Oh no!", i18n.t("library.readPageError"));
      return;
    }

    const booksDocument = firestore()
      .collection("Users")
      .doc(currentUser.uid)
      .collection("Books");

    const data = {
      ...values,
      totalPages: Number.parseInt(values.totalPages || 0),
      pagesRead: values.isFinished ? values.totalPages : values.pagesRead,
      authors: authorsFormatted,
      isFinished:
        values.isFinished || values.pagesRead > 0
          ? values.pagesRead == values.totalPages
          : false,
    };

    //if book is being edited, update it otherwise create a new one
    if (book?.action === "edit") {
      booksDocument.doc(book?.id).update(data);
    } else {
      booksDocument.add({
        ...data,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
    }

    navigation.navigate("Library");
  };

  return (
    <ScrollView style={[styles.container, themedContainer]}>
      {book && book?.action !== "edit" && (
        <BookResult {...book} previewOnly={true} />
      )}
      <Formik
        initialValues={{
          title: book?.title || "",
          authors: book?.authors ? book.authors.join(" , ") : "",
          cover: book?.image || null,
          notes: book?.notes || "",
          pagesRead: book?.pagesRead || 0,
          totalPages: book?.pages ? `${book?.pages}` : "",
          isFinished: book?.isFinished || false,
        }}
        validationSchema={BookSchema}
        onSubmit={onPress}
      >
        {({
          handleChange,
          touched,
          handleSubmit,
          values,
          setFieldValue,
          errors,
        }) => (
          <View>
            {(!book?.title || book?.action === "edit") && (
              <>
                <TextInput
                  onChangeText={handleChange("title")}
                  style={{
                    ...styles.input,
                    color: theme.name === "dark" ? colors.white : colors.black,
                  }}
                  value={values.title}
                  placeholder={i18n.t("misc.title")}
                  maxLength={500}
                  placeholderTextColor={
                    theme.name === "dark" ? colors.white : colors.lightGray
                  }
                />
                {errors.title && touched.title && (
                  <Text style={styles.error}>{errors.title}</Text>
                )}
              </>
            )}

            {(!book?.authors || book?.action === "edit") && (
              <TextInput
                onChangeText={handleChange("authors")}
                style={{
                  ...styles.input,
                  color: theme.name === "dark" ? colors.white : colors.black,
                }}
                value={values.authors}
                placeholder={i18n.t("library.authorsByCommas")}
                maxLength={500}
                placeholderTextColor={
                  theme.name === "dark" ? colors.white : colors.lightGray
                }
              />
            )}

            <RichToolbar
              style={styles.richToolbar}
              editor={editorRef}
              actions={[
                actions.setBold,
                actions.setItalic,
                actions.insertBulletsList,
                actions.insertOrderedList,
                actions.undo,
                actions.redo,
              ]}
            />
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={{ flex: 1 }}
            >
              <RichEditor
                editorStyle={{
                  backgroundColor:
                    theme.name === "dark" ? colors.lighterBlack : colors.white,
                  color: theme.name === "dark" ? colors.white : colors.black,
                  cssText:
                    "body { font-size: 18px; font-family: 'Helvetica Neue'; }",
                }}
                placeholder={i18n.t("library.notesHere")}
                ref={editorRef}
                onChange={(value) => setFieldValue("notes", value)}
                initialHeight={100}
                initialContentHTML={book?.notes || ""}
              />
            </KeyboardAvoidingView>

            {(!book?.pages || book?.action === "edit") && (
              <TextInput
                keyboardType="numeric"
                onChangeText={(value) => {
                  setFieldValue("totalPages", value.replace(/[^0-9]/g, ""));
                }}
                style={{
                  ...styles.input,
                  color: theme.name === "dark" ? colors.white : colors.black,
                }}
                value={values.totalPages}
                placeholder="Total Pages"
                placeholderTextColor={
                  theme.name === "dark" ? colors.white : colors.lightGray
                }
              />
            )}
            <View style={styles.finishedContainer}>
              <Text
                style={{
                  ...styles.pagesText,
                  color:
                    theme.name === "dark" ? colors.white : colors.lightGray,
                }}
              >
                {i18n.t("library.didFinishBook")}
              </Text>
              <Checkbox
                style={styles.checkbox}
                value={values.isFinished}
                onValueChange={() =>
                  setFieldValue("isFinished", !values.isFinished)
                }
                color={values.isFinished ? colors.lightGreen : undefined}
              />
            </View>
            {!values.isFinished && (
              <>
                <Text
                  style={{
                    ...styles.pagesText,
                    color:
                      theme.name === "dark" ? colors.white : colors.lightGray,
                  }}
                >
                  {i18n.t("library.progressPages", {
                    pagesRead: values.pagesRead,
                    totalPages: values.totalPages || 0,
                  })}
                </Text>
                <Slider
                  containerStyle={styles.sliderContainer}
                  onValueChange={(value) => setFieldValue("pagesRead", value)}
                  value={values.pagesRead}
                  minimumValue={0}
                  maximumValue={values.totalPages || 0}
                  step={1}
                  thumbTintColor="#63dcb8"
                />
              </>
            )}

            <Button
              title={
                book?.action === "edit"
                  ? i18n.t("library.updateBook")
                  : i18n.t("library.saveBook")
              }
              onPress={handleSubmit}
              color="#63dcb8"
            />
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 0,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
  },
  richToolbar: {
    marginTop: 12,
  },

  input: {
    marginVertical: 20,
    borderRadius: 13,
    zIndex: 10,
    fontSize: 22,
    fontFamily: "Jost_400Regular",
  },

  pagesText: {
    marginVertical: 20,
    fontSize: 22,
    fontFamily: "Jost_400Regular",
  },
  error: {
    minHeight: 0,
    color: "#ff7a7a",
    fontSize: 16,
    fontFamily: "Jost_400Regular",
  },
  sliderContainer: {
    marginVertical: 10,
    marginBottom: 30,
  },
  richEditor: {
    fontSize: 19,
    fontFamily: "Jost_400Regular",
  },
  finishedContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    marginLeft: 10,
  },
  richToolbar: {
    backgroundColor: "transparent",
    color: "white",
  },
});
