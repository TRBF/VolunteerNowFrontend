import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Pressable, Image, ImageBackground, Dimensions } from 'react-native';
import events from '../../data/events';
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { search_event, search_organisers, search_volunteers } from '../get-post/search';


const companies = events.map((x)=>(x));

function Result({company}:any){
    return(
        <Pressable>
            <View style = {styles.result}>
                <Image source = {{uri: company.profilePicture}} style = {styles.resultPFP} resizeMode = "cover"/>
                <View style = {styles.resultInfo}>
                    <Text style = {styles.resultName}>{company.name}</Text>
                    <Text style = {styles.resultUsername}>@{company.username}</Text>
                </View>
            </View>
        </Pressable>
    ) 
}

function SearchBar({placeholder, onChangeText}){

    const [focus, setFocus] = useState(false);

    return(
        <TextInput 
            onChangeText={(value) => {onChangeText(value)}}
            onFocus={() => setFocus(true)}
            placeholder={placeholder}
            style = {[{color: "white", backgroundColor: focus ? "6%" : "6%"}, styles.searchBar]}
            selectionColor= "#C981EC"
        />
    )
}


const Tab = () => {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([{
        name: "",
        username: "",
    }]);

    return(
        <View style = {{backgroundColor: "#ffffff"}}>
            <SafeAreaView>
                <View style = {styles.mainView}>
                    <SearchBar
                        placeholder="Search"
                        onChangeText={async (value: string) => {
                            setSearch(value);

                            // Await the request function to get the actual results
                            const results = await request(value); 
                            setResults(results); // Set the resolved results
                        }}
                    />
                    <Text style = {[search ? {display:"none"} : {display:"flex"}, styles.exploreText]} >
                    Type something above to start searching for volunteering opportunities!
                    </Text>
                    <ScrollView style = {[!search ? {display:"none"} : {display:"flex"}, styles.resultsSection]} >
                      {
                        results.map((company) => <Result company = {company}/>)
                      }
                    </ScrollView>
                </View>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
      backgroundColor: "white",
    },
    bg: {
        position: "absolute",
        height: "100%",
        bottom: 0, 
    },
    exploreText: {
        width: "100%",
        height: "100%",
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
        height: "100%",
    },
    result: {
        display: "flex",
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-start",
        paddingLeft: "5%",
        paddingRight: "5%",
        paddingTop: "2%",
        paddingBottom: "2%",
    },
    resultPFP: {
        height: Dimensions.get('window').height/16,
        width: Dimensions.get('window').height/16,
        marginRight: "5%",
        borderRadius: 50,
    },
    resultName: {
        color: "#000",
        fontWeight: "600",
        fontSize: 15,
    },
    resultUsername: {
      color: "#C981EC"
    },
    resultInfo: {

    },
    searchBar: {
        backgroundColor: "#FBF2FF",
        borderRadius: 30,
        width: "90%",
        margin: "auto",
        marginTop: "2%",
        marginBottom: "2%",
        padding: "2%",
        paddingLeft: "5%",
        color: "#7211A2",
    }
}) 

const request = async (query: string) => {
    if (!query) return []; // Return empty array if search query is empty

    try {
        // Execute all search functions asynchronously
        const [eventResults, organiserResults, volunteerResults] = await Promise.all([
            search_event(query),
            search_organisers(query),
            search_volunteers(query)
        ]);

        // Combine the results (optional)
        const combinedResults = [...eventResults, ...organiserResults, ...volunteerResults];
        console.log(combinedResults);
        return combinedResults;
    } catch (error) {
        console.error("Error fetching search results: ", error);
        return [];
    }
};


export default Tab;
