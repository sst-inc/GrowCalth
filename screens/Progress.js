import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  AppState,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { Pedometer } from "expo-sensors";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import {stepCount, updateStepCount} from './Home'
import Task from "../components/Task";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Progress = () => {
  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask(null);
  };
  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const [PedometerAvailability, setPedometerAvailability] = useState("");
  const [stepCount, updateStepCount] = useState(0);
  const calories = stepCount / 1000;

  useEffect(() => {
    subscribe();
  }, []);

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
  var dist = stepCount / 1300;
  var distance = dist.toFixed(2);

  var caloriesB = distance * 60;
  var caloriesBurnt = caloriesB.toFixed(2);

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

  
  
  useEffect(() => {
    return () => {
      subscribe();
    };
  }, []);
  const points = stepCount / 10000;
  const point = points.toFixed(0);

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  


  return (
    <ScrollView>
      <View style={{ paddingHorizontal: 30, paddingTop: 15, flex: 1 }}>
        <Text
          style={{ fontSize: 35, fontWeight: "bold", marginHorizontal: -20 }}
        >
          This week
        </Text>
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: "white",
            marginHorizontal: 260,
          }}
        >
          {/* Distance */}
          <View style={styles.middile}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>{distance}</Text>
            <Text>km</Text>
          </View>
        </View>
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: "white",
            marginHorizontal: 260,
            top: 30,
          }}
        >
          {/* Calories */}
          <View style={styles.middile}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              {caloriesBurnt}
            </Text>
            <Text>kcal</Text>
          </View>
        </View>
        <View
          style={{
            width: 200,
            height: 200,
            borderRadius: 100,
            backgroundColor: "white",
            top: -155,
          }}
        >
          {/* Steps */}
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 40 }}>
              {stepCount}
            </Text>
            <Text style={{ fontWeight: "500", fontSize: 20 }}>steps</Text>
          </View>
        </View>
        <View>
          <View
            style={{
              borderRadius: 16,
              backgroundColor: "white",
              height: 220,
              width: Dimensions.get("window").width - 30,
              marginTop: -140,
              marginHorizontal: -15,
            }}
          >
            <View style={{}}>
              <LineChart
                data={{
                  labels: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
                  datasets: [
                    {
                      data: [20, 45, 28, 80, 99, 43, 10],
                      strokeWidth: 2,
                    },
                  ],
                }}
                width={Dimensions.get("window").width - 40}
                height={200}
                chartConfig={{
                  backgroundColor: "white",
                  backgroundGradientFrom: "white",
                  backgroundGradientTo: "white",
                  // decimalPlaces: 2,
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                }}
                style={{
                  borderRadius: 16,
                  flex: 1,
                  alignItems: "center",
                  top: 110,
                  justifyContent: "center",
                  borderRadius: 15,
                }}
              />
            </View>
          </View>
        </View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "800",
            textDecorationLine: "underline",
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          Days Active
        </Text>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              height: 150,
              width: (windowWidth - 30) / 2,
              backgroundColor: "#251F1D",
              borderRadius: 23,
              justifyContent: "center",
              alignItems: "center",
              marginRight: -20,
              marginLeft: -20,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 50, color: "white" }}>
              {streak}
            </Text>
            <Text style={{ fontSize: 30, color: "white" }}>days</Text>
          </View>
          <View
            style={{
              height: 150,
              width: (windowWidth - 30) / 2,
              backgroundColor: "#FCE2DB",
              borderRadius: 23,
              left: 20,
              top: 20,
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 10,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 50 }}>{point}</Text>
            <Text style={{ fontSize: 20, color: "black" }}>This Week</Text>
          </View>
          <Text
            style={{
              marginHorizontal: -150,
              fontSize: 20,
              fontWeight: "800",
              textDecorationLine: "underline",
              bottom: 10,
            }}
          >
            House Points
          </Text>
        </View>
      </View>

    </ScrollView>
  );
};

export default Progress;

const styles = StyleSheet.create({
  middile: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
  },
  taskWrapper: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 10,
  },
  writeTaskWrapper: {
    bottom: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addText: {},
});
