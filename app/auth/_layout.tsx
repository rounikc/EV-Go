import { Text } from "react-native";
import React from "react";
import { Redirect, Stack, usePathname } from "expo-router";
import { useAuth, useUser } from "@clerk/clerk-expo";

export default function Authlayout() {
    const { user } = useUser();
    const pathName = usePathname();
    const { isSignedIn } = useAuth();

    if (isSignedIn) {
        return <Redirect href="/(tabs)" />
    }

    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }}/>
        </Stack>
    )
}