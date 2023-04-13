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
              <Text style={styles.itemText}>{item.text}</Text>
            </TouchableOpacity>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FEFBF6",
    padding: 15,
    marginHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 0.5,
  },
  innerContainer: {
    flexDirection: "column",
    borderRadius: 15,
  },
  itemHeading: {
    fontWeight: "700",
    fontSize: 20,
  },
  itemText: {
    fontWeight: "300",
    fontSize: 17,
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: "black",
  },
  subTitle: {
    color: "#C1CAD6",
    marginTop: -5,
    marginHorizontal: 14,
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
