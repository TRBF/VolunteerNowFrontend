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
  SafeAreaView,
} from "react-native";
import { StyleSheet } from "react-native";
import {
  useNavigation,
  useRouter,
  useLocalSearchParams,
  Link,
} from "expo-router";
import { Button } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';

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

  const navigation = useNavigation();
  const router = useRouter();
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const [date, setDate] = React.useState(new Date());
  const [open, setOpen] = React.useState(false);

  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = React.useCallback(
    (params) => {
      setOpen(false);
      setDate(params.date);
    },
    [setOpen, setDate]
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
              <Image
            style={styles.bgImage}
            source={require("../../assets/images/wave2nologo.png")}
          />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.mainView}>

          <Text style={styles.registerText}> Register </Text>
          {/* forms section */}
          <View style={styles.inputView}>
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
              <SafeAreaView>
                <SafeAreaProvider>
                  <View
                    style={{
                      justifyContent: "center",
                      flex: 1,
                      alignItems: "center",
                    }}
                  >
                    <Button
                      onPress={() => setOpen(true)}
                      uppercase={false}
                      mode="outlined"
                    >
                      Pick your birhday
                    </Button>
                    <View style={{}}>
                      <DatePickerModal
                        locale="en"
                        mode="single"
                        visible={open}
                        onDismiss={onDismissSingle}
                        date={date}
                        onConfirm={onConfirmSingle}
                        presentationStyle='pageSheet'
                        startYear={(new Date()).getFullYear()-100}
                        endYear={(new Date()).getFullYear()}
                      />
                    </View>
                  </View>
                </SafeAreaProvider>
              </SafeAreaView>
            </View>

            <View style={styles.button}>
              <Pressable onPress={()=>{signUp(username, password, email, fname, lname, country == "1" ? "Male" : (country == "2" ? "Female" : "Other"), Math.floor(date.getTime() / 1000) + 1).then(result => {
                if(result.success) router.back();
                else alert("Error signing up: " + result.error);
              })}}>
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
    paddingHorizontal: "3%",
    paddingVertical: "5%",
  },
  registerText: {
    fontSize: 40,
    fontWeight: "bold",
    paddingBottom: 10,
    paddingTop: 50,
    color: 'rgba(114, 17, 162, .8)',
  },

  inputView: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    backgroundColor: "white",
    paddingVertical: "10%",
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

  bgImage: {
    resizeMode: "cover",
    height: "40%",
    width: "100%",
    position: 'absolute',
    zIndex: -1, // Add this line
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

  nameView: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around"

  },

  nameText: {
    marginTop: "5%",
    backgroundColor: "#FBF2FF",
    borderRadius: 10,
    borderColor: 'rgba(114, 17, 162, .8)',
    borderWidth: 1,
    width: "40%",
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

  genderAgeView: {
    marginTop: "5%",
    display: "flex",
    // justifyContent: "center",
    alignItems: "center",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  dropdown: {
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

  container2: {
    flex: 1,
    backgroundColor: "#F5FCFF",
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
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },

  btnLogin: {
    paddingTop: 20,
    color: "#7d4cb6",
  },
  button: {
    backgroundColor: 'rgba(114, 17, 162, .8)',
    borderRadius: 10, 
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: "10%", 
    fontWeight: "bold",
    fontSize: 20,
    alignSelf: "center",
    width: "30%"
  },
});
