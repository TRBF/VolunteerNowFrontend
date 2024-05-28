import React, { useState } from 'react';
import { Platform } from 'react-native';
import { StyleSheet, View, Text, TextInput, ScrollView, Pressable, Image, ImageBackground, Dimensions } from 'react-native';
import events from '../../data/events';

const companies = events.map((x)=>(x));


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
    return(
        <Pressable>
            <View style = {styles.result}>
                <Image source = {{uri: company.profilePicture}} style = {styles.resultPFP} resizeMode = "cover"/>
                <View style = {styles.resultInfo}>
                    <Text style = {styles.resultName}>{company.name}</Text>
                    <Text style = {styles.resultUsername}>{company.username}</Text>
                </View>
            </View>
        </Pressable>
    ) 
}

function SearchBar({placeholder, onChangeText}){
    return(
        <TextInput onChangeText={(value) => {onChangeText(value)}} placeholder={placeholder} style = {styles.searchBar}/>
    )
}


const Tab = () => {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([{
        name: "",
        username: "",
    }]);

    return(
        <View style = {[{height: "100%"}]}>
            <ImageBackground source = {require("../../assets/images/backgroundlight.jpeg")}  resizeMode='cover' style = {{flex: 1}}>
                <SearchBar
                    placeholder="Search"
                    onChangeText={(value:string) => {
                        setSearch(value);
                        setResults(request(value));
                    }}
                />
                <Text style = {[search ? {display:"none"} : {display:"flex"}, styles.exploreText]} >Type something above to start searching for volunteering opportunities!</Text>
                <ScrollView style = {[!search ? {display:"none"} : {display:"flex"}, styles.resultsSection]} >{
                    results.map((company) => <Result company = {company}/>
                    )}
                </ScrollView>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    whitebg: {
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
    searchBar: {
        height: "6%",
        backgroundColor: "#ebcafa",
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



export default Tab;
