import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalApi from '../../Utils/GlobalApi'
import { useUser } from '@clerk/clerk-expo'
import BusinessListItem from '../BusinessListByCategory/BusinessListItem';
import { useNavigation } from '@react-navigation/native';



export default function BookingScreen() {

  const {user} = useUser();
  const [bookingList, setBookingList] = useState();
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    getUserBookings()
  }, [user])

  const getUserBookings = () => {
    setLoading(true)
    GlobalApi.getUserBookings(user.primaryEmailAddress.emailAddress).then(resp => {
      //console.log('bookings', resp);
      setBookingList(resp.bookings);
      setLoading(false)
    })
  }

  return (
    <View style={{padding: 20}}>
      <Text style={{fontFamily: 'outfit-semibold', fontSize: 26}}>My Bookings</Text>
      <TouchableOpacity onPress={() => navigation.push('Service-Detail')}>
        <FlatList 
        data={bookingList}
        onRefresh={() => getUserBookings()}
        refreshing={loading}
        renderItem={({item, index}) => (
          <BusinessListItem business={item?.businessList}
          booking={item} />
        )} />
      </TouchableOpacity>
    </View>
  )
}