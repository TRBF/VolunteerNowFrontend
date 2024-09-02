import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView, Image, ImageBackground, Dimensions } from 'react-native';
import { Link } from 'expo-router'
import companies from '../../data/companies';
import {useWindowDimensions} from 'react-native';
import events from "../../data/events"
import { SafeAreaView } from 'react-native-safe-area-context';

let notificationsAsc = events.map((x)=>(x));
let notificationsDesc = events.map((x)=>(x));


notificationsAsc.sort((a, b) => b.date - a.date);
notificationsDesc.sort((a, b) => a.date - b.date);

function Notification({notification}:any){
    const postDate = new Date(notification.date)
    return(
        <Pressable style = {styles.notification}>
            <Image source = {{uri: notification.profilePicture}} style = {styles.notificationPFP} resizeMode = "cover"/>
            <View style = {styles.notificationInfo}>
                <View style = {styles.orgInfo}>
                    <Text style = {styles.notificationName}>{notification.name}</Text>
                    <Text style = {styles.notificationUsername}>{notification.username}</Text>
                </View>
                <Text style = {styles.notificationDate}>{postDate.toLocaleDateString()}</Text>
            </View>
        </Pressable>
    ) 
}


const Tab = () => {
    const [tab, setTab] = useState("unread");

    return(
        <View style = {{height: "100%", backgroundColor: "#ffffff"}}>
            <SafeAreaView style = {{backgroundColor: "#ffffff"}}>
                <ScrollView style = {styles.mainSection}>
                    <View style = {styles.header}>
                        <Pressable onPress = {() => setTab("unread")} style = {[styles.tabButton, tab=="unread" ? styles.tabActive : styles.tabInactive]}><Text style = {styles.tabButtonText}>Unread</Text></Pressable>
                        <Pressable onPress = {() => setTab("read")} style = {[styles.tabButton, tab=="read" ? styles.tabActive : styles.tabInactive]}><Text style = {styles.tabButtonText}>Read</Text></Pressable>
                    </View>
                    {
                        tab=="unread" ? 
                        <ScrollView style = {styles.notificationsSection}>
                                {notificationsAsc.map((notification:any) => <Notification notification = {notification}/>)}
                        </ScrollView>
                        :
                        <ScrollView style = {styles.notificationsSection}>
                                {notificationsDesc.map((notification:any) => <Notification notification = {notification}/>)}
                        </ScrollView>
                    }
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    whitebg: {
        backgroundColor: "white",
    },
    mainSection: {
        backgroundColor: "white"
    },
    exploreText: {
        width: "100%",
        height: "100%",
        textAlign: "center",
        paddingTop: "40%",
        paddingLeft: "10%",
        paddingRight: "10%",
        fontSize: 18, 
        fontWeight: "300",
        backgroundColor: "#FFF",
    },
    profilePicture: {
        width: 100,
        height: 100,
    },
    notificationsSection: {
        height: "100%",
    },
    notification: {
        display: "flex",
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-start",
        paddingLeft: "5%",
        paddingRight: "5%",
        paddingTop: "2%",
        paddingBottom: "2%",
        // borderBottomWidth: 0.2,
    },
    notificationPFP: {
        height: Dimensions.get('window').height/16,
        width: Dimensions.get('window').height/16,
        marginRight: "5%",
        borderRadius: 50,
    },
    notificationName: {
        color: "#000",
        fontWeight: "600",
        fontSize: 15,
    },

    notificationUsername: {
    },
    
    notificationInfo: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "80%",
    },
    orgInfo: {
        display: "flex",
        flexDirection: "column",
    },
    notificationDate: {
    },
    header: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: 50,
        width: "100%",
        marginBottom: "5%",
    },
    tabActive: {
        borderBottomColor: "#7211A2"
    },
    tabInactive: {
        borderBottomColor: "#fff"
    },
    filterButton: {

    }, 
    tabButton: {
        width:"50%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 3,
        paddingTop: "3%",
        paddingBottom: "3%",
    },
    tabButtonText: {
        textAlign: "center",
        color: "#7211A2",
        fontWeight: "600",
    }

    
}) 



export default Tab;
