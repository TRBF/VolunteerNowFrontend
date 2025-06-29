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

import { getAccountId, isLoggedIn } from "../../apistuff/account";
import { styles } from "../../styles/index";
import { Post } from "../../components/indexpost";
import { getEvents, getPfp } from "../../apistuff";
import * as NavigationBar from 'expo-navigation-bar';
import { url_endpoint } from "../../apistuff/_config";

const Tab = () => {
  const [logged, setLogged] = useState(true);
  const [events, setEvents] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [id, setID] = useState("1");
  const [pfpLink, setPfpLink] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  // call function to get data from backend 
  async function init() {
    try{
      const logStatus = await isLoggedIn()

      const account_id = await getAccountId();
      setID(account_id);
      const e = await getEvents();
      const p = await getPfp(account_id);
      if(e && Array.isArray(e))
        setEvents(e);
      setPfpLink(p + `?time=${Date.now}`)
      setLoading(false);
    }
    catch (error) {
      throw new Error("ffffeeee")
    }
  }
  async function reset() {
    setEvents([]);
    setPfpLink("")
  }

  
  // check log in and make api call
  useEffect(() => {
    isLoggedIn()
    .then((logStatus) => setLogged(logStatus))
    init();
  }, []);

  
  // set native navbar color
  NavigationBar.setBackgroundColorAsync("#ffffff");

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
  
    reset()
    .then(()=>init())
    .then(() => setRefreshing(false));
    setEvents([]);
  }, []);

  if(!logged)
    return(<Redirect href="(auth)/login"/>)

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
                  source={{ uri: `${url_endpoint}${pfpLink}?time=${Date.now}`}}

                  key={Date.now()}
                />
              </Pressable>
            </Link>

            <Image
              style={styles.bannerImage}
              source={require("../../assets/images/logo2.png")}
            />

            <Link
              href={{ pathname: "misc/pages/appStats" }}
              style={styles.headerImageContainerRight}
            >
              <Entypo
                name={"documents"}
                style={{
                  //color: "#7211A2",
                  color: "#FFFFFF",
                  fontSize: 26,
                  alignItems: "center",
                }}
              />
            </Link>
          </View>

          {
            events.map((event: any) => (
            <Post postObject={{ ...event }} key={event.id} />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Tab;

