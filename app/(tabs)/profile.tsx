import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Image,
  Text,
  View,
  SafeAreaView,
  Button,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, useFocusEffect } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { url_endpoint } from "../../apistuff/_config";

import { PastExperience } from "../../components/pastexperience";
import { styles } from "../../styles/profile";
import { getProfile, getUserOpportunities } from "../../apistuff/profile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAccountId } from "../../apistuff/account";

export default function Tab() {
  const [id, setID] = useState("4"); // needs to be changed based on what's stored on the device

  const [name, setName] = useState("Loading...");
  const [lastName, setLastName] = useState("Loading...");
  const [username, setUsername] = useState("loading...");
  const [description, setDescription] = useState("Description is loading...");
  const [hours, setHours] = useState(78);
  const [count, setCount] = useState(78);
  const [mostFrequented, setMostFrequented] = useState("UNTOLD");
  const [experienceList, setExperienceList] = useState([{}, {}]);
  const [pfpLink, setPfpLink] = useState("");

  const [isLoading, setLoading] = useState(true);

  async function init() {
    const account_id = await getAccountId();
    setID(account_id);

    const profile = await getProfile(account_id);
    setUsername(profile["username"]);
    setPfpLink(profile["profile_picture"]);
    setName(profile["first_name"]);
    setLastName(profile["last_name"]);
    setDescription(profile["description"]);

    setHours(profile["hours"]);
    setMostFrequented(profile["most_fq"]);
    setCount(profile["count"]);
    
    const opportunities = await getUserOpportunities(account_id);
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
        <Link href={{ pathname: "profile/settingsUser" }}>
          <FontAwesome
            name={"cog"}
            style={[{ color: "#9394a5" }, styles.icon]}
          />
        </Link>

        <Text style={styles.headerTitle}>@{username}</Text>

        <Link
          href={{ pathname: "profile/editProfile" }}
        >
          <Ionicons
            name={"pencil"}
            style={[{ color: "#9394a5" }, styles.icon]}
          />
        </Link>
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
                    {count}
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


