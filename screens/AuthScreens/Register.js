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
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const windowWidth = Dimensions.get("window").width;

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Onboarding");
      }
    });

    return unsubscribe;
  }, []);
  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Registered with:", user.email);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {/* <Text
        style={{
          bottom: 100,
          left: -110,
          fontStyle: "italic",
          fontWeight: "500",
          fontSize: 20,
        }}
      >
        GrowCalth
      </Text> */}
      <Text
        style={{
          fontSize: 50,
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
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity
            onPress={handleSignUp}
            style={[
              styles.button,
              styles.buttonOutline,
              { marginTop: 20, width: "80%" },
            ]}
          >
            <Text style={styles.buttonOutlineText}>Sign Up</Text>
          </TouchableOpacity>
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
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              {/* Google View */}
              <TouchableOpacity
                style={{
                  backgroundColor: "#4267B2",
                  borderRadius: 8,
                  alignSelf: "center",
                  width: windowWidth - 290,
                  top: 10,
                  left: -9,
                }}
              >
                <FontAwesome
                  name="facebook"
                  style={{
                    paddingVertical: 15,
                    alignSelf: "center",
                    color: "white",
                  }}
                  size={25}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#C1CAD6",
                  borderRadius: 8,
                  alignSelf: "center",
                  width: windowWidth - 290,
                  top: 10,
                }}
              >
                <AntDesign
                  name="google"
                  style={{
                    paddingVertical: 15,
                    alignSelf: "center",
                  }}
                  size={25}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "black",
                  borderRadius: 8,
                  alignSelf: "center",
                  width: windowWidth - 290,
                  top: 10,
                  left: 10,
                }}
              >
                <FontAwesome
                  name="apple"
                  style={{
                    paddingVertical: 17,
                    color: "white",
                    alignSelf: "center",
                  }}
                  size={23}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              top: 15,
            }}
          >
            <Text style={{ top: 2 }}>Already have an account?</Text>
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
