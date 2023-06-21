import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as Progress from "react-native-progress";
import * as firebase from "firebase";
// import { useNavigation } from "@react-navigation/native";
import { Pedometer } from "expo-sensors";
// import firebase from "firebase/app";
import { auth } from "../firebase";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
const windowWidth = Dimensions.get("window").width;
// const windowHeight = Dimensions.get("window").height;

const Challenges = () => {
  const windowWidth = Dimensions.get("window").width;
  // const windowHeight = Dimensions.get("window").height;

  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  // const [masterData, setMasterData] = useState([]);
  const [users, setUsers] = useState([]);
  const challengesRef = firebase.firestore().collection("challenges");

  useEffect(() => {
    challengesRef.onSnapshot((querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        const { heading, text, points } = doc.data();
        users.push({
          id: doc.id,
          heading,
          text,
          points,
        });
      });
      setUsers(users);
    });
  }, []);
  let [stepCount, updateStepCount] = useState(0);
  const subscribe = () => {
    const subscription = Pedometer.watchStepCount((result) =>
      updateStepCount(result.steps)
    );
    Pedometer.isAvailableAsync().then(
      (result) => {
        // setPedometerAvailability(String(result));
      },
      (error) => {
        // setPedometerAvailability(error);
      }
    );
  };
  useEffect(() => {
    subscribe();
  }, []);
  const [items, setItems] = useState([
    { text: "Walk a minimum of 15,000 steps today", target: 15000 },
    // { text: "Walk at least 5km today", target: 10000 },
    // { text: "Burn off 150 calories", target: 150000 },
    { text: "Get at least 10,000 steps", target: 10000 },
  ]);
  const [lastRefreshTime, setLastRefreshTime] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
    // Check if more than 24 hours have passed since last refresh
    const now = Date.now();
    if (!lastRefreshTime || now - lastRefreshTime > 24 * 60 * 60 * 1000) {
      // Set the last refresh time
      setLastRefreshTime(now);

      // Set the current item
      const randomIndex = Math.floor(Math.random() * items.length);
      setCurrentItem(items[randomIndex]);
    }
  }, [lastRefreshTime]);
  // Get the current day of the year (1 to 365)
  // const today = new Date();
  // const startOfYear = new Date(today.getFullYear(), 0, 0);
  // const diff = today - startOfYear;
  // const dayOfYear = Math.floor(diff / 86400000); // milliseconds in a day

  // // Use the day of the year as the seed for the random number generator
  // Math.seedrandom(dayOfYear);

  // // Shuffle the array using the Fisher-Yates algorithm
  // for (let i = stringsArray.length - 1; i > 0; i--) {
  //   const j = Math.floor(Math.random() * (i + 1));
  //   [stringsArray[i], stringsArray[j]] = [stringsArray[j], stringsArray[i]];
  // }

  const [challenge, setChallenge] = useState([]);
  const AddAlert = () => {
    Alert.alert(`Are you sure you want to take on this challenge?`, "WOOOOO", [
      {
        text: "YES, BRING IT ON",
        onPress: () => setChallenge(challenge),
        style: "cancel",
      },
      {
        text: "No I want my mommy",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
    ]);
  };

  async function UpdatePoints() {
    const user = await firebase
      .firestore()
      .collection("users")
      .doc(auth.currentUser.uid);

    const data = (await user.get()).data();

    const newPoints = Math.floor((data.steps + 1) / 1000);
    // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", currentItem.target);

    await user.update({ steps: data.steps + 1, points: newPoints });
    if (20000 >= currentItem.target) {
      const house = await firebase
        .firestore()
        .collection("HousePoints")
        .doc(data.house);

      house.update({ points: (await house.get()).data().points + 1 });
    }
  }
  useEffect(() => {
    UpdatePoints();
  }, [stepCount]);
  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <View
        style={{
          justifyContent: "center",
          padding: 10,
          marginTop: 5,
          backgroundColor: "white",
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 38 }}>Challenges</Text>
        <Text style={{ color: "#C1CAD6" }}>Whatever it is don't give up!</Text>
      </View>
      <View style={{ padding: 10, marginTop: 5 }}>
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>In Progress</Text>
        {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}> */}
        {/* <View
              style={{
                backgroundColor: "black",
                height: 200,
                borderRadius: 15,
                width: windowWidth - 50,
                marginRight: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: "black",
                  height: 200,
                  borderRadius: 15,
                  width: windowWidth - 50,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <>
                  {challenge.map((item) => (
                    <View>
                      <Text
                        style={{
                          color: "white",
                          padding: 5,
                          fontWeight: "bold",
                          fontSize: 30,
                          marginBottom: -30,
                        }}
                      >
                        {item.heading}
                      </Text>
                    </View>
                  ))}
                </>
                <Progress.Bar
                  progress={0}
                  width={200}
                  style={{ marginTop: 100 }}
                />
              </View>
            </View> */}
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <View
            style={{
              top: 10,
              backgroundColor: "black",
              height: 200,
              borderRadius: 15,
              width: windowWidth - 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                padding: 5,
                fontWeight: "bold",
                fontSize: 30,
                marginBottom: -10,
              }}
            >
              Daily Challenge
            </Text>
            <Text
              style={{
                color: "white",
                padding: 5,
                fontWeight: "bold",
                fontSize: 15,
                marginBottom: -30,
                marginTop: 10,
              }}
            >
              {currentItem && <Text>{currentItem.text}</Text>}
            </Text>
            <Progress.Bar progress={0} width={200} style={{ marginTop: 100 }} />
            <Text style={{ color: "white" }}>
              Progress: {stepCount} /{" "}
              {currentItem && <Text>{currentItem.target}</Text>} {" steps "}
            </Text>
          </View>
        </View>
        {/* </ScrollView> */}
      </View>
      <View style={{ padding: 10, marginTop: 5 }}>
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>For you</Text>
      </View>
      <View>
        {/*
              backgroundColor: "#FFFF82",
              backgroundColor: "#B5D99C",
         */}
        <FlatList
          style={{ height: "100%" }}
          data={users}
          searchPhrase={searchPhrase}
          setClicked={setClicked}
          numColumns={1}
          renderItem={({ item }) => (
            <Pressable style={[styles.containers]}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#E9ECF1",
                  flexDirection: "row",
                  marginBottom: 15,
                  borderRadius: 17,
                  marginHorizontal: 20,
                }}
                onPress={() => [setChallenge([...challenge, item])]}
              >
                <View
                  style={{
                    backgroundColor: "#89B3DD",
                    width: 35,
                    height: 35,
                    borderRadius: 10,
                    alignSelf: "center",
                    marginHorizontal: 15,
                  }}
                ></View>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <View
                    style={[
                      styles.innerContainer,
                      {
                        paddingHorizontal: 10,
                        width: windowWidth - 130,
                        height: 80,
                        borderRadius: 15,
                        marginLeft: 10,
                        justifyContent: "center",
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.itemHeading,
                        { padding: 5, color: "#252C45" },
                      ]}
                    >
                      {item.heading}
                    </Text>
                    <Text
                      style={[
                        styles.itemText,
                        { paddingHorizontal: 5, color: "#252C45" },
                      ]}
                    >
                      ✨{item.text}✨
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: 70,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 28,
                      marginRight: 10,
                      marginLeft: 10,
                      fontWeight: "800",
                    }}
                  >
                    {item.points}
                  </Text>
                </View>
              </TouchableOpacity>
            </Pressable>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Challenges;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: "white",
    padding: 20,
    marginVertical: 8,
    shadowColor: "black",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 3,
    width: windowWidth - 19,
    borderRadius: 14,
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
  },
  innerContainer: {
    flexDirection: "column",
    marginBottom: 20,
    justifyContent: "center",
  },
  itemHeading: {
    fontWeight: "bold",
    fontSize: 20,
  },
  itemText: {
    fontWeight: "300",
    fontSize: 16,
  },
  bottomSheet: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  progressBar: {
    height: 15,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "white",
    borderColor: "#000",
    borderWidth: 2,
    borderRadius: 5,
  },
});
