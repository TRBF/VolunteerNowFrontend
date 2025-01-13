import React from "react";
import { View, Text } from "react-native";
import { styles } from "../styles/post";

export function Requirement({ requirement }) {
  return (
    <View style={{ flexDirection: "row" }}>
      <Text style={styles.requirement}>{Object.keys(requirement)[0]}: </Text>
      <Text style={styles.requirementV2}>{Object.values(requirement)} </Text>
    </View>
  );
}
