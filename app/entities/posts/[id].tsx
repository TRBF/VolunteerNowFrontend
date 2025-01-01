import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Image } from "expo-image";
import { useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import { useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";

import { getOpportunity } from "../../apistuff/post";
import { styles } from "../../styles/post";
import { url_endpoint } from "../../apistuff/_config";


export default function Tab() {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  const { height, width } = useWindowDimensions();
  const [ isLoading, setLoading ] = useState(true); 
  const [ postObject, setPostObject ] = useState({
    name: "",
    time: "",
    location: "",
    description: "",
    applications_count: 0,
    like_count: 0,
    comment_count: 0,
    profile_picture: "",
    cover_image: "",
    post_image: "",
  }); 
  const formID = "replace this";

  // call function to get events
  async function init() {
    const o = await getOpportunity(id);
    setPostObject(o);
    setLoading(false);
  }

  useEffect(() => {
    init();
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const postData = {
    title: "Voluntar 2024 Salvati Copiii",
    authorUsername: "salvati.copiii",
    description:
      "Dacă dorești să desfășori activități în București, în următoarele 2 săptămâni din momentul înscrierii, colegii noștri care coordonează Centrul Național de Voluntari îți vor scrie o invitație la interviu.",
    requirements: [
      { "varsta minima1": 13 },
      { "trebuie să fii cel puțin în clasa": 8 },
      { "trebuie sa locuiesti in": "Bucuresti" },
    ],
    pfpLink:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMxjfyfIPWRcFJJWM-L6kAZ0y1ciMWIV-CoA&s",
    coverLink:
      "https://www.salvaticopiii.ro/sites/ro/files/styles/image_token/public/migrated_files/images/5eef6f5e-6647-4534-9fe6-d153027d8f7c.JPG.webp?itok=ErlmlYdC",
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      {!isLoading &&
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.header}>
            <Pressable onPress={() => router.back()}>
              <Ionicons name="chevron-back" style={styles.backIcon} />
            </Pressable>

            <Text style={styles.headerTitle}>{postObject.name}</Text>

            <Entypo name="dots-three-horizontal" style={styles.settingsIcon} />
          </View>
          <ScrollView contentContainerStyle={{ width: "100%" }}>
            <View style={styles.coverImageContainer}>
              <Image
                style={styles.coverImage}
                source={{ uri: url_endpoint + "/api" + postObject.post_image }}
              />
            </View>
            <View style={styles.mainSection}>
              <View style={styles.topSection}>
                <View style={styles.eventImageContainer}>
                  <Image
                    style={styles.eventImage}
                    source={{ uri: url_endpoint + "/api" + postObject.profile_picture }}
                  />
                </View>
                <View style={styles.titleAndAuthor}>
                  <Text style={styles.title}>{postObject.name}</Text>
                  <Text style={styles.author}>
                    {/*<Link
                      href={{
                        pathname: "org/[username]",
                        params: { username: postObject.authorUsername },
                      }}
                    > */}
                    Volunteeer @{postObject.location}
                    {/*</Link>*/}
                  </Text>
                </View>
              </View>
              <View style={styles.infoSection}>
                <Text style={styles.description}>{postObject.description}</Text>
                {/*postData.requirements.map((requirement: any, index: number) => (
                  <Requirement requirement={requirement} key={index} />
                ))*/}
              </View>
              <View style={styles.applyNowContainer}>
                <Link
                  href={{
                    pathname: "forms/[id]",
                    params: { id: formID },
                  }}
                  asChild
                >
                  <Pressable style={styles.applyNowButton}>
                    <Text style={styles.applyNowButtonText}>Apply Now</Text>
                  </Pressable>
                </Link>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      }
    </View>
  );
}


