import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput, ScrollView, KeyboardAvoidingView, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import CalendarPicker from 'react-native-calendar-picker'
import Colors from '../../Utils/Colors';
import Heading from '../../Components/Heading';
import GlobalApi from '../../Utils/GlobalApi';
import { useUser } from '@clerk/clerk-expo';
import moment from 'moment';


export default function BookingModal({businessId, hideModal}) {

  const [timeList, setTimeList] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [note, setNote] = useState();
  const {user} = useUser();

  useEffect(() => {
    getTime();
  }, [])

    const getTime = () => {
      const timeList = [];
      for(let i=8; i <= 12; i++){
        timeList.push({
          time: i + ':00 AM'
        })
        timeList.push({
          time: i + ':30 AM'
        })
      }
      for(let i=1; i <= 7; i++){
        timeList.push({
          time: i + ':00 PM'
        })
        timeList.push({
          time: i + ':30 PM'
        })
      }
      setTimeList(timeList);
    }

    const createNewBooking = () => {

      if(!selectedTime || !selectedDate) {
        ToastAndroid.show('Please Select Date and Time', ToastAndroid.LONG)
        return;
      }

      const data = {
        userName: user?.fullName,
        userEmail: user?.primaryEmailAddress.emailAddress,
        time: selectedTime,
        date: moment(selectedDate).format('DD-MMM-yyyy'),
        businessId: businessId
      }

      GlobalApi.createBooking(data).then(resp => {
        //console.log("Resp", resp);
        ToastAndroid.show('Booking Created Successfully!', ToastAndroid.LONG)
        hideModal();
      })
    }

  return (
    <ScrollView>
    <KeyboardAvoidingView style={{padding: 20}}>
      <TouchableOpacity onPress={() => hideModal()} style={{display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center'}}>
        <Ionicons name="arrow-back-outline" size={30} color="black" />
        <Text style={{fontSize: 25, fontFamily: 'outfit-semibold'}}>Booking</Text>
      </TouchableOpacity>

      {/* Calendar Section */}
      <Text style={{fontFamily: 'outfit-semibold', fontSize: 19, marginTop: 15}}>Select Date</Text>
      <View style={styles.calendarConatiner}>
        <CalendarPicker 
          onDateChange={setSelectedDate}
          width={340}
          minDate={Date.now()}
          todayBackgroundColor={Colors.BLACK}
          todayTextStyle={{color: Colors.WHITE}}
          selectedDayColor={Colors.PRIMARY}
          selectedDayTextColor={Colors.WHITE}
         />
      </View>

      {/* Time Section */}
      <View style={{marginTop: 20}}>
        <Heading text={'Select Time Slot'} />
        <FlatList data={timeList}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        renderItem={({item, index}) => (
          <TouchableOpacity style={{marginRight: 10}} onPress={()=> setSelectedTime(item.time)}>
            <Text style={[selectedTime==item.time ? styles.selectedTime : styles.unSelectedTime]}>{item.time}</Text>
          </TouchableOpacity>
        )} />
      </View>

      {/* Note Section */}
      <View style={{paddingTop: 20}}>
        <Heading text={'Any Suggestion Note'} />
        <TextInput placeholder='Note' 
        numberOfLines={4}
        multiline={true}
        style={styles.noteArea}
        onChange={() => setNote('note')}
          />
      </View>

      {/* Confirmation Section */}

      <TouchableOpacity style={{marginTop: 25}} onPress={() => createNewBooking()}>
        <Text style={styles.confirmBtn}>Confirm & Book</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    calendarConatiner: {
        backgroundColor: Colors.LIGHT_PRIMARY,
        padding: 20,
        borderRadius: 15,
        marginTop: 10
    },
    selectedTime: {
      padding: 10,
      borderWidth: 1,
      borderColor: Colors.PRIMARY,
      borderRadius: 99,
      paddingHorizontal: 18,
      backgroundColor: Colors.PRIMARY,
      color: Colors.WHITE
    },
    unSelectedTime: {
      padding: 10,
      borderWidth: 1,
      borderColor: Colors.PRIMARY,
      borderRadius: 99,
      paddingHorizontal: 18,
      color: Colors.PRIMARY
    },
    noteArea: {
      borderWidth: 1,
      borderRadius: 15,
      textAlignVertical: 'top',
      padding: 20,
      fontSize: 16,
      fontFamily: 'outfit',
      borderColor: Colors.PRIMARY
    },
    confirmBtn: {
      textAlign: 'center',
      fontFamily: 'outfit-semibold',
      fontSize: 17,
      backgroundColor: Colors.PRIMARY,
      color: Colors.WHITE,
      padding: 15,
      borderRadius: 99,
      elevation: 2,
      
    }
})