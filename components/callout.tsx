import React, { useEffect, useState } from "react";
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

  const [count, setCount] = useState(69)
  const [countType, setCountType] = useState("0")

  const dateTime = new Date(callout.time)

  async function init(){

    if(new Date().getFullYear() - dateTime.getFullYear()>0){
      setCount(new Date().getFullYear() - dateTime.getFullYear()) 
      setCountType("years")
      if(new Date().getFullYear()-dateTime.getFullYear() == 1)
        setCountType("year")
    }
    else if(new Date().getMonth()-dateTime.getMonth()>0){
      setCount(new Date().getMonth()-dateTime.getMonth())
      setCountType("months")
      if(new Date().getMonth()-dateTime.getMonth() == 1)
        setCountType("month")
    }
    else if(new Date().getDate()-dateTime.getDate()>0){
      setCount(new Date().getDate()-dateTime.getDate())
      setCountType("days")
      if(new Date().getDate()-dateTime.getDate() == 1)
        setCountType("day")
    }
    else if(new Date().getHours()-dateTime.getHours()>0){
      setCount(new Date().getHours()-dateTime.getHours())
      setCountType("hours")
      if(new Date().getHours()-dateTime.getHours() == 1)
        setCountType("hour")
    }
    else if(new Date().getMinutes()-dateTime.getMinutes()>0){
      setCount(new Date().getMinutes()-dateTime.getMinutes())
      setCountType("minutes")
      if(new Date().getMinutes()-dateTime.getMinutes() == 1)
        setCountType("minute")
    }
    else if(new Date().getSeconds()-dateTime.getSeconds()>0){
      setCount(new Date().getSeconds()-dateTime.getSeconds())
      setCountType("seconds")
      if(new Date().getSeconds()-dateTime.getSeconds() == 1)
        setCountType("second")
    }
  }

  useEffect(()=>{
    init();
  }, [])

  return (
    <Link
      href={{
        pathname: "entities/posts/[id]",
        params: { username: callout.postID },
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
            <Text style={styles.calloutUsername}>{count} {countType} ago</Text>
          </View>
          <Text style={styles.calloutDescription}>{callout.description}</Text>
        </View>
      </Pressable>
    </Link>
  );
}
