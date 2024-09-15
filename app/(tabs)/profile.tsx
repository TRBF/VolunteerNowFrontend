import React, { useState } from 'react';
import { ScrollView, StyleSheet, Image, Text, View, Pressable, SafeAreaView, Platform, StatusBar } from 'react-native';
import ExperienceSection from './experiences';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, router } from 'expo-router';
import { useRoute } from 'expo-router';
import { useWindowDimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { differenceInYears } from 'date-fns';



export default function ProfileScreen() {
    let volunteerCount = 3;
    let dominantTag = 8;
    let firstVolunteered = "12/03/23";
    let hours = "Untold";
    let name = "Mihnea";
    let lastName = "Bobo"
    let username = "tomoioaga";
    let description = "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.";
    let gender = "male";
    let birthday = '08/07/2006'

    const startDate = new Date('2006-07-08');
    const endDate = new Date();
    const yearsDifference = differenceInYears(endDate, startDate);

    const { height, width } = useWindowDimensions();


    const experienceObject = {
        name: name,
        username: username,
        firstVolunteered: firstVolunteered,
        description: description,
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white"}}>
          <View style = {[{height: height/100*10}, styles.header]}>
              <Link href={{
                        pathname: 'pages/settingsUser'
                    }}
                >
                    <FontAwesome name={'cog'} style={[{ color: '#9394a5' }, styles.icon]} />
                </Link>
              <Text style = { styles.headerTitle }>@{ username }</Text>
                  <View style={{ flexDirection: "row", justifyContent: "flex-end"}}>
                      <Link
                          href={{
                              pathname: 'pages/editProfile',
                              params: { username: username, name: name, description: description }
                          }}
                      >
                          <FontAwesome name={'edit'} style={[{ color: '#9394a5'}, styles.icon]} />
                      </Link>
                  </View>
          </View>
            <ScrollView style={{ flex: 1}}>
              <View style={styles.circlePfp}></View>
                <View style={styles.profileTopSection}>
                    <View style={styles.containerPfp}>
                        <Image source={require("../../assets/images/image.jpg")} style={styles.profilePicture} resizeMode='cover' />
                    </View>
                    {/* pfp + stats (no. of volunteers, dominant tag, volunteering since) */}
                    <View style={{ flexDirection: "row" }}>
                        <View style={styles.profileStatsSection}>
                            <View style={styles.profileStatsSubsection}>
                                <Text style={styles.profileStatsSubsectionText}>{volunteerCount}</Text>
                                <Text style={styles.profileStatsSubsectionTextV2}>participations</Text>
                            </View>
                            <View style={styles.profileStatsSubsection}>
                                <Text style={styles.profileStatsSubsectionText}>{dominantTag}</Text>
                                <Text style={styles.profileStatsSubsectionTextV2}>diplomas</Text>
                            </View>
                            <View style={styles.profileStatsSubsection}>
                                <Text style={styles.profileStatsSubsectionText}>{hours}</Text>
                                <Text style={styles.profileStatsSubsectionTextV2}>most frequented</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.profileInfoSection}>
                    <View style={styles.identifiers}>
                        <Text style={styles.name}>{name}</Text>
                        <Text style={styles.name}>{lastName}</Text>
                    </View>
                    <Text style={styles.description}>{description}</Text>
                </View>

                <View style={{ flexDirection: "row", justifyContent: 'space-around', alignItems: 'space-around', paddingTop: "10%" }}>
                        <View style={styles.profileStatsSection}>
                            <View style={styles.profileStatsSubsection}>
                                <Text style={styles.profileStatsSubsectionTextV4}>Age</Text>
                                <Text style={styles.profileStatsSubsectionTextV3}>{yearsDifference}</Text>
                            </View>
                            <View style={styles.profileStatsSubsection}>
                                <Text style={styles.profileStatsSubsectionTextV4}>Gender</Text>
                                <Text style={styles.profileStatsSubsectionTextV3}>{gender}</Text>
                            </View>
                        </View>
                    </View>


                {/* make them some kind of tabs */}
                <Text style={styles.recentEventText}>Most recent event</Text>
                <ExperienceSection experience={experienceObject} />
                <Pressable>
                    <Text style={styles.seeAllText}>See all</Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    profileStatsSection: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
    },
    profileStatsSubsection: {
        display: "flex",
        flexDirection: "column",
        width: "33%",
        marginBottom: "5%",
    },
    profileStatsSubsectionText: {
        color: "#000000",
        fontWeight: "600",
        fontSize: 20,
        textAlign: "center",
        flexWrap: "wrap",
    },
    profileStatsSubsectionTextV2: {
        color: 'rgba(114, 17, 162, .7)',
        fontWeight: "800",
        fontSize: 14,
        textAlign: "center",
        flexWrap: "wrap",
    },
    profileStatsSubsectionTextV3: {
        color: "#000000",
        fontWeight: "800",
        fontSize: 14,
        textAlign: "center",
        flexWrap: "wrap",
    },
    profileStatsSubsectionTextV4: {
        color: 'rgba(114, 17, 162, .7)',
        fontWeight: "600",
        fontSize: 20,
        textAlign: "center",
        flexWrap: "wrap",
    },
    profilePicture: {
        height: 125,
        width: 125,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "5%",
    },
    circlePfp: {
        backgroundColor: 'rgba(114, 17, 162, .7)',
        width: "100%",
        position: "absolute",
        height: 100,
        top: 0,
        left: 0,
    },
    containerPfp: {
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        elevation: 10,
        marginBottom: "5%",
        borderRadius: 100,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    profileTopSection: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
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
        borderRadius: 15,
        color: "#FFFFFF",
        backgroundColor: 'rgba(114, 17, 162, .7)',
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
        width: "90%",
        padding: "5%",
        borderTopWidth: 0.2,
        borderBottomWidth: 0.2,
    },
    recentEventText: {
        fontSize: 24,
        fontWeight: "semibold",
        marginLeft: "3%",
    },
    seeAllText: {
        fontWeight: "800",
        textDecorationLine: "underline",
        marginLeft: "3%",
        marginTop: "2%",
        color: 'rgba(114, 17, 162, .8)',
    },
    icon:{
        fontSize: 20,
        paddingHorizontal: '1%',
        },
        header: {
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: "4%",
            paddingRight: "6%",
            backgroundColor: "#ffffff",
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, // Adjusts for the status bar on Android
        },
        headerTitle: {
            fontSize: 16,
            fontWeight: "bold",
            paddingLeft: "3%",
        },
        backIcon: {
            fontSize: 30,
        },
})
