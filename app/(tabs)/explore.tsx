import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Keyboard,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Result } from "../components/searchresult";
import { SearchBar } from "../components/searchbar";
import { styles } from "../styles/explore";
import { searchUniversal } from "../apistuff/search";

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
      {/* this fixes the problem with the status bar being black/grey on android */}
      <StatusBar
        animated={true}
        backgroundColor="#ffffff"
        hidden={false}
      />
      <Pressable
        onPress={Keyboard.dismiss}
        style={{ height: "100%", width: "100%" }}
      >
        <View style={styles.mainView}>
          <SearchBar
            placeholder="Search"
            onChangeText={async (value: string) => {
              setSearch(value);
              setResults(await searchUniversal(value));
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


export default Tab;

