import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, FlatList, Pressable, SafeAreaView, ScrollView, TouchableOpacity, Button, TouchableOpacityBase } from 'react-native'
import firebase from 'firebase'
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Info from './Info';
import SearchBar from '../components/SearchBar';
import List from '../components/List';
import ShowMore from 'react-native-show-more-button';

function Announcements(props) {
    const navigation = useNavigation();
    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);
    const [masterData, setMasterData] = useState([])
    const [users, setUsers] = useState([]);
    const todoRef = firebase.firestore().collection('todos');

    const [search, setSearch] = useState('')
    const searchFilter = (text) => {
        if (text) {
            const newData = masterData.filter((item) => {
                const itemData = item.heading ? item.heading.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1
            });
            setUsers(newData)
            setSearch(text)
        } 
        else {
            setUsers(masterData);
            setSearch(text)
        }
    }
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
    const postsPerPage = 3;
    let arrayForHoldingPosts = [];
    const [postsToShow, setPostsToShow] = useState([]);
    const [next, setNext] = useState(3);
  
    // const loopWithSlice = (start, end) => {
    //   const slicedPosts = items.heading.slice(start, end);
    //   arrayForHoldingPosts = [...arrayForHoldingPosts, ...slicedPosts];
    //   setPostsToShow(arrayForHoldingPosts);
    // };
  
    // useEffect(() => {
    //   loopWithSlice(0, postsPerPage);
    // }, []);
  
    // const handleShowMorePosts = () => {
    //   loopWithSlice(next, next + postsPerPage);
    //   setNext(next + postsPerPage);
    // };
    const DATA = [
        {
            title: 'House Announcements'
        },
        {
            title: 'House Events'
        },
        {
            title: 'House Activites'
        }
    ]

    const renderList = ({ item }) => {
        return (
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.listItemText}>{item.title}</Text>
          </View>
        );
      };
    return (
        <SafeAreaView style={{backgroundColor: 'white',  flex: 1}}>
            <Text style={{fontSize: 39, fontWeight: 'bold', padding: 10, marginTop: 5}}>Announcements</Text>
      <SearchBar 
       searchPhrase={searchPhrase}
       setSearchPhrase={setSearchPhrase}
       clicked={clicked}
       setClicked={setClicked}
       /> 
       {/* <ScrollView horizontal style={{marginBottom: -10}}>
        <TouchableOpacity>
            <Text>House Announcements</Text>
        </TouchableOpacity>
        <TouchableOpacity>
            <Text>House Events</Text>
        </TouchableOpacity>
          </ScrollView> */}
      <ScrollView style={{paddingBottom: 10, flex: 1}}>
          {/* <View style={{flexDirection: 'row'}}>
              <TouchableOpacity>
              <Text>House Announcements</Text>
              </TouchableOpacity>
              <TouchableOpacity>
              <Text>House Events</Text>
              </TouchableOpacity>
          </View> */}
          <View style={{ flexDirection: "row", alignSelf: "center" }}>

    </View>
      <Text style={{fontSize: 30, marginLeft: 10, fontWeight: 'bold'}}>House Announcements</Text>
      <ShowMore  style={{flex: 1}}>
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
            </ShowMore>
            <Text style={{fontSize: 30, marginLeft: 10, fontWeight: 'bold'}}>House Events</Text> 
            <ShowMore  style={{flex: 1}}>
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
            </ShowMore>
            </ScrollView>
        </SafeAreaView>
              
    )
}


const styles = StyleSheet.create({
    container:{
        backgroundColor: '#FEFBF6',
        padding:15,
        marginHorizontal: 10, 
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 0.5

    },
    innerContainer:{
        flexDirection:'column',
        borderRadius: 15,
    },
    itemHeading:{
        fontWeight:'bold',
        fontSize: 20,
    },
    itemText:{
        fontWeight:'300'
    },
    textInputStyle: {
        height: 40, 
        borderWidth: 1,
        paddingLeft: 20,
        margin: 5,
        borderColor: 'black'
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
