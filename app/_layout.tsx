import { Stack } from 'expo-router/stack';
import { createContext } from 'react';
import { useState } from 'react';

const RefreshContext = createContext('profile');

export default function Layout() {

  const [refresh, setRefresh] = useState('profile');

  return (
    <RefreshContext.Provider value={refresh}>
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
    </RefreshContext.Provider>
  );
}
