import React, {useState} from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, Modal, TextInput, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import {useWindowDimensions} from 'react-native';
import events from '../../data/events';
import GestureRecognizer from 'react-native-swipe-gestures';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';

function verticalUnits (num:number){
    const height = Dimensions.get("window").height;
    return height/100*num;
}

function horizontalUnits (num:number){
    const width = Dimensions.get("window").width;
    return width/100*num;
}

function Post({postObject}:any){
    const [shareClicked, setShareClicked] = useState(false);
    const [heartClicked, setHeartClicked] = useState(false);
    const [commentClicked, setCommentClicked] = useState(false);
    const [visible, setVisible] = useState(true);
    const { height, width } = useWindowDimensions();
    const [comment, setComment] = useState("");

    const usersComment = [
        { pfp: "pfp1", username: "Darius", text: "Foarte Fain, imi place foarte mult aaaaaaaaaaaaaaaaaaaaaa" },
        { pfp: "pfp2", username: "JonSnow", text: "Foarte Naspa lala lala lala lala lala lala" },
        { pfp: "pfp3", username: "CineSunt", text: "Foarte Indiferent" },
        { pfp: "pfp4", username: "CineSunt", text: "Foarte Indiferent" },
        { pfp: "pfp5", username: "CineSunt", text: "Foarte Indiferent" },
        { pfp: "pfp6", username: "CineSunt", text: "Foarte Indiferent" },
        { pfp: "pfp7", username: "CineSunt", text: "Foarte Indiferent" },
        { pfp: "pfp8", username: "CineSunt", text: "Foarte Indiferent" },
        { pfp: "pfp9", username: "CineSunt", text: "Foarte Indiferent" },
        { pfp: "pfp10", username: "CineSunt", text: "Foarte Indiferent" },
        { pfp: "pfp11", username: "CineSunt", text: "Foarte Indiferent" },
    ];

    const verticalUnits = (percentage: number) => {
        return height/100*percentage;
    }

    const horizontalUnits = (percentage: number) => {
        return width/100*percentage;
    }


    const date = new Date(postObject.date)
    return(
        <View style = {[{marginBottom: height/(7*10)}, styles.post]}>
            <View style = {{width: "12%", aspectRatio: 1, marginRight: "4%"}}>
                <Link href={{
                    pathname: 'org/[username]',
                    params: { username: postObject.username },
                }} asChild>
                    <Pressable style = {{width: "100%", aspectRatio: 1}}>
                        <Image
                          source = {{uri: postObject.profilePicture}}
                          style = {{height: "100%", borderRadius: 1000}}
                          contentFit = "cover"
                        />
                    </Pressable>
                </Link>
            </View>
            <Link href={{
                pathname: 'posts/[id]',
                params: { id: postObject.id }
            }} asChild>
                <Pressable style = {{width: "100%", height: "100%"}}>
                    <View style = {styles.postInfo}>

                        <View style = {styles.creationData}>
                            <View style = {styles.authorData}>
                                <Link href={{pathname: 'org/[username]', params: { username: postObject.username }}} asChild>
                                <Text style = {styles.authorName}>{postObject.name}</Text>
                                </Link>
                                <Link href={{pathname: 'org/[username]', params: { username: postObject.username }}} asChild>
                                <Text style = {styles.authorUsername}>@{postObject.username}</Text>
                                </Link>
                            </View>
                            <Text style = {styles.timeElapsed}>{date.getDay()}/{date.getMonth()}/{date.getFullYear()}</Text>
                        </View>

                        <Text style = {styles.postContent}>{postObject.content}</Text>

                        <View style = {{
                              width: "100%",
                              aspectRatio: 1,
                              marginTop: height/(7*10),
                              marginBottom: height/(7*10),
                        }}>
                            <Image source = {postObject.imageLink} style = {styles.featureImage} contentFit = "cover"/>
                        </View>
                        <View style = {styles.bottomSection}>


                            <View style = {styles.rightButtons}>
                                <Pressable style = {{flexDirection: 'row'}} onPress = {() => setHeartClicked(!heartClicked)}>
                                    <FontAwesome name={heartClicked ? 'heart' : 'heart-o'} style = {[{color: heartClicked ? '#7211A2' : '#9394a5', marginRight: '5%'}, styles.icon]}/>
                                    <Text style = {{color: heartClicked ? '#7211A2' : '#9394a5', textAlignVertical: 'center'}}>123</Text>
                                </Pressable>
                                <Pressable  style = {{flexDirection: 'row'}} onPress = {() => setCommentClicked(!commentClicked)}>
                                    <FontAwesome name={'comment-o'} style = {[{color: '#9394a5', marginRight: '5%'}, styles.icon]}/>
                                    <Text style = {{color: '#9394a5', textAlignVertical: 'center'}}>123</Text>
                                </Pressable>
                                <Pressable onPress = {() => setShareClicked(!shareClicked)}>
                                    <FontAwesome name={shareClicked ? 'send' : 'send-o'} style = {[{color: '#9394a5'}, styles.icon]}/>
                                </Pressable>
                            </View>
                            <Text style = {styles.volunteersNeeded}>{postObject.volunteerCount} volunteers needed</Text>
                        </View>
                    </View>
                </Pressable>
            </Link>
            <GestureRecognizer
                style={{flex: 1}}
                onSwipeDown={ () => { setCommentClicked(false) } }>
                  <Modal
                      animationType="slide"
                      visible={commentClicked}
                      transparent={true}
                      onRequestClose={() => {
                          setVisible(!commentClicked);
                      }}>
                      <View style={styles.centeredView}>
                          <View style={styles.modalView}>
                              <View style = {{width: "14%", height: verticalUnits(0.8), backgroundColor:"#dedede", borderRadius: 50, marginBottom: verticalUnits(1)}}></View>
                              <Text style={styles.modalText}>Comments</Text>
                          </View>
                          <ScrollView>
                              {usersComment.map((comment, index) => (
                                  <Comment
                                      key={index}
                                      pfp={comment.pfp}
                                      username={comment.username}
                                      text={comment.text}
                                  />
                              ))}
                          </ScrollView>
                          <View style = {{
                                  display: "flex", 
                                  flexDirection: "row", 
                                  width: "94%", 
                                  margin: "auto", 
                                  paddingVertical: "1%",
                                  borderTopWidth: 1,
                                  borderBottomWidth: 1,
                                  borderTopColor: "#eeeeee",
                                  borderBottomColor: "#eeeeee",
                          }}>
                              <View style = {{width: "12%"}}>
                                  <Image
                                      source={{ uri: "https://via.placeholder.com/40x40/000000/000000" }}
                                      style={{ aspectRatio: 1, width: "100%", borderRadius: 40}}
                                  />
                              </View>
                              <TextInput 
                                  placeholder = "Add comment..." 
                                  style = {[styles.commentInput, {height: verticalUnits(5), width: "80%"}]}
                                  returnKeyType = "send"/>

                          </View>
                      </View>
                  </Modal>
               </GestureRecognizer>

        </View>
    )
}

