import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Image,
  Text,
  View,
  SafeAreaView,
  Pressable,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, router, useFocusEffect, useLocalSearchParams, useNavigation } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { url_endpoint } from "../../../apistuff/_config";

import { PastExperience } from "../../../components/pastexperience";
import { styles } from "../../../styles/profile";
import { getProfile, getUserOpportunities } from "../../../apistuff/profile";

export default function Tab() {
  const navigation = useNavigation();
  
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);


  const { userID } = useLocalSearchParams();

  const [name, setName] = useState("Loading...");
  const [lastName, setLastName] = useState("Loading...");
  const [username, setUsername] = useState("loading...");
  const [description, setDescription] = useState("Description is loading...");
  const [volunteerCount, setVolunteerCount] = useState(14);
  const [hours, setVolunteeringHours] = useState(78);
  const [mostFrequented, setMostFrequented] = useState("UNTOLD");
  const [experienceList, setExperienceList] = useState([{}, {}]);
  const [pfpLink, setPfpLink] = useState("");

  const [isLoading, setLoading] = useState(true);
  
  async function init() {
    const id = userID.toString(); 

    const profile = await getProfile(id);
    setUsername(profile["username"]);
    setPfpLink(profile["profile_picture"]);
    setName(profile["first_name"]);
    setLastName(profile["last_name"]);
    setDescription(profile["description"]);
    
    const opportunities = await getUserOpportunities(id);
    setExperienceList([...opportunities]);
    setLoading(false);
  }

  useFocusEffect(
    React.useCallback(() => {
      init();
      return () => {};
    }, [])
  );
  useEffect(() => {
    init();
  }, []);

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
          <View style={styles.circlePfp}></View>

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
                    participations
                  </Text>
                </View>
                <View style={styles.profileStatsSubsection}>
                  <Text style={styles.profileStatsSubsectionText}>{hours}</Text>
                  <Text style={styles.profileStatsSubsectionTextV2}>
                    hours volunteered
                  </Text>
                </View>
                <View style={styles.profileStatsSubsection}>
                  <Text style={styles.profileStatsSubsectionText}>
                    {mostFrequented}
                  </Text>
                  <Text style={styles.profileStatsSubsectionTextV2}>
                    most frequented
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.profileInfoSection}>
            <View style={styles.identificationData}>
              <Text style={styles.name}>
                {name} {lastName}
              </Text>
              <Text style={styles.username}>@{username}</Text>
            </View>
            <Text style={styles.description}>{description}</Text>
          </View>
          
          {
              experienceList.length==0 ? 
                <Text style={styles.placeholderText}>No volunteering experiences yet!</Text> 
              : 
                experienceList.map((object, index) => (
                  <PastExperience key={index} experience={object} />
                ))
          }

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



