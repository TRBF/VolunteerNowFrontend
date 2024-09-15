import {signUp} from '../get-post/add'
import React, { useEffect, useState } from "react";
import { SelectCountry } from "react-native-element-dropdown";
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
} from "react-native";
import { StyleSheet } from "react-native";
import {
  useNavigation,
  useRouter,
  useLocalSearchParams,
  Link,
} from "expo-router";

const local_data = [
  {
    value: "1",
    lable: "Male",
    // image: {
    //   uri: "https://www.vigcenter.com/public/all/images/default-image.jpg",
    // },
  },
  {
    value: "2",
    lable: "Female",
    // image: {
    //   uri: "https://www.vigcenter.com/public/all/images/default-image.jpg",
    // },
  },
  {
    value: "3",
    lable: "Other",
    // image: {
    //   uri: "https://www.vigcenter.com/public/all/images/default-image.jpg",
    // },
  },
];

export default function Register() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [fname, setFname] = React.useState("");
  const [lname, setLname] = React.useState("");
  const [country, setCountry] = useState("1");
  const ages = new Array(100).fill(0);

  const [date, setDate] = React.useState(undefined);
  const [open, setOpen] = React.useState(false);


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.mainView}>
          <Text style={styles.registerText}> Register Now </Text>
          {/* forms section */}
          <View style={styles.inputView}>
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
            <TextInput
              value={email}
              onChangeText={setEmail}
              style={styles.inputText}
              placeholder="email"
              placeholderTextColor="black"
            />
            <View style={styles.nameView}>
              <TextInput
                value={fname}
                onChangeText={setFname}
                style={styles.nameText}
                placeholder="first name"
                placeholderTextColor="black"
              />
              <TextInput
                value={lname}
                onChangeText={setLname}
                style={styles.nameText}
                placeholder="last name"
                placeholderTextColor="black"
              />
            </View>
            <View style={styles.genderAgeView}>
              <SelectCountry
                style={styles.dropdown}
                selectedTextStyle={styles.selectedTextStyle}
                placeholderStyle={styles.placeholderStyle}
                imageStyle={styles.imageStyle}
                iconStyle={styles.iconStyle}
                maxHeight={200}
                value={country}
                data={local_data}
                valueField="value"
                labelField="lable"
                imageField="image"
                placeholder="Select gender"
                //   searchPlaceholder="Search..."
                onChange={(e) => {
                  setCountry(e.value);
                }}
              />
            </View>
            <View style={styles.btnSubmitView}>
              <Pressable onPress={()=>{signUp(username, password, email, fname, lname, country, brithday)}}>
                <Text style={styles.btnSubmitText}>Register</Text>
              </Pressable>
            </View>
          </View>

          {/* redirect section */}
          <View style={styles.redirectView}>
            <Text>Already have an account?</Text>
            <Link
              href={{
                pathname: "/(tabs)/login",
              }}
            >
              <Text style={styles.btnLogin}>Login</Text>
            </Link>
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
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  registerText: {
    fontSize: 30,
    paddingBottom: 10,
    paddingTop: 50,
  },

  inputView: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
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

  nameView: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
  },

  nameText: {
    width: "43%",
    borderWidth: 1,
    height: 50,
    padding: 5,
    margin: 20,
    marginRight: 0,
    borderRadius: 5,
    color: "black",
  },

  genderAgeView: {
    display: "flex",
    // justifyContent: "center",
    alignItems: "center",
    width: "100%",
    flexDirection: "row",    
  },

  dropdown: {
    margin: 16,
    height: 50,
    width: 150,
    backgroundColor: "#EEEEEE",
    borderRadius: 22,
    paddingHorizontal: 8,
  },

  imageStyle: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 8,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },

  redirectView: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
  },

  btnSubmitView: {
    marginTop: 12,
    marginLeft: 20,
    backgroundColor: "white",
  },

  btnSubmitText: {
    color: "#7d4cb6",
    fontSize: 15,
    paddingTop: 10,
  },

  btnLogin: {
    paddingTop: 20,
    color: "#7d4cb6",
  },
});
