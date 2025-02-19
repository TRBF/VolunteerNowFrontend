import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as Sentry from "@sentry/react-native";

Sentry.init({
  dsn: "https://YOUR_DSN_HERE.ingest.sentry.io/PROJECT_ID",
  enableInExpoDevelopment: true,  // Set this to false if using Expo in development mode
  debug: true, // Enables Sentry debugging logs
});

function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

export default Sentry.wrap(App)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
