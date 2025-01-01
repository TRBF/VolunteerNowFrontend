import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Image,
  Text,
  View,
  SafeAreaView,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { url_endpoint } from "../apistuff/_config";

import { PastExperience } from "../components/pastexperience";
import { styles } from "../styles/profile";

export default function Tab() {
  const [id, setId] = useState(1); // needs to be changed based on what's stored on the device

  const [name, setName] = useState("Chira");
  const [lastName, setLastName] = useState("Alexandru");
  const [username, setUsername] = useState("alex_c");
  const [description, setDescription] = useState(
    "Alex is passionate about computer science and sports. He is very competitive and likes to learn new things everyday. He loves to code and also play football with his friends."
  );
  const [volunteerCount, setVolunteerCount] = useState(14);
  const [hours, setVolunteeringHours] = useState(78);
  const [mostFrequented, setMostFrequented] = useState("UNTOLD");
  const [experienceList, setExperienceList] = useState([{}, {}]);
  const [pfpLink, setPfpLink] = useState("");

  const [isLoading, setLoading] = useState(true);

  async function getProfile() {
    try {
      let response = await fetch(
        `${url_endpoint}/api/get_user_by_id/${id}?format=json`
      );
      const json = await response.json();

      //setLastName(json.last_name);
      setUsername(json.username);
      //setDescription(json.description);
      setPfpLink(json.profile_picture);

      response = await fetch(
        `${url_endpoint}/api/get_user_participations/${id}?format=json`
      );
      const opportunities = await response.json();
      console.log(opportunities)

      setExperienceList([...opportunities]);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.header}>
        <Link href={{ pathname: "pages/settingsUser" }}>
          <FontAwesome
            name={"cog"}
            style={[{ color: "#9394a5" }, styles.icon]}
          />
        </Link>

        <Text style={styles.headerTitle}>@{username}</Text>

        <Link
          href={{
            pathname: "pages/editProfile",
            params: {
              usernameH: username,
              firstNameH: name,
              secondNameH: lastName,
              descriptionH: description,
            },
          }}
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
                source={{ uri: url_endpoint + "/api" + pfpLink }}
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


