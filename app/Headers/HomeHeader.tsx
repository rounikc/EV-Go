import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { useUser } from '@clerk/clerk-expo';
import Ionicons from '@expo/vector-icons/Ionicons';
import colors from '@/assets/utils/colors';

export default function HomeHeader(){
    const {user} = useUser();

    return (
        <View style={styles.headerstyle}>
            <Image 
                source={{uri:user?.imageUrl}}
                style={{width: 45, height: 45, borderRadius: 99}}
            />

            <Image
                source={require('@/assets/images/logo.jpg')}
                style={{width: 200, height: 45, objectFit: 'contain'}}
            />

            <Ionicons name="filter-circle-sharp" size={50} color="black" />
        </View>
    )
}

const styles = StyleSheet.create({
    headerstyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.TRANSP_WHITE
    }
})