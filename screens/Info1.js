import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import { MaterialIcons, FontAwesome, Ionicons } from "@expo/vector-icons";

const Info1 = ({ route }) => {
  const [users, setUsers] = useState([]);
  const todoRef = firebase.firestore().collection("todos");
  const params = route.params;
  const itemHeading = params.itemHeading;
  const itemText = params.itemText;
  const itemDate = params.itemDate;
  const itemDesc = params.itemDesc;

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <SafeAreaView>
        <Text style={styles.itemHeading}>{itemHeading}</Text>
      </SafeAreaView>
      <ScrollView style={{ flex: 1 }}>
        <SafeAreaView>
          <SafeAreaView style={{ flexDirection: "row", left: 10 }}>
            <MaterialIcons name="location-on" size={45} style={{ top: 6 }} />

            <Text
              style={[
                {
                  fontWeight: "bold",
                  fontWeight: "400",
                  paddingTop: 10,
                  paddingHorizontal: 5,
                  fontSize: 30,
                  fontWeight: "bold",
                },
              ]}
            >
              Venue:
            </Text>
            <Text
              style={[styles.itemText, { textDecorationLine: "underline" }]}
            >
              {itemText}
            </Text>
          </SafeAreaView>
          <SafeAreaView style={{ flexDirection: "row", top: 20, left: 8 }}>
            <FontAwesome
              name="calendar"
              size={35}
              style={{ padding: 9, fontWeight: "bold" }}
            />
            <Text
              style={[
                {
                  paddingTop: 7,
                  fontWeight: "bold",
                  paddingTop: 10,
                  paddingHorizontal: 5,
                  fontSize: 30,
                },
              ]}
            >
              Date:
            </Text>
            <Text
              style={[
                styles.itemText,
                { paddingTop: 7, textDecorationLine: "underline", left: 4 },
              ]}
            >
              {itemDate}
            </Text>
          </SafeAreaView>
          <View style={{ flexDirection: "column" }}>
            <View style={{ flexDirection: "row", top: 34, left: 13 }}>
              <Ionicons name="document-text" size={40} style={{ top: 6 }} />
              <Text
                style={
                  (styles.itemText,
                  {
                    fontWeight: "600",
                    fontSize: 29,
                    paddingTop: 10,
                    paddingHorizontal: 8,
                  })
                }
              >
                Description:{" "}
              </Text>
            </View>
            <Text
              style={[
                styles.itemText,
                {
                  paddingTop: 45,
                  left: 4,
                  flexShrink: 1,
                  fontSize: 22,
                },
              ]}
            >
              {itemDesc}
            </Text>
          </View>
        </SafeAreaView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Info1;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#486B02",
    padding: 15,
    borderradius: 15,
    margin: 5,
    marginHorizontal: 10,
  },
  innerContainer: {
    flexDirection: "column",
  },
  itemHeading: {
    fontWeight: "bold",
    color: "black", // Changed to black: cant see anything
    fontSize: 25,
    padding: 15,
  },
  itemText: {
    fontWeight: "400",
    padding: 10,
    fontSize: 30,
    marginHorizontal: 5,
  },
});
