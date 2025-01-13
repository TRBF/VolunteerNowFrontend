import React from "react";
import { Text, View } from "react-native";
import { Image } from "expo-image";
import { styles } from "../styles/index";

export const Comment = ({ pfp, username, text }) => {
  return (
    <View style={styles.commentContainer}>
      <View style={{ width: "12%" }}>
        <Image
          source={{ uri: "https://via.placeholder.com/40x40/000000/000000" }}
          style={{ aspectRatio: 1, width: "100%", borderRadius: 40 }}
        />
      </View>
      <View style={{ flexDirection: "column", paddingLeft: "3%" }}>
        <Text style={{ fontWeight: "semibold", color: "gray" }}>
          @{username}
        </Text>
        <Text>{text}</Text>
      </View>
    </View>
  );
};
