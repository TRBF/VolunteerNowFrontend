import React, { useEffect } from "react";
import { Stack } from "expo-router/stack";
import { placeholderTestingStore } from "../apistuff/account";

export default function Layout() {
  
  useEffect(() => {
    placeholderTestingStore()
  }, []) 
  
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
  );
}

