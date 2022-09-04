import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, FlatList, Pressable, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import firebase from 'firebase'
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Info from './Info';
import SearchBar from '../components/SearchBar';
import List from '../components/List';

function Announcements() {
    const navigation = useNavigation();
    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);
    const [fakeData, setFakeData] = useState();

    const [users, setUsers] = useState([]);
    const todoRef = firebase.firestore().collection('todos');

    useEffect(() => {
        todoRef
        .onSnapshot(
            querySnapshot => {
                const users = []
                querySnapshot.forEach((doc) => {
                    const { heading, text } = doc.data()
                    users.push({
                        id: doc.id,
                        heading,
                        text,
                    })
                })
                setUsers(users)
            }
        )
    }, [])
    return (
        <SafeAreaView style={{backgroundColor: 'white'}}>
            <Text style={{fontSize: 39, fontWeight: 'bold', padding: 10, marginTop: 5}}>Announcements</Text>
            <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />
      <ScrollView>
            <FlatList 
                style={{height:'100%'}}
                data={users}
                searchPhrase={searchPhrase}
                setClicked={setClicked}
                numColumns={1}
                renderItem={({item}) => (
                    <Pressable
                        style={styles.container}
                    >
                        <TouchableOpacity style={styles.innerContainer} onPress={() => navigation.navigate("Info")}>
                            <Text style={styles.itemHeading}>{item.heading}</Text>
                            <Text style={styles.itemText}>{item.text}</Text>

                        </TouchableOpacity>
                    </Pressable>
                )}
            />
         </ScrollView>
        </SafeAreaView>
              
    )
}


const styles = StyleSheet.create({
    container:{
        backgroundColor: '#486B02',
        padding:15,
        borderradius:15,
        borderWidth: 0.5
    },
    innerContainer:{
        flexDirection:'column',
        borderRadius: 15
    },
    itemHeading:{
        fontWeight:'bold',
        color: 'white',
        fontSize: 20
    },
    itemText:{
        fontWeight:'300'
    }
})
const Stack = createNativeStackNavigator()

export default function AnnouncementStack() {
    return (
         <Stack.Navigator>
             <Stack.Screen
          name="Announcements"
          component={Announcements} options={{headerShown: false}}/>
            <Stack.Screen
          name="Info"
          component={Info} options={{headerShown: true}}/>
         </Stack.Navigator>
    )
}
