import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { verticalUnits } from "../../jmecheriis/ddunits";

import { Callout } from "../../components/callout";
import { styles } from "../../styles/latest";
import { getCallouts } from "../../apistuff/latest";

const Tab = () => {
  const [isLoading, setLoading] = useState(true);
  const [callouts, setCallouts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  async function init(){
    const c = await getCallouts();
    if(Array.isArray(c))
      setCallouts(c);
    setLoading(false);
  }

  useEffect(() => {
    setLoading(false);
    init();
  }, []);

  const onRefresh = useCallback(()=>{
    setRefreshing(true);
    init();
    setRefreshing(false);
  }, [])

  return (
    <View style={{ height: "100%", backgroundColor: "#ffffff" }}>
      {!isLoading &&
        <SafeAreaView style={{ backgroundColor: "#ffffff" }}>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing = {refreshing} onRefresh={onRefresh}/>
            }>
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
                <Callout key={callout.id} callout={callout} />
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

