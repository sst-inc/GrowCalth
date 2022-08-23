import React from 'react'
import {Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import Preferences from '../components/Preferences';
import Health from '../components/Health';
import General from '../components/General';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import Icond from 'react-native-vector-icons/AntDesign'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import AboutUs from './settingsnav/AboutUs';
import HealthInfo from './settingsnav/HealthInfo';
import MoreQuotes from './settingsnav/MoreQuotes';

const Settings = (props) => {
  const navigation = useNavigation();
    return (
      <SafeAreaView  style={{backgroundColor: '#FFFF'}}>
        <View style={{backgroundColor: 'white'}}>
        <ScrollView>
        <Text style={{marginHorizontal: 15, fontWeight: 'bold', fontSize: 40, top: 25, marginBottom: 20}}>Settings</Text>
          <View style={{flex: 0.5, paddingHorizontal: 33}}>

          <View>
            <View style={{backgroundColor: '#F7826F', height: 30, marginTop: 20, flex: 1, justifyContent: 'center', alignItems: 'center', marginHorizontal: -33}}>
          <Text style={{fontSize: 15, textAlign: 'center'}}>G E N E R A L </Text>
          </View>
        <View style={{width: 380, height: 125, borderRadius: 10, borderColor: 'black', borderWidth: 1.23, marginTop: 15, marginLeft: -10}}>
            <TouchableOpacity style={{width: 377, backgroundColor: '#', height: 60, borderTopRightRadius: 10, borderTopLeftRadius: 10, borderColor: 'black', borderBottomWidth: 1.23 }}
            onPress={() => navigation.navigate("AboutUs")}>
              {/* First Piece of code */}
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <Icond name="questioncircleo" size={30} style={{paddingHorizontal: 10}}/>
              <Text style={{paddingHorizontal: 5, fontSize: 16.6, fontWeight: '600'}}>About us</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{width: 377, backgroundColor: 'white', height: 60, borderRadius: 10}}
            onPress={() => navigation.navigate("More Quotes")}>
              {/* Second Piece of code */}
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <Icon name="quote-left" size={23} color="black" style={{paddingHorizontal: 10}}/>
              <Text style={{paddingHorizontal: 5, fontSize: 16.6, fontWeight: '600'}}>More Quotes</Text>
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
        <View style={{backgroundColor: '#A0C4E2',  height: 30, marginTop: 20, flex: 1, justifyContent: 'center', alignItems: 'center', marginHorizontal: -33}}>
          <Text style={{fontSize: 15, textAlign: 'center'}}>H E A L T H</Text>
          </View>
          <View style={{width: 380, height: 65, borderRadius: 10, borderColor: 'black', borderWidth: 1.23, marginTop: 15, marginLeft: 23}}>
            <TouchableOpacity style={{width: 377, backgroundColor: 'white', height: 60, borderTopRightRadius: 10, borderTopLeftRadius: 10, borderRadius: 10}}
            onPress={() => navigation.navigate("Health Info")}>
              {/* First Piece of code */}
              <View>
              {/* <Icon name="heartbeat" size={30} color="red"/> */}
              </View>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <Icon name="heartbeat" size={25} color="red" style={{paddingHorizontal: 10}}/>
              <Text style={{paddingHorizontal: 5, fontSize: 16.6, fontWeight: '600'}}>Health Info</Text>
              </View>
            </TouchableOpacity>
          </View>       
           </View>
          <Preferences />
      <View style={{justifyContent: 'center', alignItems:'center', paddingTop: 100,paddingBottom: 100
    }}>
          <Text style={{ fontSize: 10, color: '#C1CAD6' }}>Copyright GrowCalth © 2022 All rights Reserved </Text>
          <Text style={{ fontSize: 10, color: '#C1CAD6' }}>Singapore, Singapore City </Text>          
          </View>
          </ScrollView>
      </View>
      </SafeAreaView>
    )
}

export default Settings


const Stack = createNativeStackNavigator();
export function Stackz() {
  return (
      <Stack.Navigator>
        <Stack.Screen
          name="Settings"
          component={Settings} options={{headerShown: false}}/>
        <Stack.Screen
          name="AboutUs"
          component={AboutUs}/>
          <Stack.Screen
          name="More Quotes"
          component={MoreQuotes}/>
          <Stack.Screen
          name="Health Info"
          component={HealthInfo}/>
      </Stack.Navigator>
  );
}