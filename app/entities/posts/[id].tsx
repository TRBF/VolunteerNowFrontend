import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Linking,
} from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Image } from "expo-image";
import { useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import { useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";

import { getOpportunity } from "../../../apistuff/post";
import { styles } from "../../../styles/post";
import { url_endpoint } from "../../../apistuff/_config";


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
    form_link: "",
  }); 

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
                <Pressable onPress={() => Linking.openURL(postObject.form_link ? postObject.form_link : "https://google.com")} style={styles.applyNowButton}>
                  <Text style={styles.applyNowButtonText}>Apply Now</Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      }
    </View>
  );
}


