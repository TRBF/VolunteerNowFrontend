import React, {useState} from 'react';
import { Image, StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import {useWindowDimensions} from 'react-native';
import events from '../../data/events'; 

//function PostFeature({imageLink}:any){
//    const {height, width} = useWindowDimensions();
//    if(imageLink!=null){
//        return (
//            <Image source = {{uri: imageLink}} style = {[{height: height/5}, styles.postImage]} resizeMode = "cover"/>
//        )
//    }
//    else return(null)
//}

function Post({postData}:any){
    const [likeClicked, setLikeClicked] = useState(false);
    const [sendClicked, setSendClicked] = useState(false);
    const [volunteerClicked, setVolunteerClicked] = useState(false);
    const [saveClicked, setSaveClicked] = useState(false);
    const [shareClicked, setShareClicked] = useState(false);
    const date = new Date(postData.date)
    return(
        <View style = {styles.post}>
            
            <View style = {[{aspectRatio: 1}, styles.pfpContainer]}>
              <Image source = {{uri: postData.profilePicture}} style = {{height: "100%", borderRadius: 1000}} resizeMode = "cover"/>
            </View>

            <View style = {styles.postInfo}>
                
                <View style = {styles.postAuthored}> 
                    <Text style = {styles.name}>{postData.name}</Text>
                    <Text style = {styles.username}>@{postData.username}</Text>
                    <Text style = {styles.timeElapsed}>{date.getDay()}/{date.getMonth()}/{date.getFullYear()}</Text>
                </View>

                <Text style = {styles.postContent}>{postData.content}</Text>

                {/** <PostFeature imageLink = {postData.imageLink}/> **/}
            
                <View style = {[{aspectRatio: 1}, styles.featureImage]}>
                  <Image source = {{uri: postData.imageLink}} style = {{height: "100%", borderRadius: 15}} resizeMode = "cover"/>
                </View>

                <View style = {styles.postStats}> 

                    <View style = {styles.leftButtons}>
                        <Pressable onPress = {() => {!likeClicked ? postData.likeCount++ : postData.likeCount--; setLikeClicked(!likeClicked)}}>
                            <Text style = {Object.assign({color: likeClicked ? "red" : "#9394a5"}, styles.statsText)}>
                                 <Ionicons name={likeClicked ? 'heart' : 'heart-outline'} style = {styles.icon}/>{postData.likeCount} { /* has to fill in */}
                            </Text>
                        </Pressable>
                        <Pressable onPress = {() => {!sendClicked ? postData.sendCount++ : postData.sendCount--; setSendClicked(!sendClicked)}}>
                            <Text style = {Object.assign({color: sendClicked ? "blue" : "#9394a5"}, styles.statsText)}>
                                <FontAwesome name={sendClicked ? 'send' : 'send-o'} style = {styles.icon}/> {postData.sendCount}
                            </Text>
                        </Pressable>
                        <Pressable onPress = {() => {!volunteerClicked ? postData.volunteerCount++ : postData.volunteerCount--; setVolunteerClicked(!volunteerClicked)}}>
                            <Text style = {Object.assign({color: volunteerClicked ? "#7211A2" : "#9394a5"}, styles.statsText)}>
                                <Ionicons name={volunteerClicked ? 'hand-right-sharp' : 'hand-right-outline'} style = {styles.icon}/> {postData.volunteerCount}
                            </Text>
                        </Pressable>
                    </View>

                    <View style = {styles.rightButtons}>
                        <Pressable onPress = {() => setSaveClicked(!saveClicked)}>
                            <FontAwesome name='bookmark' style = {Object.assign({color: saveClicked ? "yellow" : "#9394a5"}, styles.icon)}/>
                        </Pressable>
                        <Pressable onPress = {() => setShareClicked(!shareClicked)}>
                            <Entypo name='share' style = {Object.assign({color: "#9394a5"}, styles.icon)}/>
                        </Pressable>
                    </View>

                </View>
            </View>
        </View>
    )
}

const Tab = () => {
    const testPost = {
        name: 'Mihnea Tomoiaga',
        username: 'zizou',
        timePosted: '01/05/2024',
        timeElapsed: null,
        content: 'Help zizou now! Volunteer right now and be Zidan\'s goalkeeper for the 2025 season. Limited availability, so hurry up!',
        likeCount: 100,
        volunteerCount: 200,
        sendCount: 49,
        imageLink: 'https://www.arabobserver.com/wp-content/uploads/2021/04/Zidan.jpg',
    }
    const {height, width} = useWindowDimensions();
    return(
    <ScrollView style = {{backgroundColor: "#ffffff"}}>
        <Image source = {require("../../assets/images/vlight.png")} style = {[styles.headerImage, {
                height: height/12,
                width: width/5,
            }]}/>
        {events.map((event:any) => <Post postData = {{...event}}/>)}
    </ScrollView>

    )
}

const styles = StyleSheet.create({
    headerImage: {
        marginTop: "15%",
        marginBottom: "15%",
        marginLeft: "auto",
        marginRight: "auto",
    },

    post: {
        backgroundColor:"#ffffff",
        // borderColor: "#7211A2",
        borderColor: "#9394a5",
        borderBottomWidth: 0.2,
        display: "flex",
        flexDirection: "row",
        padding: "3%",
        fontFamily: "Roboto",
    },

    pfpContainer: {
        width: "12%",
        marginRight: "3%",
    },

    postInfo: {
        width:"85%", 
        fontFamily: "Roboto",
    },

    postAuthored: {
        display:"flex",
        flexDirection:"row",
        gap: 10,
        fontFamily: "Roboto",
    },

    name: {
        fontWeight: "700",
        color: "#000000",
        fontSize: 14,
        fontFamily: "Roboto",
    },

    username: {
        color: "#9394a5", 
    },

    timeElapsed: {
        color: "#9394a5", 
    },

    postContent: {
        marginTop: "1%",
        marginBottom: "5%",
        paddingRight: "3%",
        color: "#000",
        fontFamily: "sans-serif",
        fontSize: 14,
        lineHeight: 18,
    },


    postStats: {
        display: "flex",
        flexDirection:"row",
        gap: 10,
        justifyContent:"space-between",
        alignItems:"center",
        marginTop: "4%",
        width:"100%",
        paddingLeft: "3%",
        paddingRight:"6%",
    },

    featureImage: {
        width: "100%",
        paddingRight: "3%",
    },
    
    statsText: {
        fontSize: 15,
    },

    postImage: {
        width:"80%",
        borderRadius: 10,
    },
    
    leftButtons:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 20,
    },

    rightButtons: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10, 
    },

    icon: {
        fontSize: 14,
    },
})

export default Tab;

