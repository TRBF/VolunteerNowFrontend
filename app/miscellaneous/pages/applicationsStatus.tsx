import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  SafeAreaView,
  Platform,
  Dimensions,
  Image,
  StatusBar,
} from "react-native";
import { useNavigation, useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { verticalUnits } from "../../jmecheriis/ddunits";

export default function ApplicationsStatusPage() {
  const applications = [
    {
      type: "pfp",
      name: "Untold",
      status: "Sent",
      pfp: "https://yt3.googleusercontent.com/v6i9aPzHM2BA6oIOGA-k3vsUxpeeQpl3qM9PCgYyQeqkoXQ-83byoLYCV5jaOAx4GHhfW7NjVg=s160-c-k-c0x00ffffff-no-rj",
    },
    {
      type: "pfp",
      name: "Org",
      status: "Accepted",
      pfp: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZQFgSilp0Kmrx1T5QWLuNOz-H5Bdz4zC1_w&s",
    },
    {
      type: "pfp",
      name: "myorganisation",
      status: "Rejected",
      pfp: "https://www.itu.int/net4/wsis/ungis/Content/img/logos/uniform/unicef.png",
    },
    {
      type: "pfp",
      name: "VolunteerNow",
      status: "In Review",
      pfp: "https://yt3.googleusercontent.com/v6i9aPzHM2BA6oIOGA-k3vsUxpeeQpl3qM9PCgYyQeqkoXQ-83byoLYCV5jaOAx4GHhfW7NjVg=s160-c-k-c0x00ffffff-no-rj",
    },
  ];

  const postDate = new Date();

  const navigation = useNavigation();
  const router = useRouter();
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
      <View style={styles.header}>
        <Pressable
          onPress={() => {
            router.back();
          }}
        >
          <Ionicons
            name="chevron-back"
            style={[{ color: "#9394a5" }, styles.backIcon]}
          />
        </Pressable>

        <Text style={styles.headerTitle}>Active Aplications</Text>

        <Ionicons
          name="chevron-back"
          style={[{ color: "#fff" }, styles.backIcon]}
        />
      </View>
      {applications.map((application) => (
        <ApplicationStatus
          pfp={application.pfp}
          name={application.name}
          status={application.status}
          date={postDate}
        />
      ))}
    </SafeAreaView>
  );
}

function ApplicationStatus({ pfp, name, status, date }) {
  return (
    <Pressable style={styles.application}>
      <Image source={{ uri: pfp }} style={styles.pfp} resizeMode="cover" />
      <View style={styles.container}>
        <View style={styles.orgInfo}>
          <Text style={styles.name}>{name}</Text>
          <Text
            style={[
              styles.status,
              {
                color:
                  status == "Accepted"
                    ? "#00ff00"
                    : status == "Rejected"
                    ? "#ff0000"
                    : "#bfbfbf",
              },
            ]}
          >
            {status}
          </Text>
        </View>
        <View style={{ justifyContent: "flex-end", alignItems: "center" }}>
          <Text style={{ color: "#bfbfbf" }}>Sent on</Text>
          <Text style={{ color: "#bfbfbf" }}>{date.toLocaleDateString()}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  application: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: "5%",
    paddingRight: "5%",
    paddingTop: "2%",
    paddingBottom: "5%",
  },
  pfp: {
    height: Dimensions.get("window").height / 14,
    width: Dimensions.get("window").height / 14,
    marginRight: "5%",
    borderRadius: 50,
  },
  name: {
    color: "#000",
    fontWeight: "600",
    fontSize: 15,
  },

  status: {
    fontStyle: "italic",
  },

  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  orgInfo: {
    display: "flex",
    flexDirection: "column",
  },
  header: {
    width: "100%",
    height: verticalUnits(12),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingHorizontal: "4%",
    marginBottom: verticalUnits(2),
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  backIcon: {
    fontSize: 30,
  },
});

