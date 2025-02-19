import { signUp } from '../../apistuff/logsign';
import React, { useEffect, useState } from "react";
import { SelectCountry } from "react-native-element-dropdown";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Pressable,
  SafeAreaView,
} from "react-native";
import {
  useNavigation,
  useRouter,
} from "expo-router";
import { Button } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { styles } from '../../styles/register';

const local_data = [
  { value: "1", lable: "Male" },
  { value: "2", lable: "Female" },
  { value: "3", lable: "Other" },
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
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
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
                  placeholder="First Name"
                  placeholderTextColor="black"
                />
                <TextInput
                  value={lname}
                  onChangeText={setLname}
                  style={styles.nameText}
                  placeholder="Last Name"
                  placeholderTextColor="black"
                />
              </View>
              <TextInput
                value={username}
                onChangeText={setUsername}
                style={styles.inputText}
                placeholder="Username"
                placeholderTextColor="black"
              />
              <TextInput
                value={password}
                onChangeText={setPassword}
                style={styles.inputText}
                placeholder="Password"
                secureTextEntry={true}
                placeholderTextColor="black"
              />
              <TextInput
                value={email}
                onChangeText={setEmail}
                style={styles.inputText}
                placeholder="Email"
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
                        Pick your birthday
                      </Button>
                      <View>
                        <DatePickerModal
                          locale="en"
                          mode="single"
                          visible={open}
                          onDismiss={onDismissSingle}
                          date={date}
                          onConfirm={onConfirmSingle}
                          presentationStyle="pageSheet"
                          startYear={new Date().getFullYear() - 100}
                          endYear={new Date().getFullYear()}
                        />
                      </View>
                    </View>
                  </SafeAreaProvider>
                </SafeAreaView>
              </View>

              <View style={styles.button}>
                <Pressable
                  onPress={() => {
                    signUp(
                      username,
                      password,
                      email,
                      fname,
                      lname,
                      country == "1"
                        ? "Male"
                        : country == "2"
                        ? "Female"
                        : "Other",
                        date
                    ).then((result) => {
                      if (result) 
                        router.navigate("(tabs)/profile");
                      else 
                        alert("Error signing up.");
                    });
                  }}
                >
                  <Text style={styles.btnSubmitText}>Register</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      <View style={styles.redirectView}>
        <Text style={{fontSize: 15}}>Already have an account?</Text>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.btnLogin}>Login</Text>
        </Pressable>
      </View>
    </>
  );
}

