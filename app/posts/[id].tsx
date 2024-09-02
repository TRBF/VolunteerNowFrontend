import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable, TextInput } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { Image } from 'expo-image';
import { useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import { useWindowDimensions } from 'react-native';

import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';

function Requirement({requirement}) {
    return(
      <Text style = {styles.requirement}>{ Object.keys(requirement)[0] }: { Object.values(requirement) } </Text>
    )  
}

function Question({question}) {
    const {height, width} = useWindowDimensions();
    const title = Object.keys(question)[0] 
    const type = Object.values(question)[0] 
    
    let shortAnswer = <TextInput style = {[{height: height/(7*4)}, styles.shortAnswer]}/>
    let longAnswer = <TextInput multiline = { true } style = {[{height: height/7}, styles.longAnswer]}/>
    
    let input: any;
    if(type == "short") input = shortAnswer;
    if(type == "long") input = longAnswer;

    return(
      <View style = {[{marginBottom: height/(7*4)},styles.question]}>
          <Text style = {styles.questionText}>{ title }</Text>
          { input }
      </View>
    )  
}

export default function Tab() {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const postData = {
      title: "UNTOLD",
      authorUsername: "untold",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      requirements: [
        {"minimum age": 10},
        {"number of past events": 5},
        {"minimum": 10},
      ],
      questions: [
        {"Why do you want to volunteer?": "long"},
        {"What relevant experience do you have?": "long"},
        {"Which post would you like to apply for?": "short"},
      ],
      pfpLink: "https://yt3.googleusercontent.com/v6i9aPzHM2BA6oIOGA-k3vsUxpeeQpl3qM9PCgYyQeqkoXQ-83byoLYCV5jaOAx4GHhfW7NjVg=s900-c-k-c0x00ffffff-no-rj",
      coverLink: "https://viacluj.tv/wp-content/uploads/2022/08/untold-3.jpg",
      
  }


  return (
      <View style = {{flexGrow: 1, backgroundColor: "#ffffff"}}>
          <SafeAreaView style = {{flex: 1}}>
              <View style = {[{height: height/100*7}, styles.header]}>
                  <Pressable onPress={ () => {router.back()} }>
                      <Ionicons name='chevron-back' style = {Object.assign({color: "#9394a5"}, styles.backIcon)}/>
                  </Pressable>
                  <Text style = { styles.headerTitle }>{ postData.title }</Text>
                  <Entypo name='dots-three-horizontal' style = {Object.assign({color: "#9394a5"}, styles.settingsIcon)}/>
              </View>
              <ScrollView contentContainerStyle = {{width: "100%", paddingBottom: height/(7*5)}}>
                  <View style = {[{height: height/7}, styles.coverImageContainer]}>
                      <Image style = {styles.coverImage} source={{uri: postData.coverLink}}/>
                  </View>
                  <View style = {styles.mainSection}>
                      <View style = {styles.topSection}>    
                          <View style = {[{marginTop: -height/(7*2), marginBottom: height/(7*5), height: height/8}, styles.eventImageContainer]}>
                              <Image style = {[{borderRadius: height/9}, styles.eventImage]} source={{uri: postData.pfpLink}}/>
                          </View>
                          <View style = {[{marginBottom: height/(7*10)}, styles.titleAndAuthor]}>
                              <Text style = {styles.title}>{ postData.title}</Text>
                              <Text style = {styles.author}>by @<Link href = {{
                                    pathname: 'org/[username]',
                                    params: { username: postData.authorUsername }
                              }}>{ postData.authorUsername }</Link></Text>
                          </View>
                      </View>
                      <View style = {[{marginBottom: height/(7*5)}, styles.infoSection]}>
                            <Text style = {[{marginBottom: 14}, styles.description]}>{ postData.description }</Text>
                            {postData.requirements.map((requirement:any) => <Requirement requirement = {{...requirement}}/>)}
                      </View>
                      <View style = {{backgroundColor: "white"}}>
                            {postData.questions.map((question:any) => <Question question = {{...question}}/>)}
                      </View>
                      
                      <Pressable style = {[{marginTop: height/(7*5), }, styles.volunteerPressable]}>
                          <Text style = { styles.buttonText }>Apply</Text>
                      </Pressable>
                  </View>
              </ScrollView>
          </SafeAreaView>
      </View>
  );
}

const styles = StyleSheet.create({
    header: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: "4%",
        paddingRight: "6%",
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    backIcon: {
        fontSize: 30,
    },
    settingsIcon: {
        fontSize: 20,
    },
    coverImageContainer: {
        width: "100%",
    },
    coverImage: {
        width: "100%",
        height: "100%",
    },
    mainSection: {
        paddingLeft: "6%",
        paddingRight: "6%",
    },
    topSection: {

    },
    eventImageContainer: {
        aspectRatio: 1,
    },
    eventImage: {
      width: "100%",
      height: "100%",
    },
    titleAndAuthor: {

    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    author: {
        fontSize: 14,
        color: "#C981EC",

    },
    infoSection: {
    },
    description: {
        fontSize: 14,
    },
    requirement: {
        color: "#000000",
    },
    question: {

    },
    questionText: {
        fontSize: 15,
        marginBottom: 14,
    },
    volunteerPressable: {
        width: "40%",
        marginLeft: "30%",
        marginRight: "30%",
        borderRadius: 100,
        aspectRatio: 3,
        backgroundColor: "#7211a2b3",
        color: "white", 
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
    },
    shortAnswer: {
        width: "100%",
        backgroundColor: "#fbf2ff",
        borderColor: "#7211a2b3",
        borderWidth: 1,
        borderRadius: 5,
        padding: 14,
    },
    longAnswer: {
        width: "100%",
        backgroundColor: "#fbf2ff",
        borderColor: "#7211a2b3",
        borderWidth: 1,
        borderRadius: 5,
        display: "flex",
        textAlignVertical: "top",
        padding: 14,
    },
    buttonText: {
      color: "white",
      fontSize: 16,
      fontWeight: "semibold"
    },
})
