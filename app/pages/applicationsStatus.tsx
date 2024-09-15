import React, { useState, useEffect} from 'react'
import { ScrollView, StyleSheet, Text, View, Pressable, TextInput, SafeAreaView, Platform, Dimensions, Image, StatusBar } from 'react-native';
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import { useWindowDimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';


export default function ApplicationsStatusPage() {
    const applications = [
        { type: "pfp", name: "Untold", status: "Sent" },
        { type: "pfp", name: "Org", status: "Accepted" },
        { type: "pfp", name: "myorganisation", status: "Rejected"},
        { type: "pfp", name: "VolunteerNow", status: "In Review"}
    ];

    const postDate = new Date();
    const { width, height } = useWindowDimensions();

    const navigation = useNavigation();
    const router = useRouter();
    useEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    return (
            <SafeAreaView style={{backgroundColor: "#fff", flex: 1}}>
                <View style={[styles.header, { height: height / 100 * 12, marginBottom: "3%" }]}>
                    <Pressable onPress={() => { router.back() }}>
                        <Ionicons name='chevron-back' style={[{ color: "#9394a5" }, styles.backIcon]} />
                    </Pressable>
                    <Text style={styles.headerTitle}>Active Aplications</Text>
                </View>
                {applications.map((application) =>
                        <ApplicationStatus pfp={application.pfp} name={application.name} status={application.status} date={postDate}/>
                    )}
            </SafeAreaView>
        );
    }



function ApplicationStatus({pfp, name, status, date}) {
        return(
            <Pressable style = {styles.application}>
                <Image source={require("../../assets/images/image.jpg")} style = {styles.pfp} resizeMode = "cover"/>
                <View style = {styles.container}>
                    <View style = {styles.orgInfo}>
                        <Text style = {styles.name}>{name}</Text>
                        <Text style = {styles.status}>{status}</Text>
                    </View>
                    <View style={{justifyContent: "flex-end", alignItems: "center"}}>
                        <Text style={{color: "#bfbfbf"}}>Sent on</Text>
                        <Text style = {{color: "#bfbfbf"}}>{date.toLocaleDateString()}</Text>
                    </View>
                </View>
            </Pressable>
        )
    }

const styles = StyleSheet.create({
        application: {
            display: "flex",
            width: "100%",
            flexDirection: "row",
            justifyContent: "flex-center",
            alignItems: "center",
            paddingLeft: "5%",
            paddingRight: "5%",
            paddingTop: "2%",
            paddingBottom: "5%",
            paddingTop: "5%",
            borderBottomWidth: 0.6,
            borderBottomColor: "#bfbfbf"
        },
        pfp: {
            height: Dimensions.get('window').height/14,
            width: Dimensions.get('window').height/14,
            marginRight: "5%",
            borderRadius: 50,
        },
        name: {
            color: "#000",
            fontWeight: "600",
            fontSize: 15,
        },

        status: {
            color: '#F194FF',
        },

        container: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "80%",
        },
        orgInfo: {
            display: "flex",
            flexDirection: "column",
            alignItems: "start"
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

    })