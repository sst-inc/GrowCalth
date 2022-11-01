import React, {useState, useEffect} from 'react'
import firebase from 'firebase'
import { StyleSheet, Text, View, FlatList, Pressable, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'

const Info1 = ({route}) => {
    const [users, setUsers] = useState([]);
    const todoRef = firebase.firestore().collection('todos');
    const params = route.params
    const itemHeading = params.itemHeading
    const itemText = params.itemText
    const itemDate = params.itemDate

    return (
        <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
            <SafeAreaView>
            <Text style={styles.itemHeading}>{itemHeading}</Text>       
            </SafeAreaView>
        <ScrollView style={{flex: 1}}>
            <View style={{justifyContent: 'center', alignItems: 'center', alignSelf: 'center'}}>
                <Text style={styles.itemText}>{itemText}</Text>
                <View style={{flexDirection: 'row'}}>
                    <Text style={[styles.itemText, {paddingTop: 7}]}>Date:</Text>
                    <Text style={[styles.itemText, {paddingTop: 7, textDecorationLine: 'underline', left: 4}]}>{itemDate}</Text>
                </View>          
            </View>
        </ScrollView>
        </SafeAreaView>
    )
}

export default Info1

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#486B02',
        padding:15,
        borderradius:15,
        margin:5,
        marginHorizontal:10,
    },
    innerContainer:{
        flexDirection:'column',
    },
    itemHeading:{
        fontWeight:'bold',
        color: 'black', // Changed to black: cant see anything
        fontSize: 25, 
        padding: 15
    },
    itemText:{
        fontWeight:'400',
        padding: 10, 
        fontSize: 30,
        marginHorizontal: 5
    }
})