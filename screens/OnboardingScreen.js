import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Text, View, Image, Dimensions, Alert } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import LoginScreen from "./AuthScreens/LoginScreen";
import { Picker } from "@react-native-picker/picker";

const OnboardingScreen = () => {
  const navigation = useNavigation();
  const windowWidth = Dimensions.get("window").width;
  const [selectedLanguage, setSelectedLanguage] = useState("None selected");
  // const auth = () => {
  //   if (selectedLanguage) === "None Selected" {
  //     Alert.alert(
  //       "Alert Title",
  //       "My Alert Msg",
  //       [
  //         {
  //           text: "Cancel",
  //           onPress: () => console.log("Cancel Pressed"),
  //           style: "cancel"
  //         },
  //         { text: "OK", onPress: () => console.log("OK Pressed") }
  //       ]
  //     );
  //   }
  // }

  const windowHeight = Dimensions.get("window").height;
  return (
    <Onboarding
      onSkip={() => navigation.replace("Tab")}
      onDone={() =>
        navigation.replace("Tab", { selectedHouse: selectedLanguage })
      }
      pages={[
        {
          backgroundColor: "#fff",
          image: (
            <Image
              source={{
                uri: "https://i.pinimg.com/originals/f4/b4/2f/f4b42fd35e95c9880e01cd98bd49b9fb.gif",
              }}
              style={{
                width: windowWidth - 20,
                height: windowHeight - 520,
                borderRadius: 15,
              }}
            />
          ),
          title: "Track your activity!",
          titleStyles: { fontWeight: "bold" },
          subTitleStyles: { color: "black" },
          subtitle:
            "With our in built pedometer, you can track your steps, calories and distance travelled! All in 1 app!",
        },
        {
          backgroundColor: "#fff",
          titleStyles: { fontWeight: "bold" },
          subTitleStyles: { color: "black" },
          image: (
            <Image
              source={{
                uri: "https://www.kindpng.com/picc/m/504-5044310_icon-quote-graphic-design-hd-png-download.png",
              }}
              style={{ width: windowWidth - 20, height: windowHeight - 520 }}
            />
          ),
          title: "Motivational Quotes",
          subtitle:
            "Having a positive mindset daily helps with you mental health!",
        },
        {
          backgroundColor: "#fff",
          titleStyles: { fontWeight: "bold" },
          subTitleStyles: { color: "black" },
          image: (
            <Image
              source={require("../assets/LeaderBoard.png")}
              style={{ width: windowWidth - 20, height: windowHeight - 520 }}
            />
          ),
          title: "Compete with others!",
          subtitle:
            "Take part in challenges to gain house points for your respective houses!",
        },
        {
          backgroundColor: "#fff",
          image: (
            <Picker
              style={{
                marginTop: 20,
                backgroundColor: "#C7CCDB",
                width: windowWidth - 50,
                borderRadius: 20,
              }}
              houses={selectedLanguage}
              selectedValue={selectedLanguage}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedLanguage(itemValue)
              }
            >
              <Picker.Item label="None Selected" value="None Selected" />
              <Picker.Item label="Blue" value="Blue" />
              <Picker.Item label="Black" value="Black" />
              <Picker.Item label="Yellow" value="Yellow" />
              <Picker.Item label="Red" value="Red" />
              <Picker.Item label="Green" value="Green" />
            </Picker>
          ),
          title: `Select your House! \nSelected House: ${selectedLanguage}`,
          titleStyles: { fontWeight: "bold" },
          subTitleStyles: { color: "black" },
          subtitle: `When you complete challenges, you get to add house points to your respective house! \n Selected House: ${selectedLanguage}`,
        },
      ]}
    />
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({});
