import React, { useState } from 'react';
import { ScrollView, StyleSheet, Image, Text, View, Pressable, KeyboardAvoidingView, Modal, Keyboard } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import { Link, router } from 'expo-router';
import { useWindowDimensions } from 'react-native';
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

function ExperienceSection({ experience }) {
    const { height, width } = useWindowDimensions();
    const [visible, setVisible] = useState(true);

    return (
           <View style={styles.experienceSection}>
               <View style={{flexDirection: "column", alignItems: "baseline"}}>
                   <Image source={require("../../assets/images/image.jpg")} resizeMode='cover' style={[styles.experienceImage, {
                       height: height / 12,
                       width: height / 12,
                   }]} />
                   <Text style={styles.experienceDate}>{experience.experienceStartDate}</Text>
                   <Text style={styles.experienceDate}>{experience.hours} hours</Text>
               </View>

               <View style={{ width: "76%" }}>
                   <View style={styles.experienceIdentifiers}>
                       <Text style={styles.experienceName}>{experience.name}</Text>
                       <Text style={styles.experienceUsername}>@{experience.username}</Text>
                   </View>
                   <Text style={styles.experienceDescription}>{experience.description}</Text>
               </View>
           </View>
    );
}

export default function ProfileScreen() {
    let volunteerCount = 3;
    let dominantTag = 8;
    let firstVolunteered = "12/03/23";
    let hours = "Untold";
    let firstName = "Mihnea";
    let secondName = "Tomoiaga";
    let lastName = "Coman"
    let username = "tomoioaga";
    let description = "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.";
    let gender = "male";
    let birthday = '08/07/2006'
    const { height, width } = useWindowDimensions();

    const experienceObject = {
        firstName: firstName,
        secondName: secondName,
        username: username,
        firstVolunteered: firstVolunteered,
        description: description,
    }


    return (
        <View style={{ flex: 1, backgroundColor: "white"}}>
            <SafeAreaView style = {{ flex:1 }}>
                <ScrollView style = {{ flex: 1}}>
                  <View style = {[{height: height/100*7}, styles.header]}>
                      <Link
                          href={{
                              pathname: 'pages/editProfile',
                              params: { username: username, firstName: firstName, secondName: secondName, description: description }
                          }}>
                          <FontAwesome name={'edit'} style={[{ color: '#9394a5'}, styles.icon]} />
                      </Link>
                      <Text style = { styles.headerTitle }>{ username }</Text>
                          <Link href={{
                                  pathname: 'pages/settingsUser'
                              }}>
                              <FontAwesome name={'cog'} style={[{ color: '#9394a5' }, styles.icon]} />
                          </Link>
                  </View>
                  <View style={styles.purpleBlock}></View>
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
                    <KeyboardAvoidingView style={styles.profileInfoSection}>
                        <View style={styles.identifiers}>
                            <Text style={styles.name}>{firstName}</Text>
                            <Text style={styles.name}>{secondName}</Text>
                        </View>
                        <Text style={styles.description}>{description}</Text>
                    </KeyboardAvoidingView>
                        <ExperienceSection experience={experienceObject} />
                    <Pressable>
                        <Text style={styles.seeAllText}>See all</Text>
                    </Pressable>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
  header: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: "4%",
        paddingRight: "6%",
        backgroundColor: "#ffffff",
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    backIcon: {
        fontSize: 30,
    },
    settingsIcon: {

    },
    purpleBlock: {
        width: "100%",
        height: 100,
        backgroundColor: "rgba(114, 17, 162, .7)",
        marginBottom: -100,
    },
    profileStatsSection: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    },
    profileStatsSubsection: {
        display: "flex",
        flexDirection: "column",
        width: "33%",
        justifyContent: "flex-start",
        alignSelf: "flex-start",
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
    profilePicture: {
        height: 125,
        width: 125,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "5%",
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
        marginTop: "5%"
    },
    seeAllText: {
        fontWeight: "800",
        textDecorationLine: "underline",
        marginLeft: "3%",
        marginTop: "2%",
        color: 'rgba(114, 17, 162, .8)',
    },
    icon:{
        fontSize: 25,
        paddingHorizontal: '1%',
    },
    experienceSection: {
        display: "flex",
        flexDirection: "row",
        width: "96%",
        padding: "3%",
        marginTop: "5%",
        marginHorizontal: "2%",
        borderRadius: 15,
        backgroundColor: "#FFFFFF",
        shadowColor: '#0000000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        zIndex: 1,
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
        color: "#9394a5",
        fontSize: 12,
    },
    experienceDescription: {
        color: "#000000",
    },
    experienceIdentifiers: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "80%",
        marginBottom: "2%",
    },
})
