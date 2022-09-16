import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, Pressable, SafeAreaView, ScrollView, TouchableOpacity, Button, TouchableOpacityBase, VirtualizedList } from 'react-native'
import firebase from 'firebase'
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Info from './Info';
import SearchBar from '../components/SearchBar';
import List from '../components/List';
import ShowMore from '../components/ShowMore'
import Leaders from '../components/Leaders'
import PageControl from 'react-native-page-control';
import AnnouncementItem from '../components/AnnouncementItem';
import AnnouncementDetail from '../components/AnnouncementDetail';

var passedProps = {
    heading: undefined,
    subTitle: undefined
}

function Announcements(props) {
    const navigation = useNavigation();
    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);
    const [masterData, setMasterData] = useState([])
    const [users, setUsers] = useState([]);
    const todoRef = firebase.firestore().collection('todos');


    const announcements = () => {
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
    }
    useEffect(() => {
        announcements()
    }, [])

    const eventRef = firebase.firestore().collection('houseevents');
    const [event, setevent] = useState([])
    const eventz = () => {
        eventRef
            .onSnapshot(
                querySnapshot => {
                    const event = []
                    querySnapshot.forEach((doc) => {
                        const { header, venue } = doc.data()
                        event.push({
                            id: doc.id,
                            header,
                            venue,
                        })
                    })
                    setevent(event)
                }
            )
    }
    useEffect(() => {
        eventz()
    }, [])
    const onViewableItemsChanged = ({ viewableItems, changed }) => {
        console.log(viewableItems);
        console.log(changed);
    };
    const [selectedChallenge, setSelectedChallenge] = useState(null)
    const openModal = (item) => {
        setSelectedChallenge(item)
        // navigation.navigate("Info")
    }
    return (
        <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
            <Text style={{ fontSize: 39, fontWeight: 'bold', padding: 10, marginTop: 5 }}>Announcements</Text>
            <Text style={styles.subTitle}>SNW PLS 👉👈</Text>
            <SearchBar
                searchPhrase={searchPhrase}
                setSearchPhrase={setSearchPhrase}
                clicked={clicked}
                setClicked={setClicked}
            />
            <ScrollView style={{ paddingBottom: 10, flex: 1 }}>
                <View style={{ flexDirection: "row", alignSelf: "center", marginTop: 20 }}>

                </View>

                <Text style={{ fontSize: 30, marginLeft: 10, fontWeight: 'bold', marginBottom: 10 }}>House Announcements</Text>
                <ShowMore style={{ flex: 1 }}>
                    <FlatList
                        style={{ height: '100%' }}
                        data={users}
                        numColumns={1}
                        renderItem={({ item }) => (
                            <AnnouncementItem
                                header={item.heading}
                                subTitle={item.text}
                                // onPress={() => {
                                //     passedProps.heading = item.heading
                                //     // navigation.navigate({name: "Info", params: {passedProps: passedProps}})
                                //     navigation.navigate("Info", {
                                //         heading: heading,
                                //         subTitle: undefined
                                //     })
                                // }}
                                // onPress={() => openModal()}
                            >
                            </AnnouncementItem>
                        )}
                    />
                </ShowMore>
                <Text style={{ fontSize: 30, marginLeft: 10, fontWeight: 'bold', marginBottom: 8 }}>House Events</Text>
                <ShowMore style={{ flex: 1 }}>
                    <FlatList
                        style={{ height: '100%' }}
                        data={event}
                        numColumns={1}
                        renderItem={({ item }) => (
                            <Pressable
                                style={styles.container}
                            >
                                <TouchableOpacity style={styles.innerContainer}>
                                    <Text style={[styles.itemHeading, { paddingBottom: 8 }]}>{item.header}</Text>
                                    <Text style={styles.itemText}>Venue: {item.venue}</Text>
                                </TouchableOpacity>
                            </Pressable>
                        )}
                    />
                </ShowMore>
            </ScrollView>
            {/* <PageControl
  style={{position:'absolute', left:0, right:0, bottom:10}}
  numberOfPages={3}
  currentPage={1}
  hidesForSinglePage
  pageIndicatorTintColor='gray'
  currentPageIndicatorTintColor='white'
  indicatorStyle={{borderRadius: 5}}
  currentIndicatorStyle={{borderRadius: 5}}
  indicatorSize={{width:8, height:8}}
//   onPageIndicatorPress={this.onItemTap}
/> */}
        </SafeAreaView>

    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FEFBF6',
        // backgroundColor: 'white',
        padding: 15,
        marginHorizontal: 10,
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 0.5
    },
    innerContainer: {
        flexDirection: 'column',
        borderRadius: 15,
    },
    itemHeading: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    itemText: {
        fontWeight: '300',
        fontSize: 17
    },
    textInputStyle: {
        height: 40,
        borderWidth: 1,
        paddingLeft: 20,
        margin: 5,
        borderColor: 'black'
    },
    subTitle: {
        color: "#C1CAD6",
        marginTop: -5,
        marginHorizontal: 14,
    },
})
const Stack = createNativeStackNavigator()

export default function AnnouncementStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Announcements"
                component={Announcements} options={{ headerShown: false }} />
            <Stack.Screen
                name="Info"
                component={Info}options={{ headerShown: true }} />
        </Stack.Navigator>
    )
}
