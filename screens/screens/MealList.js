import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Meal from './Meal' 

export default function MealList({ mealData }) {
    const nutrients = mealData.nutrients;
    return (
        <View>
            <Text>Meal List</Text>
            <Text>Calories: {nutrients.calories.toFixed(0)}</Text>
        </View>
    )
}


const styles = StyleSheet.create({})
