import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Switch,
  StyleSheet,
  Alert,
} from "react-native";
import Preferences from "../components/Preferences";
import Health from "../components/Health";
import General from "../components/General";
import Icon from "react-native-vector-icons/FontAwesome";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import Icond from "react-native-vector-icons/AntDesign";
import Iconse from "react-native-vector-icons/Ionicons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import AboutUs from "./settingsnav/AboutUs";
import HealthInfo from "./settingsnav/HealthInfo";
import MoreQuotes from "./settingsnav/MoreQuotes";
import AccountInfo from "./settingsnav/AccountInfo";
import { auth } from "../firebase";
import House from "./settingsnav/House";

const Settings = (props) => {
  const handleSignOut = () => {
    Alert.alert("Logout", "Are you sure you want to Logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Ok",
        onPress: () => {
          auth
            .signOut()
            .then(() => {
              navigation.replace("Login");
            })
            .catch((error) => alert(error.message));
        },
      },
    ]);
  };
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ backgroundColor: "#FFFF" }}>
      <View style={{ backgroundColor: "white" }}>
        <ScrollView>
          <Text
            style={{
              marginHorizontal: 15,
              fontWeight: "bold",
              fontSize: 40,
              top: 25,
              marginBottom: 20,
            }}
          >
            Settings
          </Text>
          <Text style={styles.subTitle}>Uncle Raymond Siollll</Text>
          <View style={{ flex: 0.5, paddingHorizontal: 33 }}>
            <View>
              <View
                style={{
                  backgroundColor: "#F7826F",
                  height: 30,
                  marginTop: 20,
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  marginHorizontal: -33,
                }}
              >
                <Text style={{ fontSize: 15, textAlign: "center" }}>
                  G E N E R A L{" "}
                </Text>
              </View>
              <View
                style={{
                  width: windowWidth - 40,
                  height: 125,
                  borderRadius: 10,
                  borderColor: "black",
                  borderWidth: 1.23,
                  marginTop: 15,
                  marginLeft: -10,
                }}
              >
                <TouchableOpacity
                  style={{
                    width: windowWidth - 43,
                    backgroundColor: "#",
                    height: 60,
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                    borderColor: "black",
                    borderBottomWidth: 1.23,
                  }}
                  onPress={() => navigation.navigate("AboutUs")}
                >
                  {/* First Piece of code */}
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Icond
                      name="questioncircleo"
                      size={30}
                      style={{ paddingHorizontal: 10 }}
                    />
                    <Text
                      style={{
                        paddingHorizontal: 5,
                        fontSize: 16.6,
                        fontWeight: "600",
                      }}
                    >
                      About us
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: windowWidth - 55,
                    backgroundColor: "white",
                    height: 60,
                    borderRadius: 10,
                  }}
                  onPress={() => navigation.navigate("More Quotes")}
                >
                  {/* Second Piece of code */}
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Icon
                      name="quote-left"
                      size={23}
                      color="black"
                      style={{ paddingHorizontal: 10 }}
                    />
                    <Text
                      style={{
                        paddingHorizontal: 5,
                        fontSize: 16.6,
                        fontWeight: "600",
                      }}
                    >
                      More Quotes
                    </Text>
                  </View>
                </TouchableOpacity>
                {/* <TouchableOpacity style={{width: 377, backgroundColor: 'white', height: 62, borderColor: 'black', borderTopWidth: 1.23, borderBottomRightRadius: 10, borderBottomLeftRadius: 10}}>
              {/* Third Piece of code */}

                {/* </TouchableOpacity> */}
              </View>
            </View>
          </View>
          {/* Health */}
          <View>
            <View
              style={{
                backgroundColor: "#A0C4E2",
                height: 30,
                marginTop: 20,
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: -33,
              }}
            >
              <Text style={{ fontSize: 15, textAlign: "center" }}>
                H E A L T H
              </Text>
            </View>
            <View
              style={{
                width: windowWidth - 40,
                height: 65,
                borderRadius: 10,
                borderColor: "black",
                borderWidth: 1.23,
                marginTop: 15,
                marginLeft: 23,
              }}
            >
              <TouchableOpacity
                style={{
                  width: windowWidth - 55,
                  backgroundColor: "white",
                  height: 60,
                  borderTopRightRadius: 10,
                  borderTopLeftRadius: 10,
                  borderRadius: 10,
                }}
                onPress={() => navigation.navigate("Health Info")}
              >
                {/* First Piece of code */}
                <View>
                  {/* <Icon name="heartbeat" size={30} color="red"/> */}
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Icon
                    name="heartbeat"
                    size={25}
                    color="red"
                    style={{ paddingHorizontal: 10 }}
                  />
                  <Text
                    style={{
                      paddingHorizontal: 5,
                      fontSize: 16.6,
                      fontWeight: "600",
                    }}
                  >
                    Health Info
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {/* Preferences */}
          <View
            style={{
              backgroundColor: "#CEE5D0",
              height: 30,
              marginTop: 20,
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: -33,
            }}
          >
            <Text style={{ fontSize: 15, textAlign: "center" }}>
              P R E F E R E N C E S
            </Text>
          </View>

          <View
            style={{
              width: windowWidth - 41,
              height: 130,
              borderRadius: 10,
              borderColor: "black",
              borderWidth: 1.23,
              marginTop: 15,
              marginLeft: 23,
            }}
          >
            <TouchableOpacity
              style={{
                width: windowWidth - 44,
                backgroundColor: "white",
                height: 60,
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
                borderColor: "black",
                borderBottomWidth: 1.23,
              }}
              onPress={() => navigation.navigate("Account Info")}
            >
              {/* First Piece of code */}
              <View>
                {/* <Icon name="heartbeat" size={30} color="red"/> */}
              </View>
              <View
                style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
              >
                <Icons
                  name="account-outline"
                  size={31}
                  style={{ paddingHorizontal: 10 }}
                />
                <Text
                  style={{
                    paddingHorizontal: 5,
                    fontSize: 16.6,
                    fontWeight: "600",
                  }}
                >
                  Account Info
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: windowWidth - 50,
                backgroundColor: "white",
                height: 60,
              }}
              onPress={() => navigation.navigate("House Info")}
            >
              {/* Second Piece of code */}
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "centers",
                }}
              >
                <Iconse
                  name="moon-outline"
                  size={30}
                  style={{ paddingHorizontal: 10 }}
                />
                <Text
                  style={{
                    paddingHorizontal: 5,
                    fontSize: 16.6,
                    fontWeight: "600",
                  }}
                >
                  House
                </Text>
                {/* <Switch style={{left: 140}}
              trackColor={{ false: "black", true: "#81b0ff" }}
              thumbColor={isEnabled ? "white" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}/> */}
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.containers}>
            <View
              style={{
                backgroundColor: "black",
                borderRadius: 10,
                paddingVertical: 10,
                top: 10,
              }}
            ></View>
            <TouchableOpacity onPress={handleSignOut} style={styles.button}>
              <Text style={styles.buttonText}>Sign out</Text>
            </TouchableOpacity>
          </View>

          {/* COPYRIGHTS */}
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 30,
              paddingBottom: 100,
            }}
          >
            <Text style={{ fontSize: 10, color: "#C1CAD6" }}>
              Copyright GrowCalth © 2022 All rights Reserved{" "}
            </Text>
            <Text style={{ fontSize: 10, color: "#C1CAD6" }}>
              Singapore, Singapore City{" "}
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Settings;

const Stack = createNativeStackNavigator();
export function Stackz() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Setting"
        component={Settings}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="AboutUs" component={AboutUs} />
      <Stack.Screen name="More Quotes" component={MoreQuotes} />
      <Stack.Screen name="Health Info" component={HealthInfo} />
      <Stack.Screen name="Account Info" component={AccountInfo} />
      <Stack.Screen name="House Info" component={House} />
    </Stack.Navigator>
  );
}
const styles = StyleSheet.create({
  containers: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#DB5461",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 22,
  },
  subTitle: {
    color: "#C1CAD6",
    marginTop: 6,
    marginHorizontal: 14,
  },
});
