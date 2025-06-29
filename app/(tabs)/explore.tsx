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

import { Result } from "../../components/searchresult";
import { SearchBar } from "../../components/searchbar";
import { styles } from "../../styles/explore";
import { searchUniversal } from "../../apistuff/search";
import { url_endpoint } from "../../apistuff/_config";

interface SearchResult {
  username: string;
  profile_picture: string;
}

const Tab = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);

  const processSearchResults = (res: any) => {
    if (Array.isArray(res)) {
      return res.filter(user => user && user.username).map(user => ({
        ...user,
        profile_picture: user.profile_picture ? 
          `${url_endpoint}${user.profile_picture}` : 
          `${url_endpoint}/default-profile-picture.jpg`
      }));
    } else if (res && res.username) {
      return [{
        ...res,
        profile_picture: res.profile_picture ? 
          `${url_endpoint}${res.profile_picture}` : 
          `${url_endpoint}/default-profile-picture.jpg`
      }];
    }
    return [];
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#ffffff", flex: 1 }}>
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
              if (value.trim()) {
                const res = await searchUniversal(value);
                console.log(res[0])
                setResults(processSearchResults(res));
              } else {
                setResults([]);
              }
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
            {results.length > 0 ? (
              results.map((user) => (
                <Result 
                  key={user.username} 
                  user={user} 
                />
              ))
            ) : (
              <Text style={[styles.exploreText, { paddingTop: "20%" }]}>No results found</Text>
            )}
          </ScrollView>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

export default Tab;

