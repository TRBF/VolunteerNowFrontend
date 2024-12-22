import React from "react";
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
import { verticalUnits } from "../../jmecheriis/ddunits";

function Requirement({ requirement }) {
  return (
    <View style={{ flexDirection: "row" }}>
      <Text style={styles.requirement}>{Object.keys(requirement)[0]}: </Text>
      <Text style={styles.requirementV2}>{Object.values(requirement)} </Text>
    </View>
  );
}

export default function Tab() {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  const { height, width } = useWindowDimensions();
  const formID = "replace this";

  useEffect(() => {
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
    <View style={{ flexGrow: 1, backgroundColor: "#ffffff" }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={[{ height: height / 14.5 }, styles.header]}>
          <Pressable onPress={() => router.back()}>
            <Ionicons name="chevron-back" style={styles.backIcon} />
          </Pressable>

          <Text style={styles.headerTitle}>{postData.title}</Text>

          <Entypo name="dots-three-horizontal" style={styles.settingsIcon} />
        </View>
        <ScrollView contentContainerStyle={{ width: "100%" }}>
          <View style={[{ height: height / 3 }, styles.coverImageContainer]}>
            <Image
              style={styles.coverImage}
              source={{ uri: postData.coverLink }}
            />
          </View>
          <View style={styles.mainSection}>
            <View style={styles.topSection}>
              <View style={styles.eventImageContainer}>
                <Image
                  style={styles.eventImage}
                  source={{ uri: postData.pfpLink }}
                />
              </View>
              <View style={styles.titleAndAuthor}>
                <Text style={styles.title}>{postData.title}</Text>
                <Text style={styles.author}>
                  by @
                  <Link
                    href={{
                      pathname: "org/[username]",
                      params: { username: postData.authorUsername },
                    }}
                  >
                    {postData.authorUsername}
                  </Link>
                </Text>
              </View>
            </View>
            <View style={styles.infoSection}>
              <Text style={styles.description}>{postData.description}</Text>
              {postData.requirements.map((requirement: any, index: number) => (
                <Requirement requirement={requirement} key={index} />
              ))}
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
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  backIcon: {
    fontSize: 30,
    color: "#9394a5",
  },
  settingsIcon: {
    fontSize: 22,
    //color: "#9394a5",
    color: "#ffffff",
  },
  coverImageContainer: {
    width: "100%",
  },
  coverImage: {
    width: "100%",
    height: "100%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  mainSection: {
    paddingLeft: "6%",
    paddingRight: "6%",
    paddingTop: 20,
  },
  topSection: {
    alignItems: "center",
    marginTop: verticalUnits(-6),
  },
  eventImageContainer: {
    height: verticalUnits(16),
    aspectRatio: 1,
    borderRadius: 1000,
    overflow: "hidden",
    borderColor: "#ffffff",
    borderWidth: 4,
    marginBottom: verticalUnits(1),
  },
  eventImage: {
    width: "100%",
    height: "100%",
  },
  titleAndAuthor: {
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  author: {
    fontSize: 16,
    color: "#C981EC",
  },
  infoSection: {
    marginTop: verticalUnits(4),
    marginBottom: verticalUnits(2),
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 20,
    borderBottomWidth: 0.6,
    borderBottomColor: "gray",
    paddingBottom: "7%",
  },
  requirement: {
    color: "#333",
    fontSize: 14,
    marginBottom: 10,
  },
  requirementV2: {
    color: "#C981EC",
    fontSize: 14,
    marginBottom: 10,
  },
  applyNowButton: {
    backgroundColor: "#C981EC",
    paddingVertical: verticalUnits(2),
    marginVertical: verticalUnits(2),
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  applyNowButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  applyNowContainer: {
    width: "55%", // Set the width to be smaller
    height: "70%",
    alignSelf: "center", // Center the container within its parent
    paddingTop: 20, // Add padding to the top
    paddingBottom: 20,
  },
});

