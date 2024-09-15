import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, Pressable, Image, SafeAreaView, Platform, StatusBar, KeyboardAvoidingView, Keyboard } from 'react-native';
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import { useWindowDimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as DocumentPicker from 'expo-document-picker';
import {modify_Profile} from '../get-post/add'
import { lastDayOfMonth } from 'date-fns';

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
    const [gender, setGender]=useState(genderH)
    const [password, setPassword]=useState(passwordH)

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
                            <EditBar value={gender} setValue={setGender} title={"Gender"} />
                        </View>
                    </View>

                    <View style={styles.buttonContainer}>
                        <Pressable style={styles.button} onPress={async () => { await modify_Profile(username, firstName, secondName, description, gender); router.back() }}>
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
    container: {
        padding: 20,
    },
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
});
