import React from "react";
import {
  Pressable,
  Image,
  Text,
  View,
} from "react-native";
import { Link } from "expo-router";
import { url_endpoint } from "../apistuff/_config";
import { verticalUnits } from "../jmecheriis/ddunits";

import { styles } from "../styles/profile";

export function PastExperience({ experience }) {
  const startDate: Date = new Date(experience.time);
  const textLimit = 96;

  return (
    <Link
      href={{
        pathname: "entities/org/[username]",
        params: { username: experience.username },
      }}
      asChild
    >
      <Pressable style={styles.experienceSection}>
        <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
          <Image
            source={{ uri: url_endpoint + "/api" + experience.profile_picture }}
            resizeMode="cover"
            style={[
              styles.experienceImage,
              {
                height: verticalUnits(8.3),
                width: verticalUnits(8.3),
              },
            ]}
          />
          <Text style={styles.experienceDate}>
            {startDate.getDay()}.{startDate.getMonth()}.
            {startDate.getFullYear()}
          </Text>
          {/* <Text style={styles.experienceDate}>{experience.days} days</Text> */}
        </View>

        <View style={{ width: "76%" }}>
          <View style={styles.experienceIdentifiers}>
            <Text style={styles.experienceName}>{experience.role}</Text>
            <Text style={styles.experienceLocation}>{experience.location}</Text>
          </View>
          <Text style={styles.experienceDescription}>
            {experience.description.length > textLimit
              ? experience.description.slice(0, textLimit) + "..."
              : experience.description}
          </Text>
          {experience.diploma ? (
            <Text style={styles.attestedText}>Attested by diploma</Text>
          ) : (
            <View></View>
          )}
        </View>
      </Pressable>
    </Link>
  );
}


