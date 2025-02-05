import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
} from "react-native";
import { Link } from "expo-router";
import { url_endpoint } from "../apistuff/_config";
import { styles } from "../styles/explore";
import { getPfp } from "../apistuff/search";

export function Result({ user }) {
 
  const [loading, setLoading] = useState(true);
  const [pfpLink, setPfpLink] = useState("");

  async function init(){
    const link = await getPfp(user.id)
    setPfpLink(link)
    console.log(pfpLink)
  }

  useEffect(() => {
    init();
    setLoading(false); 
  }, [])

  return (
    <Link
      href={{
        pathname: "entities/volunteer/[id]",
        params: { "id": user.id }
      }}
      asChild
    >
      {!loading &&
        <Pressable>
          <View style={styles.result}>
            <Image
              source={{ uri: `${url_endpoint}/api${pfpLink}`}}
              style={styles.resultPFP}
              resizeMode="cover"
            />
            <View style={styles.resultInfo}>
              <Text style={styles.resultName}>
                {user.first_name + " " + user.last_name}
              </Text>
              <Text style={styles.resultUsername}>@{user.username}</Text>
            </View>
          </View>
        </Pressable>
      }
    </Link>
  );
}
