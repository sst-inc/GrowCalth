import React from "react";
import { ScrollView } from "react-native";
import { Dimensions } from "react-native";
import { SafeAreaView, StyleSheet, Text, View, Image } from "react-native";

const AboutUs = () => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ backgroundColor: "white" }}>
          <Text style={{ fontSize: 34, fontWeight: "bold", padding: 15 }}>
            About Us!
          </Text>
          <View
            style={{
              width: windowWidth - 30,
              left: 16,
              borderRadius: 14,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#F6E8EA",
              hadowColor: "black",
              shadowColor: "#171717",
              shadowOffset: { width: -2, height: 4 },
              shadowOpacity: 1,
              shadowRadius: 3,
            }}
          >
            <Text
              style={{
                fontSize: 23,
                fontWeight: "500",
                fontStyle: "italic",
                top: 10,
                marginHorizontal: 10,
                marginBottom: 23,
              }}
            >
              We are a group of students from School of Science and Technology
              Singapore and we built this app together with a team of 4. We did
              this with the aim of wanting to benefit the community through
              fitness. We hope that you have enojoyed our app while you used it
              and if you have any enquiries or feeback, please email us at
              growcalth.main@gmail.com
            </Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 30,
              marginBottom: 10,
            }}
          >
            <Image
              source={require("../../assets/GrowCalthIcon.jpeg")}
              style={{
                width: windowWidth - 100,
                height: windowHeight - 600,
                borderRadius: 10,
                margin: 0,
                left: 0,
                top: -10,
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutUs;

const styles = StyleSheet.create({});
