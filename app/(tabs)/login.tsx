import React from "react";
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
  ActivityIndicator 
} from "react-native";
import { StyleSheet } from "react-native";
import { login } from "../get-post/add";

export default function Login() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false); // To track the loading state

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
        // Navigate to another screen if necessary
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
        <View style={styles.mainView}>
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
              <View style={styles.btnContainer}>
                <Button title="Submit" onPress={handleLogin} />
              </View>
            )}
            
            <Image
              style={styles.bgImage}
              source={require("../../assets/images/wave2.png")}
            />
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
    backgroundColor: '#FFFFFF',
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

  btnContainer: {
    backgroundColor: "white",
    marginTop: 12,
  },
});
