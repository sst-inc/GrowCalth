import React, {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {Picker} from '@react-native-picker/picker';

const Goals = (state) => {
    const [selectedLanguage, setSelectedLanguage] = useState();
    return (
        <View style={{backgroundColor: 'white', flex: 1}}>
            <Text style={{margin: 15, fontWeight: '700', fontSize: 34}}>Set your Target 🎯</Text>
            <View style={{backgroundColor: '#EBEFB1', marginHorizontal: 15, borderRadius: 20, paddingVertical: -20, marginBottom: 20}}>
            <Text style={{fontWeight: 'bold', marginLeft: 10, fontSize: 28, top: 10, textAlign: 'center'}}>StepCount</Text>
            <Picker
            style={{marginTop: 20}}
                selectedValue={selectedLanguage}
                onValueChange={(itemValue, itemIndex) =>
                setSelectedLanguage(itemValue)
             }>
            <Picker.Item label="1,000" value="java" />
            <Picker.Item label="2,000" value="js" />
            <Picker.Item label="3,000" value="js" />
            <Picker.Item label="4,000" value="js" />
            <Picker.Item label="5,000" value="js" />
            <Picker.Item label="6,000" value="js" />
            <Picker.Item label="7,000" value="js" />
            <Picker.Item label="8,000" value="js" />
            <Picker.Item label="9,000" value="js" />
            <Picker.Item label="10,000" value="js" />
            <Picker.Item label="11,000" value="js" />
        </Picker>
        </View>
<View style={{backgroundColor: '#D8E8EE', marginHorizontal: 15, borderRadius: 20}}>
        <Text style={{fontWeight: 'bold', marginLeft: 10, fontSize: 28, top: 10, textAlign: 'center'}}>Distance</Text>
            <Picker
            style={{marginTop: 0}}
                selectedValue={selectedLanguage}
                onValueChange={(itemValue, itemIndex) =>
                setSelectedLanguage(itemValue)
             }>
            <Picker.Item label="1km" value="java" />
            <Picker.Item label="2km" value="js" />
            <Picker.Item label="3km" value="js" />
            <Picker.Item label="4km" value="js" />
            <Picker.Item label="5km" value="js" />
            <Picker.Item label="6km" value="js" />
            <Picker.Item label="7km" value="js" />
            <Picker.Item label="8km" value="js" />
            <Picker.Item label="9km" value="js" />
            <Picker.Item label="10km" value="js" />
        </Picker>
        </View>
    </View>
    )
}

export default Goals;

const styles = StyleSheet.create({})
