import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'
import { useNavigation } from '@react-navigation/native'

export default function BusinessListItemSmall({business}) {

  const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.push('Service-Detail', {
      business: business
    })}>
      <Image source={{uri:business?.images[0]?.url}}
      style={styles.image}  />
      <View style={styles.infoContainer}>
        <Text style={{fontSize: 17, fontFamily: 'outfit-semibold'}}>{business?.name}</Text>
        <Text style={{fontSize: 13, fontFamily: 'outfit'}}>{business?.contactPerson}</Text>
        <Text style={{fontSize: 10, fontFamily: 'outfit', padding: 3, color: Colors.PRIMARY,
            backgroundColor: Colors.GRAY, borderRadius: 3, alignSelf: 'flex-start', paddingHorizontal: 7}}>{business?.category.name}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    image: {
        width: 160,
        height: 100,
        borderRadius: 10
    },
    container: {
        padding: 10,
        backgroundColor: Colors.WHITE,
        borderRadius: 10
    },
    infoContainer : {
        padding: 7,
        display: 'flex',
        gap: 3
    }
})