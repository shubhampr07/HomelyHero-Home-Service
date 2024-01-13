import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import GlobalApi from '../../Utils/GlobalApi';
import BusinessListItem from './BusinessListItem';
import Colors from '../../Utils/Colors';
import PageHeading from '../../Components/PageHeading';

export default function BusinessCategoryScreen() {

    const navigation = useNavigation();

    const param = useRoute().params;

    const [businessList, setBusinessList] = useState([])

    useEffect(()=> {
        //console.log("resp", param.category)
        param && getBusinessByCategory();
    }, [param])

    const getBusinessByCategory = () => {
        GlobalApi.getBusinessListByCategory(param.category).then(resp => {
            //console.log(resp.businessLists);
            setBusinessList(resp.businessLists);
        })
    }

  return (
    <View style={{padding: 20, paddingTop: 30}}>
      <PageHeading title={param.category} />
      {businessList?.length>0 ?<FlatList style={{marginTop: 10}} data={businessList}
      renderItem={({item, index}) => (
        <BusinessListItem business={item} />
      )} /> : <Text style={{fontFamily: 'outfit', fontSize: 20, textAlign: 'center', marginTop: '20%', color: Colors.DARK_GRAY}}>
        No Service Found</Text>
      }
    </View>
  )
}