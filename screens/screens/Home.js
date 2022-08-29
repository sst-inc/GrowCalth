import { TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Text, View, Image, AppState, Dimensions, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pedometer } from 'expo-sensors';
import { useNavigation } from '@react-navigation/native';
import Insights from './Insights';
import Progress from './Progress'
import Quotes from './Quotes';
import Goals from './Goals';
import LeaderBoard from './LeaderBoard'
import { auth } from '../firebase';


function Homes() {

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

    const getQuote = () => {
        fetch("https://api.quotable.io/random").then(res => res.json()).then(result => {
        setQuote(result.content)
        setAuthor(result.author)
    })
    }
    useEffect(() => {
        getQuote();
    }, []);
  
  const [PedometerAvailability, setPedometerAvailability] = useState("")
  const [stepCount, updateStepCount] = useState(0)
  const calories = stepCount / 25
  const caloriesB = calories.toFixed(1)

  useEffect(() => {
    subscribe();
  }, [])

  const subscribe = () => {
    const subscription = Pedometer.watchStepCount((result) => (
      updateStepCount(result.steps)
    ))
    Pedometer.isAvailableAsync().then(
      (result) => {
        setPedometerAvailability(String(result))
      },
      (error) => {
        setPedometerAvailability(error)
      }
    )
  }
  const navigation = useNavigation();
  const [Quote, setQuote] = useState();
  const [Author, setAuthor] = useState();
  const [isLoading, setIsLoading] = useState(true)

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        console.log("App has come to the foreground!");
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log("AppState", appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);
  var counter = 1;
  function streaks() {
    if (nextAppState === "active"){
      counter+= 1
    }
  }
  return (
    <SafeAreaView style={{backgroundColor: '#FFFFF'}}>
      <ScrollView>
          <View style={styles.largeTitle}>
            <View style={{paddingTop: 5}}>
            </View>
            <Text style={{ fontSize: 39, fontWeight: 'bold', color: 'black', textShadowColor: 'white', textShadowRadius: 2, textShadowOffset: { 
          width: 3,
          height: 3}}}>Home</Text>
            <Text style={styles.subTitle}>Hi Honey! I'm Home</Text>
          </View>
          {/* <TouchableOpacity style={{borderWidth: 1.23, borderColor: 'black', width: 190, height: 170, marginHorizontal: 215, borderRadius: 15, marginTop: 50, marginBottom: -175, backgroundColor: 'white'}}>
            <Text>Progress</Text>
          </TouchableOpacity> */}
        <View style={{backgroundColor: '#F2F2F2'}}>
          <View style={{top: -10}}>
            {/* Thank you lord for allowing me to have the wisdom to complete this app. I could not have done it without you lord! I pray for my eyesight lord I pray it will never go up and only go down. I will have perfect eyesight lord I pray for healing on my eyesight I pray that I will have 20/20 vision. Speaking of vision I pray that you give me the vision in my life. Lord I pray for a perfect eyesight lord */}
          <TouchableOpacity style={{width: windowWidth-233, height: 170, marginHorizontal: 220, borderRadius: 15, marginTop: 30, marginBottom: -170, 
            shadowColor: 'black', shadowColor: '#171717', backgroundColor: 'black',
            shadowOffset: {width: -2, height: 4},
            shadowOpacity: 1,
            shadowRadius: 3}}
            onPress={() => navigation.navigate(LeaderBoard)}>
              <Text style={{paddingHorizontal: 10, fontSize: 15, fontWeight: 'bold', paddingTop: 10,color: 'white'}}>LeaderBoards</Text>
              <View style={{justifyContent: 'center', alignItems: 'center', paddingTop: 15}}>
              <Image source={require('.././assets/LeaderBoard.png')} style={{height: 110, width: 110}}/> 
              </View>
          </TouchableOpacity>
          <TouchableOpacity
              style={styles.insightView}
              onPress={() => navigation.navigate("Steps")}>
          <Text style={styles.insights}>Steps</Text>
              <View style={styles.circle}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{stepCount}</Text>
                  <Text>steps</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
            <View style={{paddingTop: -10}}>
          <View style={{
                marginTop: 38,
                paddingHorizontal: 5
          }}>
          </View>
          <StatusBar style="auto" />
          <TouchableOpacity style={{paddingHorizontal: 218, marginTop: -80}}
                onPress={() => navigation.navigate("Progress")}
                >
            <View style={{width: windowWidth-233,height: 235,borderRadius: 15,borderColor: 'white', paddingHorizontal: 10, shadowColor: 'black', shadowColor: '#171717', backgroundColor: 'white', top: 4,
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 1,
    shadowRadius: 3}}>
              {/* Progress */}
              <Text style={{fontSize: 19,fontWeight: 'bold', top: 10}}>Progress</Text>
              <Text style={{fontSize: 63,fontWeight: '900', textAlign: 'center', top: 32}}>{counter}</Text>
              <Text style={{textAlign: 'center', fontSize: 25, marginTop: 23}}>days in this app</Text>
            </View>
          </TouchableOpacity>
        <StatusBar style="auto" />
        <TouchableOpacity style={{paddingHorizontal: 20, paddingTop: 75,}}>
          <View style={styles.dailyQuotes}>
            {/* Calories */}
            <Text style={{fontSize: 17.5,fontWeight: 'bold',color: 'black', marginTop: -4,}}>Calories Burnt</Text>
            <View style={{justifyContent: 'center', alignItems: 'center',width: 120,
              height: 120,
              borderRadius: 80,
              backgroundColor: '#EFECE5',
              marginHorizontal: 20,
              top: 10,
              borderColor: 'black',
              borderWidth: 7
              }}>
            <Text style={{fontSize: 30, fontWeight: 'bold'}}>{caloriesB}</Text>
            <Text>kcal</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{height: 130, width: windowWidth-35, borderRadius: 10, borderWidth: 0, marginLeft: 20, bottom: 240, 
      shadowColor: 'black', shadowColor: '#171717', backgroundColor: '#B7CADB',
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 1,
      shadowRadius: 3}}
      onPress={() => navigation.navigate("Quotes")}
      >
        <Text style={{paddingTop: 10, paddingHorizontal: 10, fontSize: 18, fontWeight: '900', color: '#100F0F'}}>{Quote}</Text>
        <Text style={{paddingHorizontal: 205, paddingTop: 5, fontStyle: 'italic', fontWeight: '600', fontSize: 17, color: '#100F0F', justifyContent: 'center', alignItems: 'center', textDecorationLine: 'underline'}}>{Author}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{height: 165, width: windowWidth-34, borderRadius: 15, backgroundColor: '#754F5B', marginHorizontal: 20, marginTop: -220,
      shadowColor: 'black', shadowColor: '#171717',
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 1,
      shadowRadius: 3}
      }
      onPress={() => navigation.navigate("Goals")}
      >
        <Text style={{padding: 10, fontWeight: 'bold', fontSize: 22, color: 'white'}}>Set your Goals 🎯</Text>
        <Text style={{paddingHorizontal: 10, top: -3, fontSize: 12, color: 'white', fontWeight: '500'}}>Goals are helpful</Text>
        <Text style={{fontSize: 110, left: -10, bottom: 10}}>🎯</Text>
        </TouchableOpacity>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 20, paddingBottom: 10, }}>
          <Text style={{ fontSize: 10, color: '#C1CAD6' }}>Copyright GrowCalth © 2022 All rights Reserved </Text>
          <Text style={{ fontSize: 10, color: '#C1CAD6' }}>Singapore, Singapore City </Text>
        </View>
        </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ACCBE1',
    // backgroundColor: '#CEE5F2',
    //or can try use this as background colour: #7C98B3 or #ACCBE1 or #B1B695
  },
  largeTitle: {
    marginTop: 10,
    paddingHorizontal: 10,
    backgroundColor: '#EFF1F5'
  // this is the weird blue color background (change ltr pls)
  },
  subTitle: {
    color: '#C1CAD6',
    marginTop: 4
  },
  insights: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 10,
  },
  insightView: {
    width: 179,
    height: 220,
    borderRadius: 15,
    borderColor: 'white', borderWidth: 0, paddingHorizontal: 10, shadowColor: 'black', shadowColor: '#171717', backgroundColor: 'white',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 1,
    shadowRadius: 3,
    marginHorizontal: 20
  },
  dailyQuotes: {
    width: 179,
    height: 190,
    borderRadius: 15,
    paddingTop: 15,
    paddingHorizontal: 10,
    top: -260,
    shadowColor: 'black', shadowColor: '#171717', backgroundColor: 'white',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 1,
    shadowRadius: 3
  },
  middle: {
    paddingHorizontal: 20,
    marginTop: 5
  },
  white: {
    width: 100,
    height: 10,
    backgroundColor: 'black',
  },
  top: {
    marginTop: -3
  },
  quotes: {
    marginTop: 53,
    paddingHorizontal: 5
  },
  quote: {
    fontSize: 26.7,
    fontWeight: 'bold',
    color: '#473144',
    marginTop: -40,
  },
  circle: {
    width: 130,
    height: 130,
    borderRadius: 80,
    backgroundColor: '#EFECE5',
    marginHorizontal: 15,
    marginTop: 20,
    borderColor: 'black',
    borderWidth: 7
  },
  moreInsights: {
    paddingTop: 170,
    paddingHorizontal: 30
  },
  Click: {
    color: '#B7B5B3',
    textDecorationLine: 'underline'
  },
  paddin: {
    paddingHorizontal: 25,
    marginTop: -3
  }
});

const Stack = createNativeStackNavigator();
export default function Stacks() {
  return (
      <Stack.Navigator>
        <Stack.Screen
          name="Homes"
          component={Homes} options={{headerShown: false}}/>
        <Stack.Screen
          name="Steps"
          component={Insights} 
          options={{headerBackTitle: "Home"}}
          />
          <Stack.Screen
          name="Progress"
          component={Progress} 
          options={{headerBackTitle: "Home"}}
          />
          <Stack.Screen
          name="Quotes"
          component={Quotes} 
          options={{headerBackTitle: "Home", backgroundColor: '#B1E1FF'}}
          />
          <Stack.Screen
          name="Goals"
          component={Goals} 
          options={{headerBackTitle: "Home"}}
          />
          <Stack.Screen
          name="LeaderBoard"
          component={LeaderBoard} 
          options={{headerBackTitle: "Home"}}
          />
      </Stack.Navigator>
  );
}