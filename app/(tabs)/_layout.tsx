import React from "react";
import { Redirect, Tabs } from "expo-router";
import { useUser, useAuth } from "@clerk/clerk-expo";
import { Platform } from "react-native";

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
            <Tabs.Screen name="index" options={{ title: "Home" }}/>
            <Tabs.Screen name="settings" options={{ title: "Settings" }}/>
        </Tabs>
    )
}