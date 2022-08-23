import React from 'react'
import { SafeAreaView, StyleSheet, Text, View , Image} from 'react-native'

const AboutUs = () => {
    return (
        <SafeAreaView>
        <View style={{backgroundColor: 'white'}}>
            <Text style={{fontSize: 34, fontWeight: 'bold', padding: 15}}>About Us!</Text>
            <View style={{width: 400, left: 16, borderRadius: 14, justifyContent: 'center', alignItems: 'center',backgroundColor: '#F6E8EA', hadowColor: 'black', shadowColor: '#171717',
            shadowOffset: {width: -2, height: 4},
            shadowOpacity: 1,
            shadowRadius: 3}}>
                <Text style={{fontSize: 23, fontWeight: '500', fontStyle: 'italic', top: 10, marginHorizontal: 10, marginBottom: 23}}>We are a group of students from School of Science and Technology Singapore and we built this app together with a team of 5. We did this with the aim of wanting to benefit the community through fitness. We hope that you have enojoyed our app while you used it and if you have any enquiries or feeback, please email us at growcalth.main@gmail.com</Text>
            </View>
            <Image source={require('../../assets/GrowCalthIcon.jpeg')} style={{height: 300, width: 300, borderRadius: 10, margin: 40, left: 30, top: -10}} /> 
        </View>
        </SafeAreaView>
    )
}

export default AboutUs

const styles = StyleSheet.create({})
