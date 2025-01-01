import React from "react";
import {
  View,
  Text,
  Pressable,
  Image,
} from "react-native";
import { Link } from "expo-router";
import { url_endpoint } from "../apistuff/_config";
import { styles } from "../styles/explore";

export function Result({ user }) {
  console.log("User: ", user);
  return (
    <Link
      href={{
        pathname:
          user.account_type == "volunteer"
            ? "volunteer/[username]"
            : "org/[username]",
        params: { username: user.username },
      }}
      asChild
    >
      <Pressable>
        <View style={styles.result}>
          <Image
            source={{ uri: url_endpoint + "/api" + user.profile_picture }}
            style={styles.resultPFP}
            resizeMode="cover"
          />
          <View style={styles.resultInfo}>
            <Text style={styles.resultName}>
              {!user.name ? user.first_name + " " + user.last_name : user.name}
            </Text>
            {user.Username && (
              <Text style={styles.resultUsername}>@{user.username}</Text>
            )}
          </View>
        </View>
      </Pressable>
    </Link>
  );
}
