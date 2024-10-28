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
  ScrollView,
} from "react-native";
import { StyleSheet } from "react-native";
import { login } from "../get-post/add";
import { isLoggedIn, rememberAccount } from "../get-post/_account";
import { Link, router, useNavigation, useRouter } from "expo-router";
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient

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
        <ScrollView>
        <View style={styles.mainView}>
          <Image
            style={styles.bgImage}
            source={require("../../assets/images/wave2.png")}
          />
          <View style={styles.loginInfo}>
              <View style={styles.loginCard3D}> 

                <Text style={styles.loginText}>Log In</Text>
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
                <View style={{marginTop:" 3%", marginRight: "5%", alignSelf: "flex-end"}}>
                  <Link
                  href={{
                    pathname: "/auth/forgotPassword"
                  }}
                  >
                    <Text style={styles.forgotPasswordText}>Forgot password</Text>
                  </Link>
              </View>


            </View>


            {/* Display loading spinner when loading */}
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
            <Pressable style={styles.button} onPress={() => { /* Add login action */ }}>
                <Text style={styles.buttonText}>Login</Text>
            </Pressable>
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
    resizeMode: "cover",
    height: "40%", 
    width: "100%",
    position: 'absolute', 
  },

  loginInfo: {
    marginTop: "62%",
    width: "100%",
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "3%",
    paddingTop: 0,
  },

  loginText: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 0,
    marginBottom: "10%"
  },

  inputText: {
    marginTop: "5%",
    backgroundColor: "#FBF2FF",
    borderRadius: 10,
    borderColor: 'rgba(114, 17, 162, .8)',
    borderWidth: 1,
    width: "90%",
    alignSelf: "center",
    padding: 10,
    color: "#7211A2",
    shadowColor: '#C981EC',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },

  viewSignUp: {
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
    shadowColor: '#7211A2', 
    shadowOffset: {
      width: 0,
      height: 20, 
    },
    shadowOpacity: 0.3, 
    shadowRadius: 15, 
    elevation: 10, 
  },

  button: {
    backgroundColor: 'rgba(114, 17, 162, .8)',
    borderRadius: 10, 
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginTop: "10%", 
  },
  
  buttonText: {
    color: 'white', 
    fontSize: 20,
    fontWeight: 'bold',
  },
  
  forgotPasswordText: {
    color: "#7d4cb6",
    fontSize: 13,
  }
  
});

// culori:
// - #7d4cb6
// - #7211a2
// - #f0e3f6
// - #460069
