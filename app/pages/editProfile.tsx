import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, Pressable, Image, SafeAreaView, Platform, StatusBar, KeyboardAvoidingView, Keyboard } from 'react-native';
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import { useWindowDimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as DocumentPicker from 'expo-document-picker';
import {modify_Profile} from '../get-post/add'
import { lastDayOfMonth } from 'date-fns';
import {signUp} from '../get-post/add'
import { SelectCountry } from "react-native-element-dropdown";
import { Button } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import { SafeAreaProvider } from "react-native-safe-area-context";
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

export default function EditProfileScreen() {
    const navigation = useNavigation();
    const router = useRouter();
    const params = useLocalSearchParams();
    const { usernameH, firstNameH, secondNameH, descriptionH, genderH, passwordH } = params;
    useEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const { height, width } = useWindowDimensions();

    const [username, setUsername] = useState(usernameH)
    const [firstName, setFirstName] = useState(firstNameH)
    const [secondName, setSecondName] = useState(secondNameH)
    const [description, setDescription] = useState(descriptionH)
    const [country, setCountry] = useState("1")

    function getDocument(){
        DocumentPicker.getDocumentAsync({type: "image/*", multiple: false}).then(result => {
            console.log(result.assets);
        });
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // Adjust this value as needed
        >
            <SafeAreaView style={{ flex: 1 }}>
                <View style={[styles.header, { height: height / 100 * 12 }]}>
                    <Pressable onPress={() => { router.back() }}>
                        <Ionicons name='chevron-back' style={[{ color: "#9394a5" }, styles.backIcon]} />
                    </Pressable>
                    <Text style={styles.headerTitle}>Edit Profile</Text>
                </View>
                <ScrollView style={{paddingHorizontal: "5%"}}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: 'https://via.placeholder.com/150' }}
                            style={styles.profileImage}
                        />
                        <Pressable onPress={() => { getDocument() }}>
                            <Text style={styles.modifyButtonText}>Change Profile Image</Text>
                        </Pressable>
                    </View>

                    <View style={styles.container}>
                        <View style={styles.nameRow}>
                            <View style={styles.nameField}>
                                <EditBar value={firstName} setValue={setFirstName} title={"First Name"} />
                            </View>
                            <View style={styles.nameField}>
                                <EditBar value={secondName} setValue={setSecondName} title={"Last Name"} />
                            </View>
                        </View>

                        <View style={styles.editContainer}>
                            <EditBar value={username} setValue={setUsername} title={"Username"} />
                        </View>
                        <EditBar value={description} setValue={setDescription} title={"Description"} numberOfLines={6} />
                        <View style={styles.editContainer}>
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
                        }}></SelectCountry>
                        </View>

                    </View>

                    <View style={styles.buttonContainer}>
                        <Pressable style={styles.button} onPress={async () => { await modify_Profile(username, firstName, secondName, description, country); router.back(), alert("Ai dat save deja homalaule") }}>
                            <Text style={styles.topProfileButton}>Save</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}

function EditBar({ value, setValue, title, numberOfLines = 1 }) {
    return (
        <View>
            <Text style={styles.title}>{title}</Text>
            <TextInput
                value={value}
                onChangeText={(text) => setValue(text)}
                placeholder={title}
                style={[
                    styles.textInput,
                    numberOfLines > 1 ? { textAlignVertical: 'top' } : null, // Apply textAlignVertical only if numberOfLines > 1
                    { backgroundColor: '#ffffff' }
                ]}
                selectionColor="#C981EC"
                multiline={true}
                numberOfLines={numberOfLines}
            />
        </View>
    );
}



const styles = StyleSheet.create({
    
    nameRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    nameField: {
        width: "48%",
    },
    editContainer: {
        marginVertical: "5%",
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 5,
    },
    textInput: {
        borderRadius: 8,
        width: "100%",
        padding: 10,
        borderColor: "#ddd",
        borderWidth: 1,
        color: "#000000",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        padding: 10,
    },
    button: {
        marginTop: "8%",
        width: "32%",
    },
    topProfileButton: {
        width: "100%",
        paddingVertical: 10,
        textAlign: "center",
        borderRadius: 15,
        color: "#FFFFFF",
        backgroundColor: '#C981EC',
        fontWeight: "400",
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 125,
        height: 125,
        borderRadius: 75,
        backgroundColor: '#ccc',
        marginTop: "5%",
    },
    modifyButtonText: {
        color: '#C981EC',
        fontWeight: '500',
        marginTop: 10,
    },
    header: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: "4%",
        paddingRight: "6%",
        backgroundColor: "#ffffff",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    backIcon: {
        fontSize: 30,
    },
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
        color: "#7d4cb6",
        fontSize: 15,
        paddingTop: 10,
      },
    
      btnLogin: {
        paddingTop: 20,
        color: "#7d4cb6",
      },
});
