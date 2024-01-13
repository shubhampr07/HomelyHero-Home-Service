import { View, Text, Image, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import Colors from '../../Utils/Colors';
import { FontAwesome } from '@expo/vector-icons';

export default function Header() {

    const {user, isLoading} = useUser();

  return user && (
    <View style={styles.container}>
        {/* Profile Section */}
        <View style={styles.profileMainContainer}>
            <View style={styles.profileConatiner}>
                <Image source={{uri: user?.imageUrl}} style={styles.userImage} />
                <View>
                    <Text style={{color: Colors.WHITE}}>Welcome, </Text>
                    <Text style={{color: Colors.WHITE, fontSize: 18, fontFamily:'outfit'}}>{user?.fullName}</Text>
                </View>
            </View>
            <FontAwesome name="bookmark-o" size={27} color="white" />
      </View>

      {/* Search Section */}
      <View style={styles.searchBarContainer}>
        <TextInput placeholder='Search Service' style={styles.textInput} />
        <FontAwesome name="search" size={24} color={Colors.PRIMARY} style={styles.searchBtn} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 40,
        backgroundColor: Colors.PRIMARY,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        marginTop: 10
    },
    profileMainContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    profileConatiner : {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    userImage: {
        width: 45,
        height: 45,
        borderRadius: 99
    },
    textInput: {
        padding: 7,
        paddingHorizontal: 16,
        backgroundColor: Colors.WHITE,
        borderRadius: 8,
        width: '85%',
        fontSize: 16
    },
    searchBarContainer: {
        marginTop: 17,
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        marginBottom: 10
    },
    searchBtn : {
        backgroundColor: Colors.WHITE,
        padding: 10,
        borderRadius: 8
    },
    
})