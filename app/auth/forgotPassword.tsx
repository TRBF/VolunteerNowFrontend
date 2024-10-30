import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable, Image, SafeAreaView, useWindowDimensions, Platform, KeyboardAvoidingView, Dimensions, StatusBar } from "react-native";
import { StyleSheet } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

function verticalUnits (num:number){
    const height = Dimensions.get("window").height;
    return height/100*num;
}

export default function forgotPassword() {

    const navigation = useNavigation();
    const router = useRouter();
    const params = useLocalSearchParams();
    const { usernameH, firstNameH, secondNameH, descriptionH } = params;
    useEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const { height, width } = useWindowDimensions();


    const [email, setEmail] = useState("");
    const [submit, setSubmit] = useState(false);

    const verifyEmailExists = () => {
        const bool = email.length != 0 ? true : false;
        return bool;
    }

    return (
        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} 
    >
        <SafeAreaView style={styles.mainView}>
            
                <View style={styles.header}>

                    <Pressable onPress={() => { router.back() }}>
                        <Ionicons name='chevron-back' style={[{ color: "#fff" }, styles.backIcon]} />
                    </Pressable>


                </View>
                <View style={styles.informationContainer}>
                    <Text style={{fontSize: 20, fontWeight: "bold", marginLeft: "5%"}}>Enter your email</Text>
                    <TextInput
                            value={email}
                            onChangeText={setEmail}
                            style={styles.inputText}
                            placeholder="email"
                            placeholderTextColor="black"
                    />
                    <Pressable onPress={() => {setSubmit(verifyEmailExists())}}>
                        <Text style={styles.sendText}>Send</Text>
                    </Pressable>
                        {submit && <Text style={{alignSelf: "center", color: "green", fontStyle: "italic"}}>Email has been sent!</Text>}
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}

const styles =StyleSheet.create({
    mainView: {
        flex: 1,
        width: "100%",
        height: "100%",
        flexDirection: "column",
        backgroundColor: "#ffffff"
      },
    inputText: {
        marginTop: "5%",
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
        shadowRadius: 3,
        elevation: 5,
    },
    sendText: {
        color: "#7d4cb6",
        fontSize: 15,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignSelf: "flex-end",
        marginRight: "8%",
        marginTop: "2%",
      },
    bgImage: {
        resizeMode: "cover",
        height: "40%", 
        width: "100%",
        position: 'absolute', 
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    header: {
        width: "100%",
        height: verticalUnits(12),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: "4%",
        backgroundColor: 'rgba(114, 17, 162, .7)',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        zIndex: 10,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "333"
    },
    backIcon: {
        fontSize: 30,
    },

    informationContainer:{
        marginVertical: verticalUnits(7)
    }
});