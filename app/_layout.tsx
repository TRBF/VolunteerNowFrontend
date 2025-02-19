import React, { useEffect } from "react";
import { Stack } from "expo-router/stack";
import { placeholderTestingStore } from "../apistuff/account";
import { ro, en, registerTranslation } from 'react-native-paper-dates'
import * as Sentry from 'sentry-expo';

Sentry.init({
  dsn: "https://a39f7f3ec9520a6d4308eb4058f28240@o4508845305102336.ingest.de.sentry.io/4508845780566096",
  enableInExpoDevelopment: true,
  debug: true,
});

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

