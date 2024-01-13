import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors';
import { AntDesign, Ionicons } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

export default function BusinessListItem({business, booking}) {
    const navigation = useNavigation();

    if(!business){
        return null;
    }
  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.push('Service-Detail', { business })}>
  <Image source={{ uri: business?.images[0]?.url }} style={styles.image} />
  <View style={styles.subContainer}>
    <Text style={{ fontFamily: 'outfit', color: Colors.DARK_GRAY, fontSize: 15, marginLeft: 10 }}>
      {business.contactPerson ?? 'Unknown Contact'}
    </Text>
    <Text style={{ fontFamily: 'outfit', fontSize: 19, marginLeft: 10 }}>{business.name}</Text>

    {!booking?.id ? (
      <Text style={{
        fontFamily: 'outfit',
        color: Colors.DARK_GRAY,
        fontSize: 16
      }}>
        <Ionicons name="ios-location-sharp" size={20} color={Colors.PRIMARY} />
        {business.address}
      </Text>
    ) : (
      <Text style={{
        padding: 5,
        borderRadius: 5,
        fontSize: 14,
        marginLeft: 10,
        alignSelf: 'flex-start',
        backgroundColor: booking.bookingStatus === 'Completed' ? '#90EE90' :
          (booking.bookingStatus === 'Canceled' ? '#FF474C' : Colors.PRIMARY),
        color: booking.bookingStatus === 'Canceled' ? '#ffffff' : Colors.WHITE,
      }}>
        {booking.bookingStatus}
      </Text>
    )}

    {booking?.id ? (
      <Text style={{ fontFamily: 'outfit', color: Colors.DARK_GRAY, fontSize: 16, gap: 10, marginLeft: 10 }}>
        <AntDesign name='calendar' size={18} color={Colors.PRIMARY}  />
        {booking.date} at {booking.time}
      </Text>
    ) : null}
  </View>
</TouchableOpacity>

  )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: Colors.WHITE,
        borderRadius: 15,
        marginBottom: 15,
        display: 'flex',
        flexDirection: 'row',
        gap: 10
    },
    subContainer: {
        display: 'flex',
        gap: 7
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 15
    }
})