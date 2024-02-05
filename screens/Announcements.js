import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl
} from "react-native";
import firebase from "firebase";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Info from "./Info";
import SearchBar from "../components/SearchBar";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Info1 from "./Info1";
import { ScrollView } from "react-native-gesture-handler";

function Events() {
  const navigation = useNavigation();
  const [masterData, setMasterData] = useState([]);
  const [users, setUsers] = useState([]);
  const eventRef = firebase.firestore().collection("houseevents");
  const [event, setevent] = useState([]);
  const eventz = () => {
    eventRef.onSnapshot((querySnapshot) => {
      const event = [];
      querySnapshot.forEach((doc) => {
        const { header, venue, date, desc } = doc.data();
        event.push({
          id: doc.id,
          header,
          venue,
          date,
          desc,
        });
      });
      setevent(event);
    });
  };
  useEffect(() => {
    eventz();
  }, []);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <Text
        style={{
          fontSize: 30,
          marginLeft: 10,
          marginTop: 10,
          fontWeight: "bold",
          marginBottom: 10,
        }}
      >
        House Events
      </Text>
      <FlatList
        style={{ height: "100%" }}
        data={event}
        numColumns={1}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <Pressable style={styles.container}>
            <TouchableOpacity
              style={[styles.innerContainer]}
              onPress={() =>
                navigation.navigate("Event", {
                  itemHeading: item.header,
                  itemText: item.venue,
                  itemDate: item.date,
                  itemDesc: item.desc,
                })
              }
            >
              <Text style={[styles.itemHeading, { paddingBottom: 8 }]}>
                {item.header}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={[styles.itemText, { fontWeight: "600" }]}>
                  Venue:{" "}
                </Text>
                <Text
                  style={[styles.itemText, { textDecorationLine: "underline" }]}
                >
                  {item.venue}
                </Text>
              </View>

              <View style={{ flexDirection: "row" }}>
                <Text
                  style={[
                    styles.itemText,
                    { paddingTop: 7, fontWeight: "600" },
                  ]}
                >
                  Date:
                </Text>
                <Text
                  style={[
                    styles.itemText,
                    {
                      paddingTop: 7,
                      textDecorationLine: "underline",
                      left: 4,
                    },
                  ]}
                >
                  {item.date}
                </Text>
              </View>
            </TouchableOpacity>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}
function Announcements() {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const announcementsref = firebase.firestore().collection("Announcements");

  const announcements = () => {
    announcementsref.onSnapshot((querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        const { header, text } = doc.data();
        users.push({
          id: doc.id,
          header,
          text,
        });
      });
      setUsers(users);
    });
  };
  useEffect(() => {
    announcements();
  }, []);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);
  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <Text
        style={{
          fontSize: 30,
          marginLeft: 10,
          marginTop: 10,
          fontWeight: "bold",
          marginBottom: 10,
        }}
      >
        House Announcements
      </Text>
      <FlatList
        style={{  }}
        data={users}
        numColumns={1}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <Pressable style={styles.container}>
            <TouchableOpacity
              style={[styles.innerContainer, {maxHeight: 100}]}
              onPress={() =>
                navigation.navigate("Announcement", {
                  itemHeading: item.header,
                  itemText: item.text,
                })
              }
            >
              <Text style={[styles.itemHeading, { paddingBottom: 7 }]}>
                {item.header}
              </Text>
              <Text style={styles.itemText} numberOfLines={3} ellipsizeMode="tail">
              {item.text}
            </Text>
            </TouchableOpacity>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF", // A clean, white background for each item for better readability
    paddingVertical: 20, // Increased vertical padding for a more spacious look
    paddingHorizontal: 15, // Adequate horizontal padding for content separation
    marginHorizontal: 10, // Keep horizontal margin for spacing between items and screen edge
    marginVertical: 5, // Reduced vertical margin to tighten the list without overcrowding
    borderRadius: 12, // Increased border radius for a more modern, rounded look
    borderWidth: 1, // Slightly thicker border for better definition
    borderColor: "#E0E0E0", // Light grey border for subtlety
    elevation: 2, // Android shadow
    shadowColor: "#000", // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
    shadowOpacity: 0.1, // Shadow opacity for iOS
    shadowRadius: 4, // Shadow blur radius for iOS
  },
  innerContainer: {
    flexDirection: "column", 
  },
  itemHeading: {
    fontWeight: "bold", // Bold for emphasis
    fontSize: 18, // Slightly reduced font size for balance
    color: "#333", // Darker text for better readability
    paddingBottom: 8, // Adjusted padding for visual separation
  },
  itemText: {
    fontWeight: "400", // Normal weight for body text for better readability
    fontSize: 16, // Adjusted font size for readability
    color: "#666", // Soft black for text, less harsh than pure black
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    marginVertical: 10, // Adjusted for vertical spacing
    marginHorizontal: 10, // Ensures consistent spacing around the input
    borderColor: "#CCC", // Lighter border color for the input field
    borderRadius: 20, // Rounded corners for the input field
  },
  subTitle: {
    color: "#999", // Light grey for subtlety
    fontSize: 14, // Adjusted font size for subtlety
    marginVertical: 10, // More vertical spacing
    marginHorizontal: 15, // Consistent horizontal spacing
  },
});

const Stack = createNativeStackNavigator();

function AnnouncementStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Announcements"
        component={Announcements}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Announcement"
        component={Info}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
}
function EventsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Events"
        component={Events}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Event" component={Info1} />
    </Stack.Navigator>
  );
}
const Tab = createMaterialTopTabNavigator();
export default function MyTabs() {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Text
        style={{
          fontSize: 39,
          fontWeight: "bold",
          padding: 10,
          marginTop: 5,
        }}
      >
        Announcements
      </Text>
      <Text style={styles.subTitle}>SNW PLS</Text>
      {/* <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      /> */}
      <Tab.Navigator style={{ top: 30 }}>
        <Tab.Screen name="ANNOUNCEMENTS" component={AnnouncementStack} />
        <Tab.Screen name="EVENTS" component={EventsStack} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
