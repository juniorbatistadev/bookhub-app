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

  const book = route?.params?.book;

  useEffect(() => {
    navigation.setOptions({
      title: book?.action === "edit" ? "Update Book" : "Add Book",
    });
  }, []);

  const onPress = (values) => {
    const { authors } = values;
    const authorsFormatted = authors.split(",");

    //validate pages read are less than total pages
    if (values.pagesRead[0] > values.totalPages) {
      Alert.alert(
        "Oh no!",
        "Amount of pages read must be less than total pages"
      );
      return;
    }

    const booksDocument = firestore()
      .collection("Users")
      .doc(currentUser.uid)
      .collection("Books");

    const data = {
      ...values,
      totalPages: Number.parseInt(values.totalPages || 0),
      pagesRead: values.pagesRead,
      authors: authorsFormatted,
    };

    //if book is being edited, update it otherwise create a new one
    if (book?.action === "edit") {
      booksDocument
        .doc(book?.id)
        .update(data)
        .then(() => alert("Book updated"));
    } else {
      booksDocument.add(data).then(() => {
        alert("next");
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
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
                  style={styles.input}
                  value={values.title}
                  placeholder="Title"
                  maxLength={500}
                />
                {errors.title && touched.title && (
                  <Text style={styles.error}>{errors.title}</Text>
                )}
              </>
            )}

            {(!book?.authors || book?.action === "edit") && (
              <TextInput
                onChangeText={handleChange("authors")}
                style={styles.input}
                value={values.authors}
                placeholder="Authors seperated by commas"
                maxLength={500}
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
                  cssText:
                    "body { font-size: 20px; color:green; font-family: 'Helvetica Neue'; }",
                }}
                placeholder="Write your notes here..."
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
                style={styles.input}
                value={values.totalPages}
                placeholder="Total Pages"
              />
            )}
            <Text style={styles.pagesText}>{`Your Progress (${
              values.pagesRead
            } out of ${values.totalPages || 0} pages)`}</Text>
            <Slider
              containerStyle={styles.sliderContainer}
              onValueChange={(value) => setFieldValue("pagesRead", value)}
              value={values.pagesRead}
              minimumValue={0}
              maximumValue={values.totalPages || 0}
              step={1}
              thumbTintColor="#63dcb8"
            />

            <Button
              title={book?.action === "edit" ? "Update Book" : "Save Book"}
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
    color: "gray",
    marginVertical: 10,
    fontSize: 19,
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
});
