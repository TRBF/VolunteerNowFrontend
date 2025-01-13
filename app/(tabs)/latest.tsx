import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { verticalUnits } from "../../jmecheriis/ddunits";

import { Callout } from "../../components/callout";
import { styles } from "../../styles/latest";
import { getCalloutSenderUsername, getCallouts } from "../../apistuff/latest";

const Tab = () => {
  const [isLoading, setLoading] = useState(true);
  const [callouts, setCallouts] = useState([]);

  async function init(){
    const c = await getCallouts();
    setCallouts(c);
    setLoading(false);
  }

  useEffect(() => {
    setLoading(false);
    init();
  }, []);

  return (
    <View style={{ height: "100%", backgroundColor: "#ffffff" }}>
      {!isLoading &&
        <SafeAreaView style={{ backgroundColor: "#ffffff" }}>
          <ScrollView>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Callouts</Text>
            </View>

            <ScrollView
              style={{ width: "100%" }}
              contentContainerStyle={{
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {callouts.map((callout: any) => (
                <Callout key={callout.key} callout={callout} />
              ))}
              <View style={{ height: verticalUnits(10), width: "100%" }}></View>
            </ScrollView>
          </ScrollView>
        </SafeAreaView>
      }
    </View>
  );
};


export default Tab;

