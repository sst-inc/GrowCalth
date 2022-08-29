import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native'
import firebase from 'firebase'

const Announcements = () => {
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
        <View style={{ flex:1, marginTop: 100}}>
            <FlatList 
                style={{height:'100%'}}
                data={users}
                numColumns={1}
                renderItem={({item}) => (
                    <Pressable
                        style={styles.container}
                    >
                        <View style={styles.innerContainer}>
                            <Text style={styles.itemHeading}>{item.heading}</Text>
                            <Text style={styles.itemText}>{item.text}</Text>

                        </View>
                    </Pressable>
                )}
            />
        </View>
    )
}

export default Announcements

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        padding:15,
        borderradius:15,
        margin:5,
        marginHorizontal:10,
        borderRadius: 15

    },
    innerContainer:{
        alignItems:'center',
        flexDirection:'column',
    },
    itemHeading:{
        fontWeight:'bold'
    },
    itemText:{
        fontWeight:'300'
    }
})
