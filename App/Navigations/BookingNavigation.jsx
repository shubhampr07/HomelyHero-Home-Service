import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import BookingScreen from '../Screens/BookingScreen/BookingScreen';
import BusinessDetailScreen from '../Screens/BusinessDetailScreen/BusinessDetailScreen';



const Stack = createStackNavigator();
export default function BookingNavigation() {
  return (
    <Stack.Navigator screenOptions={{
        headerShown: false
    }}>
        <Stack.Screen name="booking" component={BookingScreen} />
        <Stack.Screen name='Service-Detail' component={BusinessDetailScreen} />
    </Stack.Navigator>
  )
}