import React from "react";
import { useNavigation } from "@react-navigation/core";
import { TouchableOpacity } from "react-native";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { auth } from "../../firebase";
import LoginScreen from "./LoginScreen";

const Admin = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
      <Text
        style={{
          top: 50,
          fontSize: 20,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Add 
        </Text>
    </View>
  );
};

export default Admin;

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: "gray",
    marginVertical: 20,
    padding: 10,
    height: 40,
    alignSelf: "stretch",
    fontSize: 18,
  },
});
