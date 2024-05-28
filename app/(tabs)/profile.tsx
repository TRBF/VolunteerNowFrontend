import React, { useState } from 'react';
import { ScrollView, StyleSheet, Image, Text, View, Pressable, ImageBackground} from 'react-native';
import {useWindowDimensions} from 'react-native';
import events from "../../data/events"

function ExperienceSection({experience}: any){
    const {height, width} = useWindowDimensions();
    return(
        <View style = {styles.experienceSection}>
            <Image source={{uri: experience.profilePicture}} resizeMode='cover' style = {[styles.experienceImage, {
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
                    <Text style = {styles.experienceDate}>{experience.timePosted}</Text>
                    {/* date */}
                </View>
                <Text style = {styles.experienceDescription}>{experience.content}</Text>
                {/* description (shortened) */}
            </View>
        </View>
    )
}

function DiplomaSection({diploma}: any){
    const {height, width} = useWindowDimensions();
    return(
        <View style = {styles.diplomaSection}>
            <Image source={require("../../assets/images/image.jpg")} resizeMode='cover' style = {[styles.experienceImage, {
                height: height/12,
                width: height/12,
            }]}/>
            <Image source={require("../../assets/images/image.jpg")} resizeMode='cover' style = {[styles.experienceImage, {
                height: height/2,
                width: height/3.2,
            }]}/>
        </View>
    )
}

export default function ProfileScreen() {
    let volunteerCount = 10;
    let dominantTag = 'reîmpădurire';
    let firstVolunteered = "12/03/23";
    let hours = 1000;
    let [tab, setTab] = useState("experiences");
    let name = "Popescu David";
    let username = "davidpop";
    let description = "Sunt Popescu David, un voluntar dedicat care își pune toată energia și pasiunea în sprijinul comunității. Îmi place să mă implic în diverse proiecte, de la organizarea campaniilor de strângere de fonduri până la acțiuni ecologice, cum ar fi plantarea de copaci. Pentru mine, voluntariatul nu este doar o activitate, ci un mod de a contribui la binele comun și de a face o diferență reală în viețile celor din jur."
    let imageLink = "https://www.workitdaily.com/media-library/proud-volunteer-points-to-his-shirt.jpg?id=27028413&width=1200&height=800&quality=85&coordinates=0%2C0%2C0%2C0"


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
            <ImageBackground source = {require("../../assets/images/backgroundlight.jpeg")}  resizeMode='cover' style = {{flex: 1}}>
                <View style = {styles.profileTopSection}>
                    {/* pfp + stats (no. of volunteers, dominant tag, volunteering since) */}
                    <Image source={{uri: imageLink}} style = {styles.profilePicture} resizeMode='cover'/>
                    <View style = {styles.profileStatsSection}>
                        <View style = {styles.profileStatsSubsection}>
                            <Text style = {styles.profileStatsSubsectionText}>{dominantTag}</Text>
                            <Text style = {styles.inactive}>mostly</Text>
                        </View>
                        <View style = {styles.profileStatsSubsection}>
                            <Text style = {styles.profileStatsSubsectionText}>{volunteerCount}</Text>
                            <Text style = {styles.inactive}>times</Text>
                        </View>
                        <View style = {styles.profileStatsSubsection}>
                            <Text style = {styles.profileStatsSubsectionText}>{hours}</Text>
                            <Text style = {styles.inactive}>hours</Text>
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
                <View style = {styles.profileButtonSection}>
                    <Pressable style = {{width: "50%"}}>
                        <Text style = {styles.topProfileButton}>Edit profile</Text>
                    </Pressable>
                        {/* edit profile */}
                    <Pressable style = {{width: "50%"}}>
                        <Text style = {styles.topProfileButton}>Share profile</Text>
                    </Pressable>
                        {/* share profile */}
                </View>
                
                {/* make them some kind of tabs */}

                <View style = {styles.profileTabSection}>
                    <Pressable onPress = {() => {setTab("experiences"); console.log(tab);}} style = {{width: "50%"}}>
                        <View style = {[styles.profileTab, tab == 'experiences' ? styles.activeTab : styles.inactiveTab]}>
                            <Text style = {[styles.profileTabText, tab == 'experiences' ? styles.activeTabText : styles.inactiveTabText]}>Past experiences</Text>
                        </View>
                    </Pressable>
                    <Pressable onPress = {() => {setTab("diplomas"); console.log(tab);}} style = {{width: "50%"}}>
                        <View style = {[styles.profileTab, tab == 'diplomas' ? styles.activeTab : styles.inactiveTab]}>
                            <Text style = {[styles.profileTabText, tab == 'diplomas' ? styles.activeTabText : styles.inactiveTabText]}>Diplomas</Text>
                        </View>
                    </Pressable>
                </View>

                <ScrollView style = {{display: tab == 'experiences' ? "flex" : "none"}}>
                    {/* past volunteering experiences */}
                    {events.map((experience) => <ExperienceSection experience = {{...experience}}/>)}
                </ScrollView>
                <ScrollView style = {{display: tab == 'diplomas' ? "flex" : "none"}}>
                    {/* diplomas */}
                    <DiplomaSection diploma = {{...diplomaObject}}/>
                    <DiplomaSection diploma = {{...diplomaObject}}/>
                    <DiplomaSection diploma = {{...diplomaObject}}/>
                    <DiplomaSection diploma = {{...diplomaObject}}/>
                    <DiplomaSection diploma = {{...diplomaObject}}/>
                </ScrollView>
            </ImageBackground>
        </ScrollView>
 );
}

const styles = StyleSheet.create({
    inactive: {
        color: "#050505",
        fontSize: 15,
        flexWrap: "wrap",
        flexShrink: 1,
        width: "100%",
        textAlign: "center",
    },
    profileStatsSection: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "70%",
    },
    profileStatsSubsection: {
        display: "flex",
        flexDirection: "column",
        marginLeft: "8%",
    },
    profileStatsSubsectionText: {
        color: "#000000",
        fontWeight: "600",
        fontSize: 18,
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
        backgroundColor: "#fff",
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
        backgroundColor: "#fff"
    }
})
