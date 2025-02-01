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

  let pfpLink: String;
  async function init(){
    pfpLink = await getPfp(user.id)
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
              source={{ uri: "http://0.0.0.0:8000/api/media/images/default_pfp.png"}}
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
