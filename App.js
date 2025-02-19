import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as Sentry from 'sentry-expo';

Sentry.init({
  dsn: "https://a39f7f3ec9520a6d4308eb4058f28240@o4508845305102336.ingest.de.sentry.io/4508845780566096",
  enableInExpoDevelopment: true,
  debug: true,
});

function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

export default Sentry.wrap(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
