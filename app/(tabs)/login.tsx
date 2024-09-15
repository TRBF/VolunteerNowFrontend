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
import { isLoggedIn, rememberAccount } from "../get-post/_account";
import { Link, router, useNavigation, useRouter } from "expo-router";

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
  
  console.log(isLoggedIn());

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.mainView}>
          <Image
            style={styles.bgImage}
            source={require("../../assets/images/wave2.png")}
          />
          <View style={styles.loginInfo}>
            <Text style={styles.loginText}>Login now</Text>
            <TextInput
              value={username}
              onChangeText={setUsername}
              style={styles.inputText}
              placeholder="username"
              placeholderTextColor="black"
            />
            <TextInput
              value={password}
              onChangeText={setPassword}
              style={styles.inputText}
              placeholder="password"
              secureTextEntry={true}
              placeholderTextColor="black"
            />

            {/* Display loading spinner when loading */}
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <View style={styles.btnView}>
                <Pressable onPress={handleLogin}>
                  <Text style={styles.btnText}>Login</Text>
                </Pressable>
              </View>
            )}
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
    resizeMode: "cover",
    height: "40%",
    width: "100%",
  },

  loginInfo: {
    marginTop: -10,
    width: "100%",
    height: "auto",
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "2%",
    paddingTop: 0,
  },

  loginText: {
    fontSize: 40,
    fontStyle: "italic",
    padding: "10%",
    paddingTop: 0,
  },

  inputText: {
    borderWidth: 1,
    width: "90%",
    height: 50,
    padding: 5,
    margin: 20,
    marginRight: 0,
    borderRadius: 5,
    color: "black",
  },

  viewSignUp: {
    padding: 10,
    // justifyContent: "center",
    // alignContent: "center",
    alignItems: "center",
    width: "100%",
  },
  btnView: {
    marginTop: 12,
    marginLeft: 10,
    backgroundColor: "white",
  },

  btnText: {
    color: "#7d4cb6",
    fontSize: 15,
    paddingTop: 10,
  },

  textSignUp: {
    paddingTop: 30,
    fontSize: 15,
  },
});

// culori:
// - #7d4cb6
// - #7211a2
// - #f0e3f6
// - #460069
