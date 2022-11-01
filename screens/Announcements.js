import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import firebase from "firebase";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Info from "./Info";
import SearchBar from "../components/SearchBar";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Info1 from "./Info1";

function Events() {
  const navigation = useNavigation();
  const [masterData, setMasterData] = useState([]);
  const [users, setUsers] = useState([]);
  const todoRef = firebase.firestore().collection("todos");

  const announcements = () => {
    todoRef.onSnapshot((querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        const { heading, text } = doc.data();
        users.push({
          id: doc.id,
          heading,
          text,
        });
      });
      setUsers(users);
    });
  };
  useEffect(() => {
    announcements();
  }, []);
  const eventRef = firebase.firestore().collection("houseevents");
  const [event, setevent] = useState([]);
  const eventz = () => {
    eventRef.onSnapshot((querySnapshot) => {
      const event = [];
      querySnapshot.forEach((doc) => {
        const { header, venue, date } = doc.data();
        event.push({
          id: doc.id,
          header,
          venue,
          date,
        });
      });
      setevent(event);
    });
  };
  useEffect(() => {
    eventz();
  }, []);
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
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
        renderItem={({ item }) => (
          <Pressable style={styles.container}>
            <TouchableOpacity
              style={[styles.innerContainer]}
              onPress={() =>
                navigation.navigate("Info1", {
                  itemHeading: item.header,
                  itemText: item.venue,
                  itemDate: item.date,
                })
              }
            >
              <Text style={[styles.itemHeading, { paddingBottom: 8 }]}>
                {item.header}
              </Text>
              <Text style={styles.itemText}>Venue: {item.venue}</Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={[styles.itemText, { paddingTop: 7 }]}>Date:</Text>
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
    </View>
  );
}
function Announcements() {
  const navigation = useNavigation();
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [masterData, setMasterData] = useState([]);
  const [users, setUsers] = useState([]);
  const todoRef = firebase.firestore().collection("todos");

  const announcements = () => {
    todoRef.onSnapshot((querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        const { heading, text } = doc.data();
        users.push({
          id: doc.id,
          heading,
          text,
        });
      });
      setUsers(users);
    });
  };
  useEffect(() => {
    announcements();
  }, []);
  const eventRef = firebase.firestore().collection("houseevents");
  const [event, setevent] = useState([]);
  const eventz = () => {
    eventRef.onSnapshot((querySnapshot) => {
      const event = [];
      querySnapshot.forEach((doc) => {
        const { header, venue, date } = doc.data();
        event.push({
          id: doc.id,
          header,
          venue,
          date,
        });
      });
      setevent(event);
    });
  };
  useEffect(() => {
    eventz();
  }, []);
  return (
    <ScrollView style={{ backgroundColor: "white", flex: 1, marginTop: 0 }}>
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
        scrollEnabled={false}
        data={users}
        numColumns={1}
        renderItem={({ item }) => (
          <Pressable style={styles.container}>
            <TouchableOpacity
              style={[styles.innerContainer]}
              onPress={() =>
                navigation.navigate("Info", {
                  itemHeading: item.heading,
                  itemText: item.text,
                })
              }
            >
              <Text style={[styles.itemHeading, { paddingBottom: 7 }]}>
                {item.heading}
              </Text>
              <Text style={styles.itemText}>{item.text}</Text>
            </TouchableOpacity>
          </Pressable>
        )}
      />
      {/* <PageControl
  style={{position:'absolute', left:0, right:0, bottom:10}}
  numberOfPages={3}
  currentPage={1}
  hidesForSinglePage
  pageIndicatorTintColor='gray'
  currentPageIndicatorTintColor='white'
  indicatorStyle={{borderRadius: 5}}
  currentIndicatorStyle={{borderRadius: 5}}
  indicatorSize={{width:8, height:8}}
//   onPageIndicatorPress={this.onItemTap}
/> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FEFBF6",
    // backgroundColor: 'white',
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
    fontWeight: "bold",
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
        name="Info"
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
      <Stack.Screen
        name="Info1"
        component={Info1}
        // options={{ headerShown: false }}
      />
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
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />
      <Tab.Navigator>
        <Tab.Screen name="ANNOUNCEMENTS" component={AnnouncementStack} />
        <Tab.Screen name="EVENTS" component={EventsStack} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
