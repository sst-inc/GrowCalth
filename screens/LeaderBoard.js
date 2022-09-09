import React, {useState} from 'react'
import { StyleSheet, Text, View, Dimensions, ImageBackground, SafeAreaView } from 'react-native'
import { Circle } from 'react-native-progress';

const LeaderBoard = () => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
const [leader, setLeader] = useState([])
  const green = '#82A7A6'
  const blue = '#9ED0E6'
  const red = '#d1001f'
  const black = 'black'
  const yellow = 'yellow'
// On a side note, the leaderboards are not updated. This code is just an example of the UI for this page.
  const image = {uri : 'https://cdn-icons-png.flaticon.com/512/344/344682.png?w=360'}
    return (
        <View style={{backgroundColor: '#FFFF', flex: 1}}>
            {/* <Text style={{padding: 10, fontSize: 40, fontWeight: '900'}}>H</Text>
            <Text style={{padding: 10, fontSize: 40, fontWeight: '900'}}>O</Text>
            <Text style={{padding: 10, fontSize: 40, fontWeight: '900'}}>U</Text>
            <Text style={{padding: 10, fontSize: 40, fontWeight: '900'}}>S</Text>
            <Text style={{padding: 10, fontSize: 40, fontWeight: '900'}}>E</Text> */}
            <Text style={{padding: 10, fontSize: 30, textAlign: 'center', fontWeight: '800'}}>Top 3 🏆</Text>
            <View style={{backgroundColor: '#C1DBE3', width: windowWidth-35, height: 650, borderRadius: 20, alignSelf: 'center'}}>
                <ImageBackground source={image} resizeMode="cover" style={styles.image}> 
            <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <View style={{backgroundColor: 'white', height: 115, width: 115, borderRadius:(windowWidth-330/2), backgroundColor: yellow, right:18, justifyContent: 'center', alignItems: 'center', marginTop: -45}}>
            <Text style={{color: 'black', fontWeight: '900', fontSize:45}}>127</Text>
            </View>
            <View style={{backgroundColor: 'white', height: 115, width: 115, borderRadius:(windowWidth-300/2), backgroundColor: black, justifyContent: 'center' ,alignItems: 'center', marginTop: -110}}>
                <Text style={{color: 'white', fontWeight: '900', fontSize:45}}>192</Text>
            </View>
                <View style={{backgroundColor: 'white', height: 115, width: 115, borderRadius:(windowWidth-300/2), backgroundColor: blue, right: -20, justifyContent: 'center', alignItems: 'center', marginTop: windowHeight-windowHeight-30, alignContent: 'space-around'}}>
                <Text style={{color: 'white', fontWeight: '900', fontSize:45}}>111</Text>
                </View>
            </View>
            </ImageBackground>
            
    <View style={{flexDirection: 'row', margin: 30,  alignItems: 'center'}}>     
      <View style={{backgroundColor: 'white', height: 150, width: 150, borderRadius:(windowWidth-280/2), backgroundColor: green, marginTop: -20, left: 0 , justifyContent: 'center', alignItems: 'center', marginRight: 20}}>
                <Text style={{color: 'white', fontWeight: '900', fontSize:45}}>103</Text>
                </View>
                <View style={{backgroundColor: 'white', height: 150, width: 150, borderRadius:(windowWidth-280/2), backgroundColor: red, marginTop: -20, left: 0, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: 'white', fontWeight: '900', fontSize:45}}>94</Text>
                </View>
            </View>
            </View> 
        </View>
    )
}

export default LeaderBoard

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    image: {
        width: windowWidth-50,
        height: 250,
        marginTop: 200,
        alignSelf: 'center'
    }
})