const Comment = ({ pfp, username, text }) => {
    return (
        <View style={styles.commentContainer}>
            <View style = {{ width: "12%" }}>
                <Image
                    source={{ uri: "https://via.placeholder.com/40x40/000000/000000" }}
                    style={{ aspectRatio: 1, width: "100%", borderRadius: 40}}
                />
            </View>
            <View style={{flexDirection: "column", paddingLeft: "3%"}}>
                <Text style={{fontWeight: "semibold", color:"gray"}}>@{username}</Text>
                <Text>{text}</Text>
            </View>
        </View>
    );
}

const Tab = () => {
    return (
        <View style={{ backgroundColor: '#ffffff', }}>
            <SafeAreaView>
                <ScrollView style={{ backgroundColor: "#ffffff" }}>

                    <View style={styles.bannerContainer}>
                    
                        <Link href={{
                            pathname: "profile",
                        }} asChild>
                            <Pressable style = {styles.headerImageContainerLeft}>
                                <Image style={{aspectRatio: 1, borderRadius: 50}} source={require("../../assets/images/chira_pfp.jpeg")} />
                            </Pressable>
                        </Link>

                        <Image style={styles.bannerImage} source={require("../../assets/images/logo2.png")} />

                        <Link href={{ pathname: "pages/applicationsStatus" }} style={styles.headerImageContainerRight}>
                            <Entypo name={'documents'} style={{ color: '#7211A2', fontSize: 26, alignItems: "center"}} />
                        </Link>

                    </View>

                    {events.map((event: any) => <Post postObject={{ ...event }} key={event.content} />)}

                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    post: {
        backgroundColor: "#ffffff",
        borderColor: "#C981EC",
        display: "flex",
        flexDirection: "row",
        paddingTop: "5%",
        paddingBottom: "5%",
        paddingLeft: "5%",
        paddingRight: "5%",
        fontFamily: "Roboto",
    },

    authorData: {
        display: "flex",
        flexDirection: "row",
    },

    postInfo: {
        width:"85%",
        fontFamily: "Roboto",
    },

    creationData: {
        display:"flex",
        flexDirection:"row",
        width: "95%",
        justifyContent: "space-between",
        fontFamily: "Roboto",
    },

    authorName: {
        fontWeight: "700",
        color: "#000000",
        fontSize: 14,
        fontFamily: "Roboto",
        marginRight: "5%"
    },

    authorUsername: {
        color: "#9394a5",
    },

    timeElapsed: {
        color: "#9394a5",
    },

    bannerContainer: {
        //borderWidth:3,
        //borderTopColor: "#ffffff",
        //borderBottomColor: '#7211A2',
        //borderRightColor: '#7211A2',
        //borderLeftColor: '#7211A2',

        shadowColor: '#0000000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,

        backgroundColor: '#ffffff',

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',

        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,

        paddingTop: "15%",
        paddingBottom: "5%",
        paddingHorizontal: "5%",

        marginTop: "-13%",
        marginBottom: "5%",
    },

    bannerImage: {
      aspectRatio: 4,
      width: "60%",
      resizeMode: 'contain',
    },

    headerImageContainerLeft: {
      width: "11%",
      aspectRatio: 1,
      resizeMode: 'cover',
    },

    headerImageContainerRight: {
      width: "8%",
      aspectRatio: 1,
      resizeMode: 'cover',
    },

    buttonText: {
        color: '#000000',
        fontSize: 16,
    },

    postContent: {
        width: "90%",
        marginTop: "2%",
        color: "#000",
        fontFamily: "sans-serif",
        fontSize: 14,
        lineHeight: 18,
    },

    featureImage: {
        borderRadius: 15,
        width: "100%",
        height: "100%",
    },

    bottomSection: {
        display: "flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        width:"98%",
    },

    postImage: {
        width:"80%",
        borderRadius: 10,
    },

    volunteersNeeded: {
        color: "#9394a5", 
    },

    rightButtons: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },

    icon: {
        fontSize: 18,
    },
    modalOverlay: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    centeredView: {
        backgroundColor: "#fcfcfc",
        flex: 1,
        height: "80%",
        marginTop:"20%",
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        shadowColor: '#0000000',
        shadowOpacity: 0.55,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalContainer: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalText: {
        fontSize: 18,
        textAlign: "center",
        width: "100%",
    },
    modalView: {
       flexDirection: "column",
       justifyContent: "space-between",
       alignItems: 'center',
       paddingTop: "5%",
       paddingBottom: "5%",
       borderBottomWidth: 1,
       borderBottomColor: "#eeeeee",
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    commentContainer: {
        flexDirection: "row",
        marginHorizontal: "3%",
        marginTop: "3%",
        borderRadius: 15,
        backgroundColor: "#fcfcfc",
        borderColor: "gray",
    },
    commentInput: {
        paddingLeft: "5%",
        paddingRight: "5%",
    },
    
})

export default Tab;

