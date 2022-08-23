import React, {useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Switch } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import Icond from 'react-native-vector-icons/AntDesign'
import Iconse from 'react-native-vector-icons/Ionicons'

const preferences = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    return (
        <View>
        <View style={{backgroundColor: '#CEE5D0',  height: 30, marginTop: 20, flex: 1, justifyContent: 'center', alignItems: 'center', marginHorizontal: -33}}>
          <Text style={{fontSize: 15, textAlign: 'center'}}>P R E F E R E N C E S</Text>
          </View>
        
        <View style={{width: 380, height: 130, borderRadius: 10, borderColor: 'black', borderWidth: 1.23, marginTop: 15, marginLeft: 23}}>
            <TouchableOpacity style={{width: 377, backgroundColor: 'white', height: 60, borderTopRightRadius: 10, borderTopLeftRadius: 10, borderColor: 'black', borderBottomWidth: 1.23 }}>
              {/* First Piece of code */}
              <View>
              {/* <Icon name="heartbeat" size={30} color="red"/> */}
              </View>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <Iconse name="globe" size={30} style={{paddingHorizontal: 10}}/>
              <Text style={{paddingHorizontal: 5, fontSize: 16.6, fontWeight: '600'}}>Languages</Text>
              </View>
            </TouchableOpacity>
            <View style={{width: 377, backgroundColor: 'white', height: 60}}>
              {/* Second Piece of code */}
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <Iconse name="moon-outline" size={30} style={{paddingHorizontal: 10}}/>
              <Text style={{paddingHorizontal: 5, fontSize: 16.6, fontWeight: '600'}}>Dark Mode</Text>
              <Switch style={{left: 160}}
              trackColor={{ false: "black", true: "#81b0ff" }}
              thumbColor={isEnabled ? "white" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}/>
              </View>            
              </View>
            {/* <TouchableOpacity style={{width: 377, backgroundColor: 'white', height: 62, borderColor: 'black', borderTopWidth: 1.23, borderBottomRightRadius: 10, borderBottomLeftRadius: 10}}>
              {/* Third Piece of code 
            </TouchableOpacity> */}
          </View>        
          </View>
    )
}

export default preferences

const styles = StyleSheet.create({})
