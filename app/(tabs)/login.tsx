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
import { StyleSheet } from "react-native";
import { login } from "../apistuff/add";
import { rememberAccount } from "../apistuff/_account";
import { Link, useNavigation, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false); // To track the loading state
  // const { navigate } = this.props.navigation;
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleLogin = async () => {
    // Validate the inputs first
    if (!username || !password) {
      alert("Error, Please enter both username and password.");
      return;
    }

    try {
      setLoading(true); // Set loading to true
      const result = await login(username, password);

      // Handle the response based on the result
      if (result.success) {
        alert("Success, Login successful!");
        await rememberAccount(result.result.token, result.result.userid);
      } else {
        alert("Error, Login failed. Please check your credentials.");
      }
    } catch (error) {
      alert("Error, An error occurred during login.");
      console.error(error);
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

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
                {loading ? (
                  <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                  <Pressable
                    style={styles.button}
                    onPress={() => {
                      AsyncStorage.setItem("token", "Exista");
                      router.navigate("profile");
                    }}
                  >
                    <Text style={styles.buttonText}>Login</Text>
                  </Pressable>
                )}
                <View style={{ marginTop: " 3%", alignSelf: "center" }}>
                  <Link
                    href={{
                      pathname: "/auth/forgotpassword",
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
                      pathname: "/auth/register",
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    backgroundColor: "#FFFFFF",
  },

  mainView: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
  },

  bgImage: {
    resizeMode: "contain",
    height: "30%",
    width: "80%",
    alignSelf: "center",
    marginTop: "5%",
    position: "absolute",
  },

  loginInfo: {
    width: "100%",
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "3%",
    marginTop: "50%",
  },

  loginText: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 0,
    marginBottom: "5%",
    color: "rgba(114, 17, 162, .8)",
  },

  inputText: {
    marginTop: "8%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    width: "90%",
    alignSelf: "center",
    padding: 10,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },

  viewSignUp: {
    paddingTop: "7%",
    alignItems: "center",
  },
  btnView: {
    backgroundColor: "white",
  },

  btnText: {
    color: "#7d4cb6",
    fontSize: 15,
  },

  textSignUp: {
    paddingTop: 30,
    fontSize: 15,
  },

  loginCard3D: {
    backgroundColor: "white",
    width: "100%",
    paddingVertical: "15%",
    borderRadius: 20,
    shadowColor: "#7211A2",
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 15,
  },

  button: {
    backgroundColor: "rgba(114, 17, 162, .8)",
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 70,
    alignSelf: "center",
    marginTop: "10%",
  },

  buttonText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },

  forgotPasswordText: {
    color: "#7d4cb6",
    fontSize: 14,
  },
});

// culori:
// - #7d4cb6
// - #7211a2
// - #f0e3f6
// - #460069

