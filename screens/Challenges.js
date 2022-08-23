import React from 'react'
import { SafeAreaView, SafeAreaViewBase, ScrollView, StyleSheet, Text, View } from 'react-native'
import LeaderBoard from './LeaderBoard'

const Challenges = () => {
    return (
      <SafeAreaView>
      <ScrollView>
    <View style={{ flex: 1, justifyContent: 'center', padding: 10, marginTop: 5 }}>
      <Text style={{fontWeight: 'bold', fontSize: 38}}>Challenges</Text>
      <Text style={{color: '#C1CAD6'}}>Whatever it is don't give up!</Text>
    </View>
    </ScrollView>
    </SafeAreaView>
    )
}
export default Challenges;