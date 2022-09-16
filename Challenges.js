import React, { useState, useEffect, useRef, useMemo } from 'react'
import { SafeAreaView, StatusBar, ScrollView, StyleSheet, Text, View, FlatList, Pressable, Dimensions, TouchableOpacity, Image, SectionList, Animated, Alert, } from 'react-native'
import * as Progress from 'react-native-progress';
import * as firebase from 'firebase'
import { useNavigation } from '@react-navigation/native';
import { Pedometer } from 'expo-sensors';
import ChallengesItem from '../components/ChallengesItem';
import ListItem from '../components/ListItem';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Info from '../components/Info';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Item = ({ title }) => (
  <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  </View>
);
const AddAlert = () => {
  Alert.alert(
    "Are you sure you want to take up this challenge",
    "WOOOOO",
    [

      {
        text: "YES, BRING IT ON"
        , style: 'cancel'
      },
      {
        text: "No I want my mommy",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
    ]
  );
}
const Challenges = () => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [masterData, setMasterData] = useState([])
  const [users, setUsers] = useState([]);
  const challengesRef = firebase.firestore().collection('challenges');

  const [selectedChallenge, setSelectedChallenge] = useState(null);
  useEffect(() => {
    challengesRef
      .onSnapshot(
        querySnapshot => {
          const users = []
          querySnapshot.forEach((doc) => {
            const { heading, text, points } = doc.data()
            users.push({
              id: doc.id,
              heading,
              text,
              points
            })
          })
          setUsers(users)
        }
      )
  }, [])
  const [PedometerAvailability, setPedometerAvailability] = useState("")
  const [stepCount, updateStepCount] = useState(0)
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
  useEffect(() => {
    return () => {
      subscribe()
    }
  }, [stepCount])
  const countInterval = useRef(null);

  useEffect(() => {
    countInterval.current = setInterval(() => updateStepCount((old) => old + 5), 1000);
    return () => {
      clearInterval(countInterval); //when user exits, clear this interval.
    };
  }, []);

  const navigation = useNavigation();
  const openModal = (item) => {
    setSelectedChallenge(item)
  }
  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: 'center', padding: 10, marginTop: 5, backgroundColor: 'white' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 38 }}>Challenges</Text>
          <Text style={{ color: '#C1CAD6' }}>Whatever it is don't give up!</Text>
        </View>
        <View style={{ padding: 10, marginTop: 5 }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold' }}>In Progress</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
              <View style={{ backgroundColor: 'black', height: 200, borderRadius: 15, width: windowWidth - 50, marginRight: 10, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ backgroundColor: 'black', height: 200, borderRadius: 15, width: windowWidth - 50, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: 'white', padding: 5, fontWeight: 'bold', fontSize: 30, marginBottom: -10 }}>10,000 step Challenge</Text>
                  <Progress.Bar progress={0.2} width={200} style={{ marginTop: 100 }} />
                </View>
              </View>
              <View style={{ backgroundColor: 'black', height: 200, borderRadius: 15, width: windowWidth - 50, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'white', padding: 5, fontWeight: 'bold', fontSize: 30, marginBottom: -10 }}>Daily Challenge</Text>
                <Text style={{ color: 'white', padding: 5, fontWeight: 'bold', fontSize: 15, marginBottom: -30, marginTop: 10 }}>Walk a minimum of 15,000 steps today!</Text>
                <Progress.Bar progress={0.4} width={200} style={{ marginTop: 100 }} />
              </View>
            </View>
          </ScrollView>
        </View>
        <View>

        </View>
        <View style={{ padding: 10, marginTop: 5 }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold' }}>For you</Text>
        </View>
        <View>
          <TouchableOpacity style={{ backgroundColor: '#E9ECF1', flexDirection: 'row', marginBottom: 15, borderRadius: 17, marginHorizontal: 20 }}>
            <View style={{ backgroundColor: '#FFFF82', width: 35, height: 35, borderRadius: 10, alignSelf: 'center', marginHorizontal: 15 }}>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
              <View style={[styles.innerContainer, { paddingHorizontal: 10, width: windowWidth - 130, height: 80, borderRadius: 15, marginLeft: 10, justifyContent: 'center' }]} onPress={() => navigation.navigate("Hi")}>
                <Text style={[styles.itemHeading, { padding: 5, color: '#252C45' }]}>10,000 steps Challenge</Text>
                <Text style={[styles.itemText, { paddingHorizontal: 5, color: '#252C45' }]}>✨For house points✨</Text>
              </View>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', width: 70 }}>
              <Text style={{ fontSize: 28, marginRight: 10, marginLeft: 10, fontWeight: '800' }}>2</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: '#E9ECF1', flexDirection: 'row', marginBottom: 15, borderRadius: 17, marginHorizontal: 20 }}>
            <View style={{ backgroundColor: '#B5D99C', width: 35, height: 35, borderRadius: 10, alignSelf: 'center', marginHorizontal: 15 }}>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
              <View style={[styles.innerContainer, { paddingHorizontal: 10, width: windowWidth - 130, height: 80, borderRadius: 15, marginLeft: 10, justifyContent: 'center' }]} onPress={() => navigation.navigate("Hi")}>
                <Text style={[styles.itemHeading, { padding: 5, color: '#252C45' }]}>20,000 steps Challenge</Text>
                <Text style={[styles.itemText, { paddingHorizontal: 5, color: '#252C45' }]}>✨For even morehouse points✨</Text>
              </View>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', width: 70 }}>
              <Text style={{ fontSize: 28, marginRight: 10, marginLeft: 10, fontWeight: '800' }}>5</Text>
            </View>
          </TouchableOpacity>
          <FlatList
            keyExtractor={(item) => item.id}
            style={{ height: '100%' }}
            data={users}
            numColumns={1}
            renderItem={({ item }) => (
              <ListItem
                housePoint={item.points}
                head={item.heading}
                sub={item.text}
                onPress={openModal(item)}
              >
              </ListItem>
            )}
          />

          <View>

          </View>
          {/* <SwipeListView
  data={this.state.persons}
  renderItem={({item}) => this.renderPerson(item)}
  renderHiddenItem={({item}) => this.renderHiddenItem(item)}
  rightOpenValue={-75}
/> */}
        </View>
        <View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
const Stack = createNativeStackNavigator()
export default function ChallengesStack() {
  return (
    <Stack.Navigator initialRouteName="Challenges">
      <Stack.Screen
        name="Challenges"
        component={Challenges}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SecondPage"
        component={ChallengesItem} options={{ headerShown: true }} />
    </Stack.Navigator>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16
  },
  item: {
    backgroundColor: "white",
    padding: 20,
    marginVertical: 8, shadowColor: 'black', shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 3,
    width: windowWidth - 19,
    borderRadius: 14
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 24
  },
  innerContainer: {
    flexDirection: 'column',
    marginBottom: 20,
    justifyContent: 'center'
  },
  itemHeading: {
    fontWeight: 'bold',
    fontSize: 20
  },
  itemText: {
    fontWeight: '300',
    fontSize: 16
  },
  bottomSheet: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  progressBar: {
    height: 15,
    flexDirection: "row",
    width: '100%',
    backgroundColor: 'white',
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 5,
  }
});
