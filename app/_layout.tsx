import { Stack } from "expo-router";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { tokenCache } from "@/assets/utils/cache";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';


const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if (!publishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
  )
}

export default function RootLayout() {
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
        <Stack>
          <Stack.Screen name="auth" options={{ headerShown: false }}/>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
        </Stack>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
