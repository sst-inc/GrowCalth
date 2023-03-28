import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

const colorValues = [
    { color: 'Black', value: 500, image: require('./../assets/black.jpeg') },
    { color: 'Blue', value: 220, image: require('./../assets/blue.jpeg') },
    { color: 'Red', value: 300, image: require('./../assets/red.jpeg') },
    { color: 'Green', value: 400, image: require('./../assets/green.jpeg') },
    { color: 'Yellow', value: 500, image: require('./../assets/yellow.jpeg') },
  ];
  

const ColorValuesList = () => {
    const sortedColorValues = colorValues.sort((a, b) => b.value - a.value);
    const renderColorValue = ({ item }) => (
        <View style={{ 
            flexDirection: 'row', 
            paddingVertical: 8, 
            borderBottomWidth: 1,
            borderBottomColor: 'lightgray',
            }}>
            <Image style={[styles.image]} source={item.image} />
            <View style={styles.textContainer}>
            <Text style={{ flex: 1, fontSize: 23, marginLeft: 50 }}>{item.color}</Text>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                 <Text style={{marginLeft: 50, fontSize: 25, fontWeight: 'bold'}}>{item.value}</Text>
                 </View>
            </View>

        </View>
    );

    return (
        <FlatList
            style={{backgroundColor: 'white'}}
            data={sortedColorValues}
            renderItem={renderColorValue}
            keyExtractor={(item) => item.color}
        />
    );
};

const styles = StyleSheet.create({
    image: {
      width: 70,
      height: 70,
      marginLeft: 10
    },
    textContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row'
    },
  });
  
export default ColorValuesList;
