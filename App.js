import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Run from './screens/Run';
// import Home from './screens/Home';
import Challenges from './screens/Challenges';
import Settings from './screens/Settings'
import Workouts from './screens/Workouts';
import {Image} from 'react-native';
import Insights from './screens/Insights';
import Stacks from './screens/Home';
import { Stackz } from './screens/Settings';

function HomeScreen() {
  return(
    <Stacks />
  )
}
function WorkoutsScreen() {
  return (
    <Workouts />
  );
}
function SettingsScreen() {
  return (
    <Stackz />
    );
}
function RunScreen() {
  return (
      <Run />
  );
}
function ChallengesScreen() {
  return (
    <Challenges />
  );
}
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        {/* <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} /> */}
        <Tab.Screen name="Home" component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: () => (<Image source={require("./assets/HomeIcon.png")} style={{ width: 30, height: 30 }} />)
          }} />
        {/* <Tab.Screen
          name="Workouts"
          component={WorkoutsScreen}
          options={{
            headerShown: false,
            tabBarIcon: () => (<Image source={require("./assets/WorkoutsImage.jpeg")} style={{ width: 60, height: 60 }} />)
          }}
        /> */}
        {/* <Tab.Screen
          name="Run"
          component={RunScreen}
          options={{
            headerShown: false,
            // headerTitle: "Track your Run!",
            tabBarIcon: () => (<Image source={require("./assets/RunIcon.png")} style={{ width: 32, height: 32 }} />)
          }}
        /> */}
        <Tab.Screen
          name="Challenges"
          component={ChallengesScreen}
          options={{
            headerShown: false,
            tabBarIcon: () => (<Image source={require("./assets/ChallengeIcon.png")} style={{ width: 31, height: 31 }} />)
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            headerShown: false,
            tabBarIcon: () => (<Image source={require("./assets/SettingsIcon.jpeg")} style={{ width: 25, height: 25 }} />)
          }}
        />
      </Tab.Navigator>
      {/* <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
      </Stack.Navigator> */}
    </NavigationContainer>
  );
}
