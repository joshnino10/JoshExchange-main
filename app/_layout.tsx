import CustomSplashScreen from "@/components/SplashScreen/SplashScreen";
import { StateProvider } from "@/context/GloabalContext";
import {
  Rubik_400Regular,
  Rubik_500Medium,
  Rubik_600SemiBold,
  Rubik_700Bold,
  Rubik_900Black,
  useFonts,
} from "@expo-google-fonts/rubik";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [splash, setSplash] = useState(true);
  
  const [loaded, error] = useFonts({
    Regular: Rubik_400Regular,
    semiBold: Rubik_600SemiBold,
    Bold: Rubik_700Bold,
    Black: Rubik_900Black,
    Medium: Rubik_500Medium,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  useEffect(() => {
    if (loaded) {
      setTimeout(() => setSplash(false), 5000);
    }
  }, [loaded]);

  if (splash)
   return(
    <CustomSplashScreen/>
  ) 

  if (!loaded && !error)
    return <ActivityIndicator size="large" color="black" />;

  return (
    <StateProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="signup"/>
        <Stack.Screen name="forgotpassword" />
        <Stack.Screen name="withdraw" />
        <Stack.Screen name="savedaccount"/>
        <Stack.Screen name="newaccount"/>
        <Stack.Screen name="verifynewaccount"/>
        <Stack.Screen name="notificationss"/>
        <Stack.Screen name="citi"/>
        <Stack.Screen name="changepin"/>
        <Stack.Screen name="addtobankacc"/>
        <Stack.Screen name="transaction-receipt/[id]"/>
      </Stack>
    </StateProvider>
  );
}
