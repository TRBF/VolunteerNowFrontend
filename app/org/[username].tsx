import React, { useState } from 'react';
import { ScrollView, StyleSheet, Image, Text, View, Pressable} from 'react-native';
import {useWindowDimensions} from 'react-native';

function ExperienceSection({experience}: any){
    const {height, width} = useWindowDimensions();
    return(
        <View style = {styles.experienceSection}>
            <Image source={require("../../assets/images/image.jpg")} resizeMode='cover' style = {[styles.experienceImage, {
                height: height/12,
                width: height/12,
            }]}/>
            {/* cover pic */}
            <View style = {{width: "80%"}}>
                <View style = {styles.experienceIdentifiers}>
                    <Text style = {styles.experienceName}>{experience.name}</Text>
                    {/* name */}
                    <Text style = {styles.experienceUsername}>@{experience.username}</Text>
                    {/* username */}
                    <Text style = {styles.experienceDate}>{experience.firstVolunteered}</Text>
                    {/* date */}
                </View>
                <Text style = {styles.experienceDescription}>{experience.description}</Text>
                {/* description (shortened) */}
            </View>
        </View>
    )
}

export default function Tab() {
    let volunteerCount = 0;
    let dominantTag = 177;
    let firstVolunteered = "12/03/23";
    let hours = 1000;
    let [tab, setTab] = useState("experiences");
    let name = "Mihnea";
    let username = "tomoioaga";
    let description = "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat."

    const experienceObject = {
        name: name,
        username: username,
        firstVolunteered: firstVolunteered,
        description: description,
    }

    const diplomaObject = {
        name: name,
        username: username,
        hours: hours, 
        description: description,
    }

    return (
        <ScrollView>
            <View style = {styles.profileTopSection}>
                {/* pfp + stats (no. of volunteers, dominant tag, volunteering since) */}
                <Image source={require("../../assets/images/image.jpg")} style = {styles.profilePicture} resizeMode='cover'/>
                <View style = {styles.profileStatsSection}>
                    <View style = {styles.profileStatsSubsection}>
                        <Text style = {styles.profileStatsSubsectionText}>{volunteerCount}</Text>
                        <Text style = {styles.profileStatsSubsectionText}>x vol</Text>
                    </View>
                    <View style = {styles.profileStatsSubsection}>
                        <Text style = {styles.profileStatsSubsectionText}>{dominantTag}</Text>
                        <Text style = {styles.profileStatsSubsectionText}>most vol</Text>
                    </View>
                    <View style = {styles.profileStatsSubsection}>
                        <Text style = {styles.profileStatsSubsectionText}>{hours}</Text>
                        <Text style = {styles.profileStatsSubsectionText}>hours</Text>
                    </View>
                </View>
            </View>
            <View style = {styles.profileInfoSection}>
                <View style = {styles.identifiers}>
                    <Text style = {styles.name}>{name}</Text>
                    <Text style = {styles.username}>@{username}</Text>
                </View>
                <Text style = {styles.description}>{description}</Text>
            </View>

            <ScrollView>
                {/* past volunteering experiences */}
                <ExperienceSection experience = {{...experienceObject}}/>
                <ExperienceSection experience = {{...experienceObject}}/>
                <ExperienceSection experience = {{...experienceObject}}/>
                <ExperienceSection experience = {{...experienceObject}}/>
                <ExperienceSection experience = {{...experienceObject}}/>
                <ExperienceSection experience = {{...experienceObject}}/>
            </ScrollView>
        </ScrollView>
 );
}

const styles = StyleSheet.create({
    profileStatsSection: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "70%",
    },
    profileStatsSubsection: {
        display: "flex",
        flexDirection: "column",
    },
    profileStatsSubsectionText: {
        color: "#000000",
        fontWeight: "600",
        fontSize: 20,
        textAlign: "center",
    },
    profilePicture: {
        height: 75,
        width: 75,
        borderRadius: 50,
        marginRight: "5%",
    },
    profileTopSection: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        paddingTop: "10%",
        width: "100%",
        paddingLeft: "5%",
        paddingRight: "5%",
    },
    profileButtonSection: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        paddingTop: "5%",
        width: "100%", 
        paddingLeft: "5%",
        paddingRight: "5%",
    },
    topProfileButton: {
        width: "90%",
        margin: "auto",
        marginLeft: "5%",

        paddingTop: "6%",
        paddingBottom: "6%",

        textAlign: "center",
        borderRadius: 7,
        color: "#FFFFFF",
        backgroundColor: "#000000",
        fontWeight: "400",
    },
    profileTabSection: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        marginTop: "8%",
        height: 50, 
        borderTopWidth: 1,
        borderBottomWidth: 1,
    },
    profileTab: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
    },
    profileTabText: {
        fontSize: 15,
    },
    inactiveTab: {
        backgroundColor: "#FFFFFF",
    },
    activeTab: {
        backgroundColor: "#000000",
    },
    inactiveTabText: {
        color: "#000000",
    },
    activeTabText: {
        color: "#FFFFFF",
    },
    profileInfoSection: {
        width: "100%",
        paddingRight: "5%",
        paddingLeft: "5%",
    },
    name: {
        color: "#000000",
        fontWeight: "600",
        marginRight: "2%",
    },
    username: {
        color: "#9394a5",
    },
    description: {
        color: "#000000"
    },
    identifiers: {
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: "row",
        width: "100%",
        marginTop: "5%",
    },
    experienceSection: {
        display: "flex",
        flexDirection: "row",
        width: "100%", 
        padding: "5%",
        borderTopWidth: 0.2,
        borderBottomWidth: 0.2,
    },
    experienceImage: {
        borderRadius: 10,
        marginRight: "5%",
    },
    experienceName: {
        color: "#000000",
    },
    experienceUsername: {
        color: "#9394a5",
    },
    experienceDate: {
        color: "#000000",
    },
    experienceDescription: {
        color: "#000000",
    },
    experienceIdentifiers: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "80%",
        marginBottom: "2%",
    },
    diplomaSection: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        padding: "5%",
        borderTopWidth: 0.2,
        borderBottomWidth: 0.2,
    }
})
