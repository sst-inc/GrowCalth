import React from 'react'
import { SafeAreaView, StyleSheet, Text, View, SectionList, StatusBar, Dimensions} from 'react-native'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Item = ({ title }) => (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
    </View>
  );
const Announcements = () => {
    const DATA = [
        {
          title: "Main dishes",
          data: ["Pizza", "Burger", "Risotto"]
        },
        {
          title: "Sides",
          data: ["French Fries", "Onion Rings", "Fried Shrimps"]
        },
        {
          title: "Drinks",
          data: ["Water", "Coke", "Beer"]
        },
        {
          title: "Desserts",
          data: ["Cheese Cake", "Ice Cream"]
        }
      ];
    return (
        <SafeAreaView>
            <View style={{padding: 10, marginTop: 5 }}>
            <Text style={{fontWeight: 'bold', fontSize: 38}}>Announcements</Text>
            <Text style={{color: '#C1CAD6'}}>Important Info</Text>
            </View>
            <SectionList
      sections={DATA}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => <Item title={item} />}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.header}>{title}</Text>
      )}
    />
        </SafeAreaView>
    )
}

export default Announcements

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
      marginHorizontal: 16
    },
    item: {
      backgroundColor: "#f9c2ff",
      padding: 20,
      marginVertical: 8,shadowColor: 'black', shadowColor: '#171717',
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 1,
      shadowRadius: 3,
      width: windowWidth-19,
      borderRadius: 14
    },
    header: {
      fontSize: 32,
      backgroundColor: "#fff"
    },
    title: {
      fontSize: 24
    }
  });