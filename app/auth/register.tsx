import React, { useEffect } from "react";
import {
  Button,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { StyleSheet } from "react-native";
import { login } from "../get-post/add";
import {
  useNavigation,
  useRouter,
  useLocalSearchParams,
  Link,
} from "expo-router";

export default function Register() {
  const navigation = useNavigation();
  const router = useRouter();
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <View style={styles.mainView}>
      <Link
        href={{
          pathname: "/(tabs)/login",
        }}
      >
        <Text style={styles.btnText}>Login</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
    mainView: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    
    btnText: {
    padding: 20,
  },
});
