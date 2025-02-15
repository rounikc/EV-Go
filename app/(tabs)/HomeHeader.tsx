import { View, Text, Image } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'

export default function HomeHeader(){
    const {user} = useUser();

    return (
        <View>
            <Image 
                source={{uri:user?.imageUrl}}
                style={{width: 45, height: 25, borderRadius: 99}}
            
            />
        </View>
    )
}