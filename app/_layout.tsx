import { Stack } from "expo-router";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { tokenCache } from "@/assets/utils/cache";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { UserLocationContext } from '@/assets/utils/UserLocationContext'

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if (!publishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
  )
}

export default function RootLayout() {

  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function getCurrentLocation() {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    }

    getCurrentLocation();
  }, []);

  let text = 'Waiting...';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const [loaded, error] = useFonts({
      'outfit': require('./../assets/fonts/Outfit-Regular.ttf'),
      'outfit-medium': require('./../assets/fonts/Outfit-SemiBold.ttf'),
      'outfit-bold': require('./../assets/fonts/Outfit-Bold.ttf'),
      'outfit-black': require('./../assets/fonts/Outfit-Black.ttf'),
    });
  
    useEffect(() =>{
      if (loaded) {
        SplashScreen.hideAsync();
      }else if(error) {
        console.log("Error loading fonts:", error);
        SplashScreen.hideAsync();
      }
    },[loaded, error]);
  
    if(!loaded && !error) {
      return null;
    }

  return (
    <ClerkProvider
      tokenCache={tokenCache} 
      publishableKey={publishableKey}
    >
      <ClerkLoaded>
        <UserLocationContext.Provider 
          value={{location,setLocation}}
        >
        <Stack>
          <Stack.Screen name="auth" options={{ headerShown: false }}/>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
        </Stack>
        </UserLocationContext.Provider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
