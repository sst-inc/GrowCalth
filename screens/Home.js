import {
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
  AppState,
  Dimensions,
  TouchableOpacityBase,
  PermissionsAndroid,
  Alert,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pedometer } from "expo-sensors";
import { useNavigation } from "@react-navigation/native";
import Insights from "./Insights";
import Progresses from "./Progress";
import Quotes from "./Quotes";
import Goals from "./Goals";
import LeaderBoard from "./LeaderBoard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase from "firebase/app";
import { auth } from "../firebase";

const Homes = ({ route }) => {
  // const param = route.params.house;
  // const selectedHouse = param.house;

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const getQuote = () => {
    fetch("https://api.quotable.io/random")
      .then((res) => res.json())
      .then((result) => {
        setQuote(result.content);
        setAuthor(result.author);
      });
  };
  useEffect(() => {
    getQuote();
  }, []);
  const [PedometerAvailability, setPedometerAvailability] = useState("");
  let [stepCount, updateStepCount] = useState(0);
  const calories = stepCount / 25;
  const caloriesB = calories.toFixed(1);

  const subscribe = () => {
    const subscription = Pedometer.watchStepCount((result) =>
      updateStepCount(result.steps)
    );
    Pedometer.isAvailableAsync().then(
      (result) => {
        setPedometerAvailability(String(result));
      },
      (error) => {
        setPedometerAvailability(error);
      }
    );
  };
  useEffect(() => {
    subscribe();
  }, []);

  async function UpdatePoints() {
    const user = await firebase
      .firestore()
      .collection("users")
      .doc(auth.currentUser.uid);

    const data = (await user.get()).data();

    const newPoints = Math.floor((data.steps + 1) / 1000);
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", newPoints);

    await user.update({ steps: data.steps + 1, points: newPoints });
    if (newPoints > data.points) {
      const house = await firebase
        .firestore()
        .collection("HousePoints")
        .doc(data.house);

      house.update({ points: (await house.get()).data().points + 1 });
    }
  }

  // useEffect(() => {
  //   const interval = setInterval(
  //     () => updateStepCount((state) => state + 1),
  //     10
  //   );
  //   return () => clearInterval(interval);
  // }, []);
  // to increase stepcount every 100 milliseconds
  useEffect(() => {
    UpdatePoints();
  }, [stepCount]);

  const navigation = useNavigation();
  const [Quote, setQuote] = useState();
  const [Author, setAuthor] = useState();
  const [isLoading, setIsLoading] = useState(true);

  var dist = stepCount / 1300;
  var distance = dist.toFixed(2);

  const [streak, setStreak] = useState(1);
  useEffect(() => {
    // Load the last opened date from AsyncStorage
    AsyncStorage.getItem("lastOpenedDate").then((dateString) => {
      const lastOpenedDate = dateString ? new Date(dateString) : null;

      if (lastOpenedDate && isYesterday(lastOpenedDate)) {
        // If the app was opened yesterday, increment the streak
        setStreak((prevStreak) => prevStreak + 1);
      } else if (!lastOpenedDate || isOlderThanYesterday(lastOpenedDate)) {
        // If the app was not opened yesterday or there is no stored date, reset the streak
        setStreak(1);
      }

      // Save the current date to AsyncStorage
      AsyncStorage.setItem("lastOpenedDate", new Date().toISOString());
    });
  }, []);

  function isYesterday(date) {
    const today = new Date();
    const yesterday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 1
    );
    return (
      date.getFullYear() === yesterday.getFullYear() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getDate() === yesterday.getDate()
    );
  }

  function isOlderThanYesterday(date) {
    const today = new Date();
    const yesterday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 1
    );
    return date < yesterday;
  }
  const resetVariable = () => {
    updateStepCount(0);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const midnight = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1, // set the date to tomorrow
        0, // set hours to midnight
        0, // set minutes to 0
        0 // set seconds to 0
      );
      const timeUntilMidnight = midnight - now;

      setTimeout(() => {
        resetVariable();
      }, timeUntilMidnight);
    }, 86400000); // repeat every 24 hours

    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: "#FFFFF" }}>
      <ScrollView>
        <View style={styles.largeTitle}>
          <View style={{ paddingTop: 5 }}></View>
          <Text
            style={{
              fontSize: 39,
              fontWeight: "bold",
              color: "black",
              textShadowColor: "white",
              textShadowRadius: 2,
              textShadowOffset: {
                width: 3,
                height: 3,
              },
            }}
          >
            Home
          </Text>
          <Text style={styles.subTitle}>This is Home, truly</Text>
        </View>
        {/* <TouchableOpacity style={{borderWidth: 1.23, borderColor: 'black', width: 190, height: 170, marginHorizontal: 215, borderRadius: 15, marginTop: 50, marginBottom: -175, backgroundColor: 'white'}}>
            <Text>Progress</Text>
          </TouchableOpacity> */}
        <View style={{ backgroundColor: "#F2F2F2" }}>
          <View style={{ top: -10 }}>
            <TouchableOpacity
              style={{
                width: (windowWidth - 50) / 2,
                height: 170,
                borderRadius: 15,
                marginTop: 30,
                marginBottom: -170,
                marginLeft: (windowWidth + 25) / 2,
                shadowColor: "black",
                shadowColor: "#171717",
                backgroundColor: "black",
                shadowOffset: { width: -2, height: 4 },
                shadowOpacity: 0.9,
                shadowRadius: 3,
              }}
              onPress={() => navigation.navigate("LeaderBoard")}
            >
              <Text
                style={{
                  paddingHorizontal: 10,
                  fontSize: 15,
                  fontWeight: "bold",
                  paddingTop: 10,
                  color: "white",
                }}
              >
                Leaderboards
              </Text>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: 15,
                }}
              >
                <Image
                  source={require(".././assets/LeaderBoard.png")}
                  style={{ height: 110, width: 110 }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.insightView}>
              <Text style={[styles.insights]}>Steps</Text>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <View style={styles.circle}>
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ fontSize: 30, fontWeight: "bold" }}>
                      {stepCount}
                    </Text>
                    <Text>steps</Text>
                  </View>
                </View>
              </View>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                {/* <Progress.Circle size={140} progress={20} maxValue/>      */}
              </View>
              {/* <CircularProgress 
              value={stepCount}
              maxValue={6500}
              radius={80}
              activeStrokeColor={"black"}
              inActiveStrokeColor={"black"}
              inActiveStrokeOpacity={0.5}
              inActiveStrokeWidth={20}
              activeStrokeWidth={20}
              title={"steps"}
              titleColor={"black"}
              titleStyle={{ fontWeight: "bold" }}
            /> */}
            </TouchableOpacity>
          </View>
          <View style={{ paddingTop: -10 }}>
            <View
              style={{
                marginTop: 38,
                paddingHorizontal: 5,
              }}
            ></View>
            <StatusBar style="auto" />
            <View
              style={{
                paddingHorizontal: (windowWidth - 15) / 2,
                marginTop: -80,
                marginLeft: 19,
              }}
            >
              <TouchableOpacity
                style={{
                  width: (windowWidth - 52) / 2,
                  height: 235,
                  borderRadius: 15,
                  borderColor: "white",
                  paddingHorizontal: 10,
                  shadowColor: "black",
                  shadowColor: "#171717",
                  backgroundColor: "white",
                  top: 4,
                  shadowOffset: { width: -2, height: 4 },
                  shadowOpacity: 0.9,
                  shadowRadius: 3,
                  backgroundColor: "#FFFFFF",
                }}
                onPress={() => navigation.navigate("Progress")}
              >
                {/* Progress */}
                <Text style={{ fontSize: 19, fontWeight: "bold", top: 10 }}>
                  Progress
                </Text>
                <Text
                  style={{
                    fontSize: 63,
                    fontWeight: "900",
                    textAlign: "center",
                    top: 32,
                  }}
                >
                  {streak}
                </Text>
                <Text
                  style={{ textAlign: "center", fontSize: 25, marginTop: 23 }}
                >
                  days in this app
                </Text>
              </TouchableOpacity>
            </View>
            <StatusBar style="auto" />
            <TouchableOpacity style={{ paddingHorizontal: 20, paddingTop: 75 }}>
              <View style={styles.dailyQuotes}>
                {/* Distance */}
                <Text
                  style={{
                    fontSize: 17.5,
                    fontWeight: "bold",
                    color: "black",
                    marginTop: -4,
                  }}
                >
                  Distance
                </Text>
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      width: 120,
                      height: 120,
                      borderRadius: 80,
                      backgroundColor: "#EFECE5",
                      marginHorizontal: 17,
                      top: 10,

                      borderColor: "black",
                      borderWidth: 7,
                    }}
                  >
                    <Text style={{ fontSize: 30, fontWeight: "bold" }}>
                      {distance}
                    </Text>
                    <Text>km</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 130,
                width: windowWidth - 35,
                borderRadius: 10,
                borderWidth: 0,
                marginLeft: 20,
                bottom: 240,
                shadowColor: "black",
                shadowColor: "#171717",
                backgroundColor: "#B7CADB",
                shadowOffset: { width: -2, height: 4 },
                shadowOpacity: 0.9,
                shadowRadius: 3,
              }}
              onPress={() => navigation.navigate("Quotes")}
            >
              <Text
                style={{
                  paddingTop: 10,
                  paddingHorizontal: 10,
                  fontSize: 18,
                  fontWeight: "900",
                  color: "#100F0F",
                }}
              >
                {Quote}
              </Text>
              <Text
                style={{
                  paddingHorizontal: 205,
                  paddingTop: 5,
                  fontStyle: "italic",
                  fontWeight: "600",
                  fontSize: 17,
                  color: "#100F0F",
                  justifyContent: "center",
                  alignItems: "center",
                  textDecorationLine: "underline",
                }}
              >
                {Author}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 165,
                width: windowWidth - 34,
                borderRadius: 15,
                backgroundColor: "#754F5B",
                marginHorizontal: 20,
                marginTop: -220,
                shadowColor: "black",
                shadowColor: "#171717",
                shadowOffset: { width: -2, height: 4 },
                shadowOpacity: 0.9,
                shadowRadius: 3,
              }}
              onPress={() => navigation.navigate("Goals")}
            >
              <Text
                style={{
                  padding: 10,
                  fontWeight: "bold",
                  fontSize: 22,
                  color: "white",
                }}
              >
                Set your Goals 🎯
              </Text>
              <Text
                style={{
                  paddingHorizontal: 10,
                  top: -3,
                  fontSize: 12,
                  color: "white",
                  fontWeight: "500",
                }}
              >
                Goals are helpful
              </Text>
              <Text style={{ fontSize: 110, left: -10, bottom: 10 }}>🎯</Text>
            </TouchableOpacity>

            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 20,
                paddingBottom: 10,
              }}
            >
              <Text style={{ fontSize: 10, color: "#C1CAD6" }}>
                Copyright GrowCalth © 2022 All rights Reserved{" "}
              </Text>
              <Text style={{ fontSize: 10, color: "#C1CAD6" }}>
                Singapore, Singapore City{" "}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const windowWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ACCBE1",
    // backgroundColor: '#CEE5F2',
    //or can try use this as background colour: #7C98B3 or #ACCBE1 or #B1B695
  },
  largeTitle: {
    marginTop: 10,
    paddingHorizontal: 10,
    backgroundColor: "#EFF1F5",
    // this is the weird blue color background (change ltr pls)
  },
  subTitle: {
    color: "#C1CAD6",
    marginTop: 4,
  },
  insights: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginTop: 10,
  },
  insightView: {
    width: (windowWidth - 50) / 2,
    height: 220,
    borderRadius: 15,
    borderColor: "white",
    borderWidth: 0,
    paddingHorizontal: 10,
    shadowColor: "black",
    shadowColor: "#171717",
    backgroundColor: "white",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.9,
    shadowRadius: 3,
    marginHorizontal: 20,
  },
  dailyQuotes: {
    width: (windowWidth - 45) / 2,
    height: 190,
    borderRadius: 15,
    paddingTop: 15,
    paddingHorizontal: 10,
    top: -260,
    shadowColor: "black",
    shadowColor: "#171717",
    backgroundColor: "white",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.9,
    shadowRadius: 3,
  },
  middle: {
    paddingHorizontal: 20,
    marginTop: 5,
  },
  white: {
    width: 100,
    height: 10,
    backgroundColor: "black",
  },
  top: {
    marginTop: -3,
  },
  quotes: {
    marginTop: 53,
    paddingHorizontal: 5,
  },
  quote: {
    fontSize: 26.7,
    fontWeight: "bold",
    color: "#473144",
    marginTop: -40,
  },
  circle: {
    width: 130,
    height: 130,
    borderRadius: 80,
    backgroundColor: "#EFECE5",
    marginHorizontal: 10,
    marginTop: 20,
    borderColor: "black",
    borderWidth: 7,
  },
  moreInsights: {
    paddingTop: 170,
    paddingHorizontal: 30,
  },
  Click: {
    color: "#B7B5B3",
    textDecorationLine: "underline",
  },
  paddin: {
    paddingHorizontal: 25,
    marginTop: -3,
  },
});

const Stack = createNativeStackNavigator();

export default function Stacks() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Homes"
        component={Homes}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Steps"
        component={Insights}
        options={{ headerBackTitle: "Home" }}
      />
      <Stack.Screen
        name="Progress"
        component={Progresses}
        options={{ headerBackTitle: "Home" }}
      />
      <Stack.Screen
        name="Quotes"
        component={Quotes}
        options={{ headerBackTitle: "Home", backgroundColor: "#B1E1FF" }}
      />
      <Stack.Screen
        name="Goals"
        component={Goals}
        options={{ headerBackTitle: "Home" }}
      />
      <Stack.Screen
        name="LeaderBoard"
        component={LeaderBoard}
        options={{ headerBackTitle: "Home" }}
      />
    </Stack.Navigator>
  );
}
