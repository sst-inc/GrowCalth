import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
} from "react-native";
import Icon from "../components/Icon";

const Workouts = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ flex: 1, paddingTop: 20, paddingHorizontal: 10 }}>
          <Text style={{ fontSize: 35, fontWeight: "bold" }}>Workouts</Text>
          <Text style={{ color: "#C1CAD6" }}>
            Waffles are just panckes with abs
          </Text>
          {/* Actual Code Starts Here */}
          <Text style={{ paddingTop: 20, fontSize: 28, fontWeight: "700" }}>
            For you
          </Text>
          <ScrollView horizontal>
            <View
              style={{
                height: 350,
                width: 335,
                borderRadius: 60,
                borderColor: "black",
                borderWidth: 1.23,
                marginTop: 20,
                marginLeft: 10,
                backgroundColor: "#CEE5D0",
              }}
            >
              {/*  */}
            </View>
            {/*  */}
            <View
              style={{
                height: 350,
                width: 335,
                borderRadius: 60,
                borderColor: "black",
                borderWidth: 1.23,
                marginTop: 20,
                marginLeft: 20,
                backgroundColor: "#CEE5D0",
              }}
            >
              {/*  */}
            </View>
            {/*  */}
            <View
              style={{
                height: 350,
                width: 335,
                borderRadius: 60,
                borderColor: "black",
                borderWidth: 1.23,
                marginTop: 20,
                marginLeft: 20,
                backgroundColor: "#CEE5D0",
              }}
            >
              {/*  */}
            </View>
            {/*  */}
            <View
              style={{
                height: 350,
                width: 335,
                borderRadius: 60,
                borderColor: "black",
                borderWidth: 1.23,
                marginTop: 20,
                marginLeft: 20,
                backgroundColor: "#CEE5D0",
              }}
            >
              {/*  */}
            </View>
            {/*  */}
            <View
              style={{
                height: 350,
                width: 335,
                borderRadius: 60,
                borderColor: "black",
                borderWidth: 1.23,
                marginTop: 20,
                marginLeft: 20,
                backgroundColor: "#CEE5D0",
              }}
            >
              {/*  */}
            </View>
            {/*  */}
            <View
              style={{
                height: 350,
                width: 335,
                borderRadius: 60,
                borderColor: "black",
                borderWidth: 1.23,
                marginTop: 20,
                marginLeft: 20,
                backgroundColor: "#CEE5D0",
              }}
            >
              {/*  */}
            </View>
          </ScrollView>
          <View>
            <Text
              style={{
                paddingTop: 20,
                fontSize: 28,
                fontWeight: "700",
                marginBottom: 8,
              }}
            >
              Trending
            </Text>
            <View
              style={{
                height: 180,
                width: 180,
                borderColor: "black",
                borderRadius: 15,
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                marginLeft: 15,
                backgroundColor: "white",
                shadowOffset: { width: -2, height: 4 },
                shadowOpacity: 1,
                shadowRadius: 3,
              }}
            >
              <Text></Text>
            </View>
            <View
              style={{
                height: 180,
                width: 180,
                borderColor: "black",
                borderRadius: 15,
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                marginTop: -180,
                marginLeft: 210,
                backgroundColor: "white",
                shadowOffset: { width: -2, height: 4 },
                shadowOpacity: 1,
                shadowRadius: 3,
              }}
            >
              <Text></Text>
            </View>
            <View
              style={{
                height: 180,
                width: 180,
                borderColor: "black",
                borderRadius: 15,
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 15,
                marginLeft: 15,
                backgroundColor: "white",
                shadowOffset: { width: -2, height: 4 },
                shadowOpacity: 1,
                shadowRadius: 3,
              }}
            >
              <Text></Text>
            </View>
            <View
              style={{
                height: 180,
                width: 180,
                borderColor: "black",
                borderRadius: 15,
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                marginTop: -180,
                marginLeft: 210,
                shadowColor: "black",
                shadowColor: "#171717",
                backgroundColor: "white",
                shadowOffset: { width: -2, height: 4 },
                shadowOpacity: 1,
                shadowRadius: 3,
              }}
            >
              <Text></Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Workouts;
