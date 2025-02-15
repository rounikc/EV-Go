import { Text, View, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as WebBrowser from 'expo-web-browser';
import { useSSO, useOAuth, useUser } from "@clerk/clerk-expo";
import { useCallback, useEffect, useState } from "react";
import { SplashScreen, useRouter } from "expo-router";
import * as Linking from "expo-linking";
import colors from '@/assets/utils/colors';

export const useWarmUpBrowser = () => {
  useEffect(() => {
    void WebBrowser.warmUpAsync()
    return () => {
      void WebBrowser.coolDownAsync()
    }
  }, [])
}

WebBrowser.maybeCompleteAuthSession();

export default function Index() {

  useWarmUpBrowser()

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onPress = useCallback(async () => {
    try {
      setIsLoading(true);
      const { createdSessionId, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL("/oauth-native", { scheme: "myapp"}),
      });

      if (createdSessionId) {
        console.log("Session created: ", createdSessionId)
        setActive!({ session: createdSessionId })
        await user?.reload();
      } else {
        // If there is no `createdSessionId`,
        // there are missing requirements, such as MFA
        // Use the `signIn` or `signUp` returned from `startSSOFlow`
        // to handle next steps
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    } finally {
      setIsLoading(false);
    }
  }, [])
  
  

  return (
    <View style={styles.container1}>

      <View style={styles.container2}>
        
        <Image source={require('@/assets/images/logo.jpg')}
        style={styles.logoimg}
        />

        <Image source={require('@/assets/images/car-marker.jpg')}
        style={styles.frontimg}
        />

        <View style={{padding:20}}>
          <Text style={styles.definetop}>One stop solution for your EV</Text>
          <Text style={styles.definebottom}>Find chargers nearby, book slots beforehand and so much more from one app.</Text>
        </View>

        <TouchableOpacity 
          style={styles.buttongoogle}
          onPress={onPress}
          disabled={isLoading}
        >
          <Text style={styles.buttontextstyle}>
            Login With Google
          </Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 25
  },
  
  container2: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },

  logoimg: {
      width:200,
      height:100,
      resizeMode:'contain',
      justifyContent: 'center',
      alignItems: 'center',
  },

  frontimg: {
      width: '100%',
      height: 240,
      marginTop: 20,
      resizeMode: 'cover',
      justifyContent: 'center',
      alignItems: 'center',
  },

  definetop: {
      fontSize: 25,
      fontFamily:'outfit-bold',
      textAlign: 'center',
      marginTop: 20
  },

  definebottom: {
      fontSize: 17,
      fontFamily: 'outfit',
      textAlign: 'center',
      marginTop: 15,
      color: colors.GRAY
  },

  buttongoogle: {
      backgroundColor: colors.PRIMARY,
      padding: 20,
      display: 'flex',
      borderRadius: 99,
      marginTop: 50
  },

  buttontextstyle: {
    color: colors.WHITE,
    textAlign: 'center',
    fontFamily: 'outfit',
    fontSize: 20
  }
});