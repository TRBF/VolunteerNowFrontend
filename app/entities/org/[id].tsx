import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Image,
  Text,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  Pressable,
} from "react-native";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { url_endpoint } from "../../../apistuff/_config";
import { verticalUnits } from "../../../jmecheriis/ddunits";

function getImageSource(link) {
  if (!link) return undefined;
  if (link.startsWith('http')) return { uri: link };
  return { uri: url_endpoint + "/api" + link };
}

function PastExperience({ experience }) {
  const textLimit = 96;

  console.log("Experience: ", experience);
  if (!experience.name) return <View></View>;

  return (
    <View style={styles.experienceSection}>
      <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
        <Image
          source={getImageSource(experience.link_to_pfp)}
          resizeMode="cover"
          style={[
            styles.experienceImage,
            {
              height: verticalUnits(8.3),
              width: verticalUnits(8.3),
            },
          ]}
        />
        <Text style={styles.experienceDate}>{experience.days} days</Text>
      </View>

      <View style={{ width: "76%" }}>
        <View style={styles.experienceIdentifiers}>
          <Text style={styles.experienceName}>{experience.name}</Text>
          <Text style={styles.experienceUsername}>{experience.location}</Text>
        </View>
        <Text style={styles.experienceDescription}>
          {experience.description.length > textLimit
            ? experience.description.slice(0, textLimit) + "..."
            : experience.description}
        </Text>
      </View>
    </View>
  );
}

