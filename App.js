// Correct One
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState, useEffect } from "react";
import Run from "./screens/Run";
// import Home from './screens/Home';
import Challenges from "./screens/Challenges";
import Settings from "./screens/Settings";
import Workouts from "./screens/Workouts";
import { Image } from "react-native";
import Insights from "./screens/Insights";
import Stacks from "./screens/Home";
import { Stackz } from "./screens/Settings";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/AuthScreens/LoginScreen";
import Announcements from "./screens/Announcements";
import Forgot from "./screens/AuthScreens/Forgot";
// import { app, storage} from "./firebase";
import Register from "./screens/AuthScreens/Register";
import Test from "./screens/Test";
import AnnouncementStack from "./screens/Announcements";
import OnboardingScreen from "./screens/OnboardingScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ChallengesStack from "./screens/Challenges";
import MyTabs from "./screens/Announcements";
import Admin from "./screens/AuthScreens/Admin";

// export default function App() {
//   const handleInput = (event) => {

//   };
//   return (
//     onChange={event} => setData (event.target.files[])
//   )
// }
function HomeScreen() {
  return <Stacks />;
}
function WorkoutsScreen() {
  return <Workouts />;
}
function SettingsScreen() {
  return <Stackz />;
}
function RunScreen() {
  return <Run />;
}
function ChallengesScreen() {
  return <Challenges />;
}
function AnnouncementsScreen() {
  return <Announcements />;
}
function OnboaringS() {
  return <OnboardingScreen />;
}
function AdminS() {
  return <Admin />;
}
const Tab = createBottomTabNavigator();
function Tabs({ route }) {
  // const houses = route.params.house;
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Stacks}
        // initialParams={{ house: house }}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Image
              source={require("./assets/HomeIcon.png")}
              style={{ width: 30, height: 30 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Announcements"
        component={MyTabs}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Image
              source={require("./assets/announcement-icon.png")}
              style={{ width: 29, height: 29 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Challenges"
        component={Challenges}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Image
              source={require("./assets/ChallengeIcon.png")}
              style={{ width: 29, height: 29 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Image
              source={require("./assets/SettingsIcon.jpeg")}
              style={{ width: 25, height: 25 }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          options={{ headerShown: false }}
          name="Onboarding"
          component={OnboardingScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Sign Up"
          component={Register}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Tabs"
          component={Tabs}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Admin"
          component={Admin}
        />
        <Stack.Screen name="Forgot Password" component={Forgot} />
        {/* <Stack.Screen name="Test" component={Test}/> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
