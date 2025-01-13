import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Pressable,
  StatusBar,
  RefreshControl
} from "react-native";
import { Image } from "expo-image";
import Entypo from "@expo/vector-icons/Entypo";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Redirect } from "expo-router";

import { isLoggedIn } from "../../apistuff/account";
import { styles } from "../../styles/index";
import { Post } from "../../components/indexpost";
import { getEvents, getPfp } from "../../apistuff";
import * as NavigationBar from 'expo-navigation-bar';
import { url_endpoint } from "../../apistuff/_config";

const Tab = () => {
  const [logged, setLogged] = useState(true);
  const [events, setEvents] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [id, setID] = useState(1);
  const [pfpLink, setPfpLink] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  // call function to get data from backend 
  async function init() {
    const e = await getEvents();
    const p = await getPfp(id);
    setEvents(e);
    setPfpLink(p + `?time=${Date.now}`)
    setLoading(false);
  }
  async function reset() {
    setEvents([]);
    setPfpLink("")
  }

  
  // check log in and make api call
  useEffect(() => {
    setLogged(isLoggedIn()); // IDE might tell you this line doesn't work; it does.
    init();
  }, []);

  // if the user isn't logged in we want them to log in 
  if (!logged) {
    return <Redirect href="login" />;
  }
  
  // set native navbar color
  NavigationBar.setBackgroundColorAsync("#ffffff");

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
  
    reset()
    .then(()=>init())
    .then(() => setRefreshing(false));
    setEvents([]);
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: "#ffffff", flex: 1 }}>
      {/* this fixes the problem with the status bar being black/grey on android */}
      <StatusBar
        animated={true}
        backgroundColor="#ffffff"
        hidden={false}
      />
      {!isLoading && (
        <ScrollView 
          style={{ backgroundColor: "#ffffff" }}
          refreshControl={
            <RefreshControl refreshing = {refreshing} onRefresh={onRefresh}/>
          }>
            
          <View style={styles.bannerContainer}>
            <Link
              href={{
                pathname: "profile",
              }}
              asChild
            >
              <Pressable style={styles.headerImageContainerLeft}>
                <Image
                  style={{ aspectRatio: 1, borderRadius: 50 }}
                  source={{ uri: `${url_endpoint}/api${pfpLink}?time=${Date.now}`}}

                  key={Date.now()}
                />
              </Pressable>
            </Link>

            <Image
              style={styles.bannerImage}
              source={require("../../assets/images/logo2.png")}
            />

            <Link
              href={{ pathname: "/miscellaneous/pages/applicationsStatus.tsx" }}
              style={styles.headerImageContainerRight}
            >
              <Entypo
                name={"documents"}
                style={{
                  color: "#7211A2",
                  fontSize: 26,
                  alignItems: "center",
                }}
              />
            </Link>
          </View>

          {events.map((event: any) => (
            <Post postObject={{ ...event }} key={event.content} />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Tab;

