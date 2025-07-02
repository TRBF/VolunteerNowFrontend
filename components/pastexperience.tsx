import React, { useEffect, useState } from "react";
import {
  Pressable,
  Image,
  Text,
  View,
} from "react-native";
import { url_endpoint } from "../apistuff/_config";
import { verticalUnits } from "../jmecheriis/ddunits";

import { styles } from "../styles/profile";

function getImageSource(link) {
  if (!link) return undefined;
  if (link.startsWith('http')) return { uri: link };
  return { uri: url_endpoint + "/api" + link };
}

export function PastExperience({ experience }) {
  const textLimit = 96;

  const [count, setCount] = useState(0)
  const [countType, setCountType] = useState("0")

  const start_date = new Date(experience.start_date)
  const end_date = new Date(experience.end_date)

  async function init(){
    if(end_date.getFullYear()-start_date.getFullYear()>0){
      setCount(end_date.getFullYear()-start_date.getFullYear()) 
      setCountType("years")
      if(end_date.getFullYear()-start_date.getFullYear() == 1)
        setCountType("year")
    }
    else if(end_date.getMonth()-start_date.getMonth()>0){
      setCount(end_date.getMonth()-start_date.getMonth())
      setCountType("months")
      if(end_date.getMonth()-start_date.getMonth() == 1)
        setCountType("month")

    }
    else if(end_date.getDate()-start_date.getDate()>0){
      setCount(end_date.getDate()-start_date.getDate())
      setCountType("days")
      if(end_date.getDate()-start_date.getDate() == 1)
        setCountType("date")
    }
  }

  useEffect(() => {
    init();
  }, [])

  return (
  <Pressable style={styles.experienceSection}>
      <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
        <Image
          source={getImageSource(experience.participation_picture)}
          resizeMode="cover"
          style={[
            styles.experienceImage,
            {
              height: verticalUnits(8.3),
              width: verticalUnits(8.3),
            },
          ]}
        />
        <Text style={styles.experienceDate}>{count} {countType}</Text>
        <Text style={styles.experienceDate}>{experience.hours} hours</Text>
      </View>

      <View style={{ width: "76%" }}>
        <View style={styles.experienceIdentifiers}>
          <Text style={styles.experienceName}>{experience.role}</Text>
          <Text style={styles.experienceLocation}>{experience.organiser}</Text>
        </View>
        <Text style={styles.experienceDescription}>
          {experience.description.length > textLimit
            ? experience.description.slice(0, textLimit) + "..."
            : experience.description}
        </Text>
        {experience.diploma ? (
          <Text style={styles.attestedText}>Attested by diploma</Text>
        ) : (
          <View></View>
        )}
      </View>
    </Pressable>
  );
}


