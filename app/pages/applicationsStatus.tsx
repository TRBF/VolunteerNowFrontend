import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, View, Pressable, TextInput, SafeAreaView, Platform, Dimensions, Image } from 'react-native';
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import { useWindowDimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';


export default function ApplicationsStatusPage() {
    const applications = [
        { type: "pfp", name: "Untold", status: "Sent" },
        { type: "pfp", name: "Org", status: "Accepted" },
        { type: "pfp", name: "myorganisation", status: "Rejected" }
    ];


    return (
            <SafeAreaView>
                <ApplicationStatus pfp={applications[0].pfp} name={applications[0].name, status=applications[0].status}/>
            </SafeAreaView>
        );
    }

function ApplicationStatus({pfp, name, status}) {
        return(
            <Pressable style = {styles.application}>
                <Image source={require("../../assets/images/image.jpg")} style = {styles.pfp} resizeMode = "cover"/>
                <View style = {styles.container}>
                    <View style = {styles.orgInfo}>
                        <Text style = {styles.name}>{name}</Text>
                        <Text style = {styles.status}>{status}</Text>
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
            justifyContent: "flex-start",
            paddingLeft: "5%",
            paddingRight: "5%",
            paddingTop: "2%",
            paddingBottom: "2%",
        },
        pfp: {
            height: Dimensions.get('window').height/16,
            width: Dimensions.get('window').height/16,
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
        },

    })