import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView, Image, Dimensions, Platform, StatusBar } from 'react-native';
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';


function verticalUnits (num:number){
    const height = Dimensions.get("window").height;
    return height/100*num;
}

function horizontalUnits (num:number){
    const width = Dimensions.get("window").width;
    return width/100*num;
}

function Callout({ callout }) {

    const startDate: Date = callout.startDate;  

    return (
        <View style={styles.calloutSection}>
            <View style={{flexDirection: "column", alignItems: "flex-start", justifyContent: "center"}}>
                <Image source={{uri:"https://yt3.googleusercontent.com/v6i9aPzHM2BA6oIOGA-k3vsUxpeeQpl3qM9PCgYyQeqkoXQ-83byoLYCV5jaOAx4GHhfW7NjVg=s160-c-k-c0x00ffffff-no-rj"}} resizeMode='cover' style={[styles.calloutImage, {
                    height: verticalUnits(8.3),
                    width: verticalUnits(8.3),
                }]} />
            </View>

            <View style={{ width: "76%" }}>
                <View style={styles.calloutIdentifiers}>
                    <Text style={styles.calloutName}>{callout.name}</Text>
                    <Text style={styles.calloutUsername}>@{callout.username}</Text>
                </View>
                <Text style={styles.calloutDescription}>{callout.description}</Text>
            </View>
        </View>
    );
}

const Tab = () => {

    const [sendDate, setSendDate] = useState(new Date());

    const callouts = [
          {
              name: "Untold",
              username: "untold",
              description: "This is a test event, this event is obviously and test and should not be used as anything but a test, it is a test event, got it?",
              startDate: sendDate,
              days: 5,
          }, 
          {
              name: "Untold",
              username: "untold",
              description: "This is a test event, this event is obviously and test and should not be used as anything but a test, it is a test event, got it?",
              startDate: sendDate,
              days: 5,
          },
          {
              name: "Untold",
              username: "untold",
              description: "This is a test event, this event is obviously and test and should not be used as anything but a test, it is a test event, got it?",
              startDate: sendDate,
              days: 5,
          },
          {
              name: "Untold",
              username: "untold",
              description: "This is a test event, this event is obviously and test and should not be used as anything but a test, it is a test event, got it?",
              startDate: sendDate,
              days: 5,
          },
    ]

    return(
        <View style = {{height: "100%", backgroundColor: "#ffffff"}}>
            <SafeAreaView style = {{backgroundColor: "#ffffff"}}>
                <ScrollView>

                    <View style = { styles.header }>
                        <Text style = { styles.headerTitle }>Callouts</Text>
                    </View>

                    <ScrollView style = {{width: "100%"}} contentContainerStyle = {{flexDirection:"column", alignItems: "center"}}>
                            {callouts.map((callout:any) => <Callout callout = {callout}/>)}
                            <View style = {{height: verticalUnits(10), width: "100%"}}></View>
                    </ScrollView>

                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    icon:{
        fontSize: 20,
        paddingHorizontal: '1%',
    },
    header: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffffff",
        height: verticalUnits(6),
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    backIcon: {
        fontSize: 30,
    },
    calloutSection: {
        display: "flex",
        flexDirection: "row",
        width: "94%",
        paddingHorizontal: "3%",
        paddingVertical: verticalUnits(1.5),
        marginTop: verticalUnits(1),
        borderRadius: 15,
        backgroundColor: "#FFFFFF",
        shadowColor: '#0000000',
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    calloutImage: {
        borderRadius: 10,
        marginRight: "5%",
        marginBottom: "12%",
    },
    calloutName: {
        color: "#000000",
    },
    calloutUsername: {
        color: "#9394a5",
    },
    calloutDate: {
        color: "#9394a5",
        fontSize: 12,
        //marginLeft: "5%",
        width: "80%",
        textAlign: "center",
    },
    calloutDescription: {
        color: "#000000",
    },
    calloutIdentifiers: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "80%",
        marginBottom: "2%",
    },
}) 



export default Tab;
