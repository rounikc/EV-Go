import React from "react";
import { Redirect, Tabs } from "expo-router";
import { useUser, useAuth } from "@clerk/clerk-expo";
import { Platform } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import colors from "@/assets/utils/colors";

export default function Tablayout() {
    const { user } = useUser();
    const { isSignedIn } = useAuth();

    if(!isSignedIn) {
        return <Redirect href="/auth"/>
    }

    return(
        <Tabs 
            screenOptions={{
                headerShown: false,
                tabBarStyle: Platform.select({
                    android: {
                        position: "absolute",
                    },
                    default: {},
                }),
        }}>
            <Tabs.Screen 
                name="index" 
                options={{ 
                    tabBarLabel: "Search",
                    tabBarActiveTintColor: colors.PRIMARY,
                    tabBarIcon: ({size, color}) => (
                        <Ionicons 
                            name="search-circle-sharp" 
                            size={size} 
                            color={color} 
                        />
                    )
                }}
            />
            
            <Tabs.Screen 
                name="Favourites" 
                options={{ 
                    tabBarLabel: "Favourites",
                    tabBarActiveTintColor: colors.PRIMARY,
                    tabBarIcon: ({size, color}) => (
                        <Ionicons 
                            name="heart-circle-sharp" 
                            size={size} 
                            color={color} 
                        />
                    )
                }}
            />
            
            <Tabs.Screen 
                name="settings" 
                options={{ 
                    tabBarLabel: "Profile",
                    tabBarActiveTintColor: colors.PRIMARY,
                    tabBarIcon: ({size, color}) => (
                        <FontAwesome 
                            name="user-circle" 
                            size={20} 
                            color={color} 
                        />
                    )
                }}
            />

        </Tabs>
    )
}