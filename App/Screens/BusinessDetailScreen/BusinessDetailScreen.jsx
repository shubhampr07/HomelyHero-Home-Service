import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Linking,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../Utils/Colors";
import BusinessPhotos from "./BusinessPhotos";
import BusinessAboutSection from "./BusinessAboutSection";
import BookingModal from "./BookingModal";

export default function BusinessDetailScreen() {
  const param = useRoute().params;
  const [business, setBusiness] = useState(param.business);
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    //console.log(param?.business);
  }, []);

  const onMessageBtn = () => {
    Linking.openURL('mailto:'+business?.email+'?subject=I am Looking for Your Service&body=Hi There,')
  }

  return (
    business && (
      <View>
        <ScrollView style={{height: '91%'}}>
          <TouchableOpacity
            style={styles.backBtnContainer}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back-outline" size={30} color="white" />
          </TouchableOpacity>
          <Image
            source={{ uri: business?.images[0]?.url }}
            style={{ width: "100%", height: 300, marginTop: 5 }}
          />
          <View style={styles.infoContainer}>
            <Text style={{ fontFamily: "outfit-bold", fontSize: 25 }}>
              {business?.name}
            </Text>
            <View style={styles.subContainer}>
              <Text
                style={{
                  fontFamily: "outfit-semibold",
                  color: Colors.PRIMARY,
                  fontSize: 20,
                }}
              >
                {business?.contactPerson} 🌟
              </Text>
              <Text
                style={{
                  color: Colors.PRIMARY,
                  backgroundColor: "#D3D3D3",
                  padding: 5,
                  borderRadius: 5,
                  fontSize: 14,
                }}
              >
                {business?.category.name}
              </Text>
            </View>
            <Text
              style={{
                fontFamily: "outfit",
                fontSize: 15,
                color: Colors.DARK_GRAY,
              }}
            >
              <Ionicons
                name="ios-location-sharp"
                size={23}
                color={Colors.PRIMARY}
              />
              {business?.address}
            </Text>

            {/* Horizontal line */}
            <View
              style={{
                borderWidth: 0.4,
                borderColor: Colors.DARK_GRAY,
                marginTop: 20,
                marginBottom: 20,
              }}
            ></View>

            {/* About section */}
            <BusinessAboutSection business={business} />

            <View
              style={{
                borderWidth: 0.4,
                borderColor: Colors.DARK_GRAY,
                marginTop: 20,
                marginBottom: 20,
              }}
            ></View>
            <BusinessPhotos business={business} />
          </View>
        </ScrollView>
        <View style={{display: 'flex', flexDirection: 'row', margin: 8, gap:8}}>
            <TouchableOpacity style={styles.msgBtn} onPress={() => onMessageBtn()}>
                <Text style={{textAlign: 'center', fontFamily: 'outfit', color: Colors.PRIMARY, fontSize: 18}}>Message</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bookBtn} onPress={() => setShowModal(true)}>
                <Text style={{textAlign: 'center', fontFamily: 'outfit', color: Colors.WHITE, fontSize: 18}}>Book</Text>
            </TouchableOpacity>
        </View>
        <Modal
        animationType='slide'
        visible={showModal}
        >
            <BookingModal businessId={business.id} hideModal={() => setShowModal(false)} />
        </Modal>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  backBtnContainer: {
    position: "absolute",
    zIndex: 10,
    padding: 20,
  },
  infoContainer: {
    padding: 20,
  },
  subContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  msgBtn: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 99,
    flex: 1
  },
  bookBtn: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 99,
    flex: 1
  }
});
