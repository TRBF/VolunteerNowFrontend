import React, { useState } from 'react';
import { Platform } from 'react-native';
import { StyleSheet, View, Text, TextInput, ScrollView, Pressable, Image, ImageBackground, Dimensions } from 'react-native';
import events from '../../data/events';
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';


const request  = (query: string) => {
    const results = [];
    const queryUpperCase = query.toUpperCase();
    let uncheck, ncheck;
    for(let company in companies){
        uncheck = true, ncheck = true;
        for(let i = 0; i<query.length; i++){
            if(queryUpperCase[i]!=companies[company].name.toUpperCase()[i]) ncheck = false;   
            if(queryUpperCase[i]!=companies[company].username.toUpperCase()[i]) uncheck = false;   
        }
        if(ncheck || uncheck) results.push(companies[company]);
    }
    return results;
}

function Result({company}:any){
    console.log(company)
    return(
        <View style = {styles.result}>
            <Image source = {{uri: company.profilePicture}} style = {styles.resultPFP} resizeMode = "cover"/>
            <View style = {styles.resultInfo}>
                <Text style = {styles.resultName}>{company.name}</Text>
                <Text style = {styles.resultUsername}>{company.username}</Text>
                <Text style = {styles.resultUsername}>{company.type}</Text>
            </View>
        </View>
    ) 
}

function SearchBar(){
    return(
        <View>

    
        </View>)
}


const ExploreScreen = () => {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([{
        name: "",
        username: "",
    }]);
    const [tab, setTab] = useState("all")

    const updateSearch = (search: any) => {
        setSearch(search);
        setResults(request(search));
    }
    return(
        <SafeAreaView>
            <SearchBar
                placeholder="Search"
                onChangeText={updateSearch}
                value={search}
                lightTheme = {true}
                inputStyle = {styles.whitebg}
                inputContainerStyle = {styles.whitebg}
                containerStyle = {styles.whitebg}
                leftIconContainerStyle = {styles.whitebg}
                rightIconContainerStyle = {styles.whitebg}
            />
            {search != "" &&
                <View style={{flexDirection: "row", alignItems: "center", width: "100%"}}>
                    <Pressable onPress={() => setTab("all")} style={[styles.tabText, tab=="all" ? styles.tabActive : styles.tabInactive]}><Text style={{textAlign:"center", color: tab == "all" ? '#7211A2' : "gray"}}>All</Text></Pressable>
                    <Pressable onPress={() => setTab("volunteers")} style={[styles.tabText, tab=="volunteers" ? styles.tabActive : styles.tabInactive]}><Text style={{textAlign:"center", color: tab == "volunteers" ? '#7211A2' : "gray"}}>Volunteers</Text></Pressable>
                    <Pressable onPress={() => setTab("organisers")} style={[styles.tabText, tab=="organisers" ? styles.tabActive : styles.tabInactive]}><Text style={{textAlign: "center", color: tab == "organisers" ? '#7211A2' : "gray"}}>Organisers</Text></Pressable>
                    <Pressable onPress={() => setTab("events")} style={[styles.tabText, tab=="events" ? styles.tabActive : styles.tabInactive, {borderRightWidth: 0}]}><Text style={{textAlign:"center", color: tab == "events" ? '#7211A2' : "gray"}}>Events</Text></Pressable>
                </View>
            }
            <Text style = {[search ? {display:"none"} : {display:"flex"}, styles.exploreText]} >Type something above to start searching for volunteering opportunities!</Text>
            <ScrollView style={[!search ? { display: "none" } : { display: "flex" }, styles.resultsSection]}>
                {
                    // +"s" pentru ca in file-ul cu test data e la singular (volunteer, organiser) si filterele sunt la plural (to avoid confusion)
                    // desi cred ca search ul ar fi mai ok sa fie facut in backend.
                    results.map(
                        (company) =>
                            tab === company.type + "s" || tab === "all"
                            ? <Result key={company.id} company={company} />
                            : null
                    )
                }
            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    whitebg: {
        backgroundColor: "white",
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
        backgroundColor: "#FFF",
    },
    profilePicture: {
        width: 100,
        height: 100,
    },
    resultsSection: {
        backgroundColor: "#FFF",
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
        // borderBottomWidth: 0.2,
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
    },
    resultInfo: {

    },
    tabActive: {
        borderBottomColor: '#7211A2',
    },
    tabInactive: {
        borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    },
    tabText: {
        backgroundColor: "white",
        width: "25%",
        paddingTop: "2%",
        paddingBottom: "2%",
        borderBottomWidth: 2,
    },
}) 



export default ExploreScreen;
