import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
  Dimensions,
} from "react-native";
import { auth } from "../../firebase";
import Forgot from "./Forgot";

const LoginScreen = () => {
  const windowWidth = Dimensions.get("window").width;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        if (user.email === "calebhan08js@gmail.com" | "admin@growcalthadmin.com") {
          navigation.replace("Admin");
        } else {
          navigation.replace("Tab");
        }
      }
    });

    return unsubscribe;
  }, []);



  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with:", user.email);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text
        style={{
          fontSize: 55,
          fontWeight: "800",
          bottom: 80,
        }}
      >
        The House You Need.
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email Address"
          value={email}
          onChangeText={(text) => setEmail(text)}
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
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Forgot Password")}
        style={{ justifyContent: "center", alignItems: "center", top: -50 }}
      >
        <Text
          style={{
            color: "#B2B2B2",
            left: 5,
            top: 10,
            textDecorationLine: "underline",
            fontSize: 16,
          }}
        >
          Forgot Password?
        </Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              top: 10,
              fontSize: 15,
              fontStyle: "italic",
              fontWeight: "500",
            }}
          >
            Don't have an account yet?
          </Text>
          <TouchableOpacity
            onPress={() => navigation.replace("Sign Up")}
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <Text
              style={{
                color: "#DB5461",
                left: 5,
                top: 10,
                textDecorationLine: "underline",
                marginBottom: 15,
                fontWeight: "600",
              }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={{ fontSize: 15, fontWeight: "500" }}>
          Your house is waiting for ya!
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

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
    marginTop: 22,
    top: -50,
  },
  button: {
    backgroundColor: "#DB5461",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
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
    color: "#DB5461",
    fontWeight: "700",
    fontSize: 16,
  },
});
