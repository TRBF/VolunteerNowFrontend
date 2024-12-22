
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { verticalUnits } from "../jmecheriis/ddunits";

function Callout({ callout }) {
  return (
    <Link
      href={{
        pathname: "entities/org/[username]",
        params: { username: callout.username },
      }}
      asChild
    >
      <Pressable style={styles.calloutSection}>
        <View
          style={{
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <Image
            source={{ uri: callout.imageLink }}
            resizeMode="cover"
            style={[
              styles.calloutImage,
              {
                height: verticalUnits(8.3),
                width: verticalUnits(8.3),
              },
            ]}
          />
        </View>

        <View style={{ width: "76%" }}>
          <View style={styles.calloutIdentifiers}>
            <Text style={styles.calloutName}>{callout.name}</Text>
            <Text style={styles.calloutUsername}>@{callout.username}</Text>
          </View>
          <Text style={styles.calloutDescription}>{callout.description}</Text>
        </View>
      </Pressable>
    </Link>
  );
}

const Tab = () => {
  const [sendDate, setSendDate] = useState(new Date());

  const callouts = [
    {
      name: "Salvați Copiii",
      username: "salvati.copiii",
      description:
        "Salvați Copiii oferă oportunități de voluntariat pentru copii și tineri din medii defavorizate. Vino să faci diferența în viața acestora!",
      imageLink:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMxjfyfIPWRcFJJWM-L6kAZ0y1ciMWIV-CoA&s", // Add the actual image link
      startDate: sendDate,
      days: 30, // Example: 30 days volunteer program
      key: 0,
    },
    {
      name: "Cărturești",
      username: "carturesti",
      description:
        "Voluntari pentru ateliere educative și activități culturale! Alătură-te echipei Cărturești și susține educația prin cultură.",
      imageLink:
        "https://dambovitamall.ro/wp-content/uploads/2022/08/carturesti-1-scaled.jpg", // Add the actual image link
      startDate: sendDate,
      days: 15, // Example: 15 days program
      key: 1,
    },
    {
      name: "Fundația Părinți din România",
      username: "parinti.din.romania",
      description:
        "Te invităm să te alături ca voluntar pentru a sprijini părinții și copiii în dificultate, prin servicii de consiliere și suport.",
      imageLink:
        "https://cdn.fundatia-vodafone.ro/app/uploads/2014/09/peditel-768x432.jpg", // Add the actual image link
      startDate: sendDate,
      days: 60, // Example: 60 days program
      key: 2,
    },
    {
      name: "Crucea Roșie",
      username: "crucea.rosie",
      description:
        "Crucea Roșie caută voluntari pentru a sprijini persoanele afectate de dezastre naturale. Te poți implica în acțiuni de salvare și ajutor umanitar.",
      imageLink:
        "https://crucearosie.ro/wp-content/uploads/2024/03/Emblem_of_the_Romanian_Red_Cross-1.png", // Add the actual image link
      startDate: sendDate,
      days: 7, // Example: 7 days event
      key: 3,
    },
  ];

  return (
    <View style={{ height: "100%", backgroundColor: "#ffffff" }}>
      <SafeAreaView style={{ backgroundColor: "#ffffff" }}>
        <ScrollView>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Callouts</Text>
          </View>

          <ScrollView
            style={{ width: "100%" }}
            contentContainerStyle={{
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {callouts.map((callout: any) => (
              <Callout key={callout.key} callout={callout} />
            ))}
            <View style={{ height: verticalUnits(10), width: "100%" }}></View>
          </ScrollView>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    fontSize: 20,
    paddingHorizontal: "1%",
  },
  header: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    height: verticalUnits(8),
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  backIcon: {
    fontSize: 30,
  },
  calloutSection: {
    display: "flex",
    flexDirection: "row",
    width: "94%",
    paddingHorizontal: "3%",
    paddingVertical: verticalUnits(1.5),
    marginTop: verticalUnits(1),
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    shadowColor: "#0000000",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  calloutImage: {
    borderRadius: 10,
    marginRight: "5%",
    marginBottom: "12%",
  },
  calloutName: {
    color: "#000000",
  },
  calloutUsername: {
    color: "#9394a5",
  },
  calloutDate: {
    color: "#9394a5",
    fontSize: 12,
    //marginLeft: "5%",
    width: "80%",
    textAlign: "center",
  },
  calloutDescription: {
    color: "#000000",
  },
  calloutIdentifiers: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: "2%",
  },
});

export default Tab;

