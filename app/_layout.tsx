import React, { useEffect } from "react";
import { Stack } from "expo-router/stack";
import { placeholderTestingStore } from "../apistuff/account";
import { ro, en, registerTranslation } from 'react-native-paper-dates'

export default function Layout() {
  
  useEffect(() => {
    placeholderTestingStore()
  }, []) 
 
  registerTranslation('ro', ro) 
  registerTranslation('en', en) 

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
  );
}

