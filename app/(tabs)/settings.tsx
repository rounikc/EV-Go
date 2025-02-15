import { SignedIn, useClerk } from "@clerk/clerk-expo";
import { Button, StyleSheet, Text, View } from "react-native";

export default function SettingsScreen() {
     const {signOut, user} = useClerk();
    
    return (
        <View style={styles.containermain}>
            <SignedIn>
                <Text>This is Settings </Text>
                <Text>Email: {user?.emailAddresses[0]?.emailAddress}  </Text>
                <Text>Name: {user?.fullName} </Text>
                <Button title="Logout" onPress={() => signOut()}/>
            </SignedIn>
        </View>
    )
}

const styles = StyleSheet.create({
    containermain: {
        flex: 1,
        backgroundColor: '#fff',
      }
})