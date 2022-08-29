import React from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import { auth } from '../../firebase'

const Forgot = () => {
    return (
        <View style={{flex: 1,backgroundColor: 'white'}}>
            <Text style={{top: 50, fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>Enter Email Address</Text>
            <TextInput placeholder="Enter Email Here" />
        </View>
    )
}

export default Forgot

const styles = StyleSheet.create({
    textInput: { borderWidth:1, borderColor:"gray", marginVertical: 20, padding:10, height:40, alignSelf: "stretch", fontSize: 18, },
})
