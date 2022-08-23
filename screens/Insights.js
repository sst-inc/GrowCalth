import { TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Text, View, Image, Dimensions, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Pedometer } from 'expo-sensors';
import { useNavigation } from '@react-navigation/native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';

const Insights = () => {
    const [PedometerAvailability, setPedometerAvailability] = useState("")
    const [stepCount, updateStepCount] = useState(0)
    const [isOver, setIsOver] = useState(false)

  useEffect(() => {
    subscribe();
  }, [])

  const subscribe = () => {
    const subscription = Pedometer.watchStepCount((result) => (
      updateStepCount(result.steps)
    ))
    Pedometer.isAvailableAsync().then(
      (result) => {
        setPedometerAvailability(String(result))
      },
      (error) => {
        setPedometerAvailability(error)
      }
    )
  }
  
  const motivation = () => {
    if ({stepCount} > 1000 ) {
      setIsOver(true)
    }
  }
    return (
        <ScrollView style={{backgroundColor: 'white'}}>
        <View>
        <Text style={{left: 15, fontSize: 40, fontWeight: 'bold', marginTop: 18}}>Chart</Text>
        <View style={styles.middle}>
            <View style={styles.insightView}>
            <Text style={{left: -170, top :130, fontWeight: 'bold', fontSize: 20}}>{stepCount} steps</Text>
              {/* <View style={styles.circle}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 40, fontWeight: 'bold' }}>{stepCount}</Text>
                </View>  
              </View> */}
               <BarChart
        data={{
          labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
          datasets: [
            {
              data: [20, 45, 28, 80, 99, 43, 28],
            },
          ],
        }}
        width={310}
        withCustomBarColorFromData={false}
        barWidth={12}
        barBorderRadius={6}
        height={170}
        chartConfig={{
          backgroundColor: '#F9F8FF',
          backgroundGradientFrom: '#F9F8FF',
          backgroundGradientTo: '#F9F8FF',
          decimalPlaces: 0,
          color: (opacity = 0.3) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            width: 1,
            withCustomBarColorFromData: 'black'
          }
          
        }}
        
        style={{
          marginVertical: 10,
          flex: 1, 
          justifyContent: 'center',
          borderRadius: 16,
          left: 20
        }}
      />
            </View>
          </View>
          <Text style={{left: 15, fontSize: 40, fontWeight: 'bold', marginTop: 15}}>Steps</Text>
          <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <View style={styles.circle}>
              <Text style={{fontWeight: 'bold', fontSize: 115}}>{stepCount}</Text>
              <Text style={{fontSize: 30}}>steps</Text>
              {/* <Text style={{paddingTop: 10, fontSize: 36, fontWeight: 'bold', fontStyle: 'italic'}}>{isOver ? "You did it! Keep it going!" : "You can do this!"}</Text> */}
            </View>
          </View>
          </View>
          </ScrollView>
          
    )
}

export default Insights;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFF',
      // backgroundColor: '#CEE5F2',
      //or can try use this as background colour: #7C98B3 or #ACCBE1 or #B1B695
    },
    largeTitle: {
      marginTop: 10,
      paddingHorizontal: 10,
    },
    subTitle: {
      color: '#C1CAD6',
      marginTop: 4
    },
    ok: {
      paddingHorizontal: 10,
      marginTop: 55,
    },
    motivation: {
      fontSize: 20,
      paddingBottom: -10
    },
    insights: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#473144',
      marginTop: -40,
    },
    insightView: {
      width: 400,
      height: 250,
      borderRadius: 15,
      marginHorizontal: 8,
      alignItems:'center',
      backgroundColor: '#F9F8FF'
    },
    dailyQuotes: {
      width: 415,
      height: 274,
      borderRadius: 15,
      borderColor: 'black',
      borderWidth: 1.23,
      paddingTop: 15,
      paddingHorizontal: 10
    },
    middle: {
      paddingHorizontal: 5.88,
      marginTop: 10,
    },
    white: {
      width: 100,
      height: 10,
      backgroundColor: 'black',
    },
    top: {
      marginTop: -3
    },
    quotes: {
      marginTop: 53,
      paddingHorizontal: 5
    },
    quote: {
      fontSize: 26.7,
      fontWeight: 'bold',
      color: '#473144',
      marginTop: -40,
    },
    circle: {
      width: 320,
      height: 320,
      borderRadius: 160,
      backgroundColor: 'white',
      marginHorizontal: 230,
      borderColor: '#FA8075',
      borderWidth: 20,
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1
    },
    moreInsights: {
      paddingTop: 170,
      paddingHorizontal: 30
    },
    Click: {
      color: '#B7B5B3',
      textDecorationLine: 'underline'
    },
    paddin: {
      paddingHorizontal: 25,
      marginTop: -3
    }
  });