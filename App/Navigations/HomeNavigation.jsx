import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import BusinessCategoryScreen from '../Screens/BusinessListByCategory/BusinessCategoryScreen';
import BusinessDetailScreen from '../Screens/BusinessDetailScreen/BusinessDetailScreen';

const Stack = createStackNavigator();
export default function HomeNavigation() {
  return (
    <Stack.Navigator screenOptions={{
        headerShown: false
    }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Service-List" component={BusinessCategoryScreen} />
        <Stack.Screen name="Service-Detail" component={BusinessDetailScreen} />
    </Stack.Navigator>
  )
}