import React, { useEffect } from "react";
import {
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
  ScrollView,
} from "react-native";
import { login } from "../../apistuff/logsign";
import { Link, useNavigation, useRouter } from "expo-router";

import { styles } from "../../styles/login";

export default function Login() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Error, Please enter both username and password.");
      return;
    }

    const code = await login(username, password)

    if (code==200) {
      console.log("eee")
      router.navigate("profile");
    } else {
      alert("Error, Login failed. Please check your credentials.");
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <View style={styles.mainView}>
            <Image
              style={styles.bgImage}
              source={require("../../assets/images/logo2.png")}
            />
            <View style={styles.loginInfo}>
              <View style={styles.loginCard3D}>
                <Text style={styles.loginText}>Log In</Text>
                <TextInput
                  value={username}
                  onChangeText={setUsername}
                  style={styles.inputText}
                  placeholder="username"
                  placeholderTextColor="#B0B0B0"
                />
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  style={styles.inputText}
                  placeholder="password"
                  secureTextEntry={true}
                  placeholderTextColor="#B0B0B0"
                />
                {/*
                {loading ? (
                  <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                  <Pressable
                    style={styles.button}
                    onPress={() => {
                      handleLogin();
                    }}
                  >
                    <Text style={styles.buttonText}>Login</Text>
                  </Pressable>
                )} */}
                <Pressable
                  style={styles.button}
                  onPress={() => {
                    handleLogin();
                  }}
                >
                  <Text style={styles.buttonText}>Login</Text>
                </Pressable>
                <View style={{ marginTop: " 3%", alignSelf: "center" }}>
                  <Link
                    href={{
                      pathname: "forgotpassword",
                    }}
                  >
                    <Text style={styles.forgotPasswordText}>
                      Forgot password?
                    </Text>
                  </Link>
                </View>
              </View>

              <View style={styles.viewSignUp}>
                <Text style={styles.textSignUp}>Don't have an account?</Text>
                <View style={styles.btnView}>
                  <Link
                    href={{
                      pathname: "register",
                    }}
                  >
                    <Text style={styles.btnText}>Sign Up!</Text>
                  </Link>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

// culori:
// - #7d4cb6
// - #7211a2
// - #f0e3f6
// - #460069