export default function VolunteerPage() {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
  let volunteerCount = 3;
  let dominantTag = 8;
  let hours = "Music";
  const [first_name, setFirstName] = useState("Tudor");
  const [last_name, setLastName] = useState("Balan");
  const [name, setName] = useState("Balan");
  const [description, setDescription] = useState(
    "Aceasta este descrierea lui Alex Chira, un băiat foarte pasionat de ceea ce face, care se implică oriunde poate!"
  );
  const [birthday, setBirthday] = useState(new Date());
  const [pfpLink, setPFPLink] = useState("");
  const [coverLink, setCoverLink] = useState("");
  const [experienceList, setExperienceList] = useState([]);
  const { username } = useLocalSearchParams();
  const [isLoading, setLoading] = useState(true);
  //
  //async function getProfile() {
  //  try {
  //    let response = await fetch(
  //      `${url_endpoint}/api/get_volunteer_by_username/${username}?format=json`
  //    );
  //    const json = await response.json();
  //
  //    setName(json.name);
  //    setDescription(json.description);
  //    setPFPLink(json.link_to_pfp);
  //    setCoverLink(json.link_to_cover_image);
  //
  //    response = await fetch(
  //      `${url_endpoint}/api/get_user_opportunities/${json.id}?format=json`
  //    );
  //    const opportunities = await response.json();
  //
  //    if (Array.isArray(opportunities)) setExperienceList([...opportunities]);
  //    else setExperienceList([opportunities]);
  //  } catch (error) {
  //    console.error(error);
  //  } finally {
  //    setLoading(false);
  //  }
  //}
  //
  //useEffect(() => {
  //  getProfile();
  //}, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.header}>
        <Pressable
          onPress={() => {
            setLoading(true);
            router.back();
          }}
        >
          <Ionicons
            name="chevron-back"
            style={[{ color: "#9394a5" }, styles.icon]}
          />
        </Pressable>

        <Text style={styles.headerTitle}>@{username}</Text>

        <Ionicons
          name={"chevron-back"}
          style={[{ color: "#fff" }, styles.icon]}
        />
      </View>
      {!isLoading && (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/*<View style={styles.banner}></View>*/}
          <Image style={styles.banner} source={getImageSource(coverLink)}></Image>

          <View style={styles.profileTopSection}>
            <View style={styles.containerPfp}>
              <Image
                source={{ uri: pfpLink }}
                style={styles.profilePicture}
                resizeMode="cover"
              />
            </View>
            {/* pfp + stats (no. of volunteers, dominant tag, volunteering since) */}
            <View style={{ flexDirection: "row" }}>
              <View style={styles.profileStatsSection}>
                <View style={styles.profileStatsSubsection}>
                  <Text style={styles.profileStatsSubsectionText}>
                    {volunteerCount}
                  </Text>
                  <Text style={styles.profileStatsSubsectionTextV2}>
                    opportunities
                  </Text>
                </View>
                <View style={styles.profileStatsSubsection}>
                  <Text style={styles.profileStatsSubsectionText}>{hours}</Text>
                  <Text style={styles.profileStatsSubsectionTextV2}>
                    volunteers
                  </Text>
                </View>
                <View style={styles.profileStatsSubsection}>
                  <Text style={styles.profileStatsSubsectionText}>{hours}</Text>
                  <Text style={styles.profileStatsSubsectionTextV2}>genre</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.profileInfoSection}>
            <View style={styles.identificationData}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.username}>@{username}</Text>
            </View>
            <Text style={styles.description}>{description}</Text>
          </View>

          {/*<View style={{ flexDirection: "row", justifyContent: 'space-around', paddingTop: "10%" }}>
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
                </View>*/}

          {experienceList.map((object, index) => (
            <PastExperience key={index} experience={object} />
          ))}

          <View
            style={{
              height: "5%",
              width: "100%",
              backgroundColor: "transparent",
            }}
          >
            <Text style={{ color: "transparent" }}>Nothing to see here!</Text>
          </View>
        </ScrollView>
      )}
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
    marginBottom: verticalUnits(1),
  },
  profileStatsSubsectionText: {
    color: "#000000",
    fontWeight: "600",
    fontSize: 20,
    textAlign: "center",
    flexWrap: "wrap",
  },
  profileStatsSubsectionTextV2: {
    color: "rgba(114, 17, 162, .7)",
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
    color: "rgba(114, 17, 162, .7)",
    fontWeight: "600",
    fontSize: 20,
    textAlign: "center",
    flexWrap: "wrap",
  },
  profilePicture: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "5%",
  },
  banner: {
    backgroundColor: "rgba(114, 17, 162, .7)",
    aspectRatio: 1,
    position: "absolute",
    height: verticalUnits(15),
    width: "100%",
    top: 0,
    left: 0,
  },
  containerPfp: {
    shadowColor: "rgba(114, 17, 162, .7)",
    elevation: 20,
    marginBottom: "5%",
    borderRadius: 100,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: "45%",
    aspectRatio: 1,
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
    backgroundColor: "rgba(114, 17, 162, .7)",
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
    marginTop: verticalUnits(3.5),
    paddingBottom: verticalUnits(5),
    paddingHorizontal: "8%",
    width: "100%",
  },
  name: {
    color: "#000000",
    fontWeight: "600",
    marginRight: "2%",
    fontSize: 16,
    textAlignVertical: "center",
  },
  username: {
    color: "#9394a5",
    textAlignVertical: "center",
  },
  description: {
    color: "#000000",
  },
  identificationData: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "row",
    marginBottom: verticalUnits(1),
  },
  experienceSection: {
    display: "flex",
    flexDirection: "row",
    width: "94%",
    paddingHorizontal: "3%",
    paddingVertical: verticalUnits(1.5),
    marginTop: verticalUnits(2),
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    shadowColor: "#0000000",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  experienceImage: {
    borderRadius: 10,
    marginRight: "5%",
    marginBottom: "12%",
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
    //marginLeft: "5%",
    width: "80%",
    textAlign: "center",
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
    color: "rgba(114, 17, 162, .8)",
  },
  icon: {
    fontSize: 30,
    paddingHorizontal: "1%",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: "4%",
    paddingRight: "6%",
    backgroundColor: "#ffffff",
    height: verticalUnits(12),
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
});

