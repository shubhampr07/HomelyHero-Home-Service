import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../Utils/Colors'
import Heading from '../../Components/Heading';


export default function BusinessAboutSection({business}) {

    const [readMore, setReadMore] = useState(false)

  return business&& (
    <View>
            <Heading text={'About Me'} />
            <Text style={{fontFamily: 'outfit',lineHeight: 28, color:Colors.DARK_GRAY, fontSize: 16}} numberOfLines={readMore ? 20:5}>
                {business.about}
            </Text>
            <TouchableOpacity onPress={() => setReadMore(!readMore)}>
                <Text style={{color: Colors.PRIMARY, fontSize: 16, fontFamily: 'outfit'}}>
                    {readMore ? 'Read Less' : 'Read More'}
                </Text>
            </TouchableOpacity>
        </View>
  )
}