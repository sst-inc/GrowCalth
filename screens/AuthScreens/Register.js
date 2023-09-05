import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import { auth } from "../../firebase";
import DropDownPicker from "react-native-dropdown-picker";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { SafeAreaView } from "react-native-safe-area-context";

const Register = () => {
  const allowedEmailDomains = [
    "s2020.ssts.edu.sg",
    "s2021.ssts.edu.sg",
    "s2022.ssts.edu.sg",
    "s2023.ssts.edu.sg",
    "s2024.ssts.edu.sg",
    "s2025.ssts.edu.sg",
    "s2026.ssts.edu.sg",
    "sst.edu.sg",
  ];
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const windowWidth = Dimensions.get("window").width;
  const navigation = useNavigation();
  const [error, setError] = useState("");
  const [house, setHouse] = useState("");

  const database = firebase.database().ref();
  // const db = firebase.firestore();

  // const query = db.collectionGroup("");
  const addEmailToDatabase = (email) => {
    // Generate a unique key for the email
    const emailKey = database.child("emails").push().key;

    const emailData = {
      email_address: email,
      timestamp: new Date().toISOString(),
    };

    database
      .child(`emails/${emailKey}`)
      .set(emailData)
      .then(() => console.log("Email added to database"))
      .catch((error) => console.error(error));
  };

  const handleSignUp = () => {
    const emailDomain = email.split("@")[1];
    if (!allowedEmailDomains.includes(emailDomain)) {
      alert(
        "This domain is not allowed. Please enter your SST school email account"
      );
      return;
    }
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;

        // Create an object to store user data
        const userData = {
          email: user.email,
          password: password,
          house: house,
          points: 0,
          steps: 0,
        };

        // Save the user data to Firebase Firestore or Realtime Database
        // Example using Firestore
        firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .set(userData)
          .then(() => {
            console.log("User data added to Firestore");
            navigation.replace("Onboarding");
          })
          .catch((error) => {
            console.error("Error adding user data to Firestore:", error);
            alert(error.message);
          });
      })
      .catch((error) => alert(error.message));
  };
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Blue", value: "Blue" },
    { label: "Black", value: "Black" },
    { label: "Yellow", value: "Yellow" },
    { label: "Green", value: "Green" },
    { label: "Red", value: "Red" },
  ]);

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <Text
        style={{
          fontSize: 45,
          fontWeight: "800",
          bottom: 80,
          marginHorizontal: 30,
        }}
      >
        Join The House Today.
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email Address"
          value={email}
          onChangeText={(text) => setEmail(text)}
          // onChangeText={handleChange}
          autoCapitalize="none"
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        <DropDownPicker
          placeholder="Select your house"
          placeholderStyle={{
            color: "grey",
            fontWeight: "bold",
          }}
          style={{ top: 10 }}
          open={open}
          value={house}
          items={items}
          setOpen={setOpen}
          setValue={setHouse}
          setItems={setItems}
        />

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => {
              // handledomain();
              handleSignUp();
            }}
            style={[
              styles.button,
              styles.buttonOutline,
              { marginTop: 20, width: "80%" },
            ]}
          >
            <Text style={styles.buttonOutlineText}>Sign Up</Text>
          </TouchableOpacity>
          {error !== "" && <Text>{error}</Text>}
        </View>
        <View>
          <View>
            <Text
              style={{
                textAlign: "center",
                color: "#B2B2B2",
                fontSize: 17,
                top: 4,
              }}
            >
              -or-
            </Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Text>Already have an account?</Text>
            <TouchableOpacity
              onPress={() => navigation.replace("Login")}
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <Text
                style={{
                  color: "#DB5461",
                  left: 5,
                  top: 9,
                  textDecorationLine: "underline",
                  marginBottom: 15,
                  fontWeight: "600",
                }}
              >
                Log In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  inputContainer: {
    width: "80%",
    top: -50,
  },
  input: {
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#DB5461",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "#DB5461",
    marginTop: 5,
    borderColor: "#DB5461",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
});
