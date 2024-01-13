import { View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from '../Screens/ProfileScreen/ProfileScreen';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../Utils/Colors';
import HomeNavigation from './HomeNavigation';
import BookingNavigation from './BookingNavigation';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.PRIMARY
    }} >
        
      <Tab.Screen name="home" component={HomeNavigation} options={{
        tabBarLabel: ({ color }) => ( <Text style={{ color: color, fontSize: 12, marginTop: -7 }}>Home</Text> 
        ),
        tabBarIcon: ({ color, size }) => (<FontAwesome name="home" size={size} color={color} />)
      }}/>

      <Tab.Screen name="Booking" component={BookingNavigation} options={{
        tabBarLabel: ({ color }) => ( <Text style={{ color: color, fontSize: 12, marginTop: -7 }}>Booking</Text> 
        ),
        tabBarIcon: ({ color, size }) => (<FontAwesome name="bookmark" size={size} color={color} />)
      }} />

      <Tab.Screen name="Profile" component={ProfileScreen} options={{
        tabBarLabel: ({ color }) => ( <Text style={{ color: color, fontSize: 12, marginTop: -7 }}>Profile</Text> 
        ),
        tabBarIcon: ({ color, size }) => (<FontAwesome name="user-circle-o" size={size} color={color} />)
      }} />
    </Tab.Navigator>
  )
}