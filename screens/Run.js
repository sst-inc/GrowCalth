// @flow
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Platform,
  TouchableOpacity,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import MapView, { UrlTile, Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Stopwatch, Timer } from "react-native-stopwatch-timer";

const RunScreen = (props) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isTimerStart, setIsTimerStart] = useState(false);
  const [isStopwatchStart, setIsStopwatchStart] = useState(false);
  const [resetStopwatch, setResetStopwatch] = useState(false);
  useEffect(() => {
    (async () => {
      if (Platform.OS === "android" && !Device.isDevice) {
        setErrorMsg(
          "Oops, this will not work on Snack in an Android Emulator. Try it on your device!"
        );
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  async function GetLocation() {}

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ flex: 1, padding: 10, marginTop: 5 }}>
          <Text style={{ fontWeight: "bold", fontSize: 38 }}>Running</Text>
          <Text style={{ color: "#C1CAD6" }}>Just keep running</Text>

          <MapView
            style={{ width: 400, height: 400, borderRadius: 15, marginTop: 10 }}
          />
          <View
            style={{
              marginTop: 13,
              width: 400,
              height: 250,
              borderRadius: 10,
              backgroundColor: "white",
            }}
          >
            <View style={styles.sectionStyle}>
              <Stopwatch
                laps
                msecs
                start={isStopwatchStart}
                //To start
                reset={resetStopwatch}
                //To reset
                options={options}
                //options for the styling
                getTime={(time) => {
                  console.log(time);
                }}
              />
              <TouchableHighlight
                onPress={() => {
                  setIsStopwatchStart(!isStopwatchStart);
                  setResetStopwatch(false);
                }}
              >
                <Text style={styles.buttonText}>
                  {!isStopwatchStart ? "START" : "STOP"}
                </Text>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => {
                  setIsStopwatchStart(false);
                  setResetStopwatch(true);
                }}
              >
                <Text style={styles.buttonText}>RESET</Text>
              </TouchableHighlight>
            </View>
            <TouchableOpacity
              style={{
                borderRadius: 10,
                width: 380,
                justifyContent: "center",
                alignItems: "center",
                top: -10,
                margin: 10,
                height: 40,
                backgroundColor: "#7CC6FE",
                shadowOffset: { width: -2, height: 4 },
                shadowOpacity: 1,
                shadowRadius: 3,
              }}
              onPress={
                (GetLocation,
                () => {
                  setIsStopwatchStart(!isStopwatchStart);
                  setResetStopwatch(false);
                })
              }
              // () => setTimerOn((current) => !current
            >
              <Text style={{ fontWeight: "800", fontSize: 20 }}>
                {!isStopwatchStart ? "Start your run!" : "Stop your run!"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default RunScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    padding: 20,
  },
  sectionStyle: {
    flex: 1,
    marginTop: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 20,
    marginTop: 10,
  },
});

const options = {
  container: {
    backgroundColor: "#FF0000",
    padding: 5,
    borderRadius: 5,
    width: 200,
    alignItems: "center",
  },
  text: {
    fontSize: 25,
    color: "#FFF",
    marginLeft: 7,
  },
};
