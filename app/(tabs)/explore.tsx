import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  Image,
  Dimensions,
  Keyboard,
} from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { searchUniversal } from "../apistuff/search";
import { url_endpoint } from "../apistuff/_config";

function Result({ user }) {
  console.log("User: ", user);
  return (
    <Link
      href={{
        pathname:
          user.account_type == "volunteer"
            ? "volunteer/[username]"
            : "org/[username]",
        params: { username: user.username },
      }}
      asChild
    >
      <Pressable>
        <View style={styles.result}>
          <Image
            source={{ uri: url_endpoint + "/api" + user.profile_picture }}
            style={styles.resultPFP}
            resizeMode="cover"
          />
          <View style={styles.resultInfo}>
            <Text style={styles.resultName}>
              {!user.name ? user.first_name + " " + user.last_name : user.name}
            </Text>
            {user.Username && (
              <Text style={styles.resultUsername}>@{user.username}</Text>
            )}
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

function SearchBar({ placeholder, onChangeText }) {
  const [focus, setFocus] = useState(false);

  return (
    <TextInput
      onChangeText={(value) => {
        onChangeText(value);
      }}
      onFocus={() => setFocus(true)}
      placeholder={placeholder}
      style={[
        {
          color: "white",
          backgroundColor: focus ? "#C981EC" : "#FBF2FF",
          marginTop: "4%",
        },
        styles.searchBar,
      ]}
      selectionColor="#C981EC"
      placeholderTextColor={"#e3b5f7"}
      returnKeyType="search"
    />
  );
}

const Tab = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([
    {
      name: "",
      username: "",
      link_to_pfp: "",
    },
  ]);

  return (
    <SafeAreaView style={{ backgroundColor: "#ffffff", flex: 1 }}>
      <Pressable
        onPress={Keyboard.dismiss}
        style={{ height: "100%", width: "100%" }}
      >
        <View style={styles.mainView}>
          <SearchBar
            placeholder="Search"
            onChangeText={async (value: string) => {
              setSearch(value);
              setResults(await request(value));
            }}
          />

          <Text
            style={[
              search ? { display: "none" } : { display: "flex" },
              styles.exploreText,
            ]}
          >
            Type something above to start searching for volunteering
            opportunities!
          </Text>

          <ScrollView
            style={[
              !search ? { display: "none" } : { display: "flex" },
              styles.resultsSection,
            ]}
          >
            {Array.isArray(results) ? (
              results.map((user) => <Result key={user.username} user={user} />)
            ) : (
              <Result user={results} />
            )}
          </ScrollView>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: "white",
    flex: 1,
    padding: 10,
  },
  exploreText: {
    width: "100%",
    textAlign: "center",
    paddingTop: "40%",
    paddingLeft: "10%",
    paddingRight: "10%",
    fontSize: 18,
    fontWeight: "300",
  },
  profilePicture: {
    width: 100,
    height: 100,
  },
  resultsSection: {
    flex: 1,
  },
  result: {
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ddd",
  },
  resultPFP: {
    height: Dimensions.get("window").height / 16,
    width: Dimensions.get("window").height / 16,
    marginRight: 10,
    borderRadius: 50,
  },
  resultName: {
    color: "#000",
    fontWeight: "600",
    fontSize: 15,
  },
  resultUsername: {
    color: "#C981EC",
  },
  resultInfo: {
    justifyContent: "center",
  },
  searchBar: {
    backgroundColor: "#FBF2FF",
    borderRadius: 30,
    width: "90%",
    alignSelf: "center",
    padding: 10,
    color: "#7211A2",
    shadowColor: "#C981EC",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    padding: 10,
  },
  button: {
    width: "32%",
  },
  topProfileButton: {
    width: "100%",
    paddingVertical: 10,
    textAlign: "center",
    borderRadius: 15,
    color: "#FFFFFF",
    fontWeight: "400",
  },
});

const request = async (query: string) => {
  if (!query) return []; // Return empty array if search query is empty

  try {
    let result = await searchUniversal(query);
    return result;
  } catch (error) {
    console.error("Error fetching search results: ", error);
    return [];
  }
};

export default Tab;

