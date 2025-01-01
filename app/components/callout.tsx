import React from "react";
import {
  View,
  Text,
  Pressable,
  Image,
} from "react-native";
import { Link } from "expo-router";
import { verticalUnits } from "../jmecheriis/ddunits";

import { styles } from "../styles/latest";
import { url_endpoint } from "../apistuff/_config";

export function Callout({ callout }) {
  console.log(callout);

  return (
    <Link
      href={{
        pathname: "entities/org/[username]",
        params: { username: callout.senderUsername },
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
            source={{ uri: url_endpoint + "/api" + callout.callout_picture }}
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
            <Text style={styles.calloutName}>{callout.title}</Text>
            <Text style={styles.calloutUsername}>@{callout.senderUsername}</Text>
          </View>
          <Text style={styles.calloutDescription}>{callout.description}</Text>
        </View>
      </Pressable>
    </Link>
  );
}
