import React, {useState} from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, Modal } from 'react-native';
import { Image } from 'expo-image';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import {useWindowDimensions} from 'react-native';
import events from '../../data/events';
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { Link } from 'expo-router';


function Post({postObject}:any){
    const [shareClicked, setShareClicked] = useState(false);
    const [heartClicked, setHeartClicked] = useState(false);
    const [commentClicked, setCommentClicked] = useState(false);
    const [visible, setVisible] = useState(true);
    const { height, width } = useWindowDimensions();

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


    const date = new Date(postObject.date)
    return(
        //<View style = {[{backgroundColor: postObject.forProfit ? "white" : "#FBF2FF"}, styles.post]}>
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
                            {/*
                                <Pressable onPress = {() => setSaveClicked(!saveClicked)}>
                                    <FontAwesome name='bookmark' style = {Object.assign({color: saveClicked ? "yellow" : "#9394a5"}, styles.icon)}/>
                                </Pressable> */}
                                <Pressable onPress = {() => setShareClicked(!shareClicked)}>
                                    <FontAwesome name={shareClicked ? 'send' : 'send-o'} style = {[{color: '#9394a5'}, styles.icon]}/>
                                </Pressable>
                                <Pressable onPress = {() => setHeartClicked(!heartClicked)}>
                                    <FontAwesome name={heartClicked ? 'heart' : 'heart-o'} style = {[{color: '#9394a5'}, styles.icon]}/>
                                </Pressable>
                                <Pressable onPress = {() => setCommentClicked(!commentClicked)}>
                                    <FontAwesome name={'comment-o'} style = {[{color: '#9394a5'}, styles.icon]}/>
                                </Pressable>
                                <Modal
                                      animationType="slide"
                                      visible={commentClicked}
                                      onRequestClose={() => {
                                          setVisible(!commentClicked);
                                      }}>
                                      <View style={styles.centeredView}>
                                          <View style={styles.modalView}>
                                              <Text style={styles.modalText}>Comments</Text>
                                              <Pressable
                                                  onPress={() => setCommentClicked(!commentClicked)}>
                                                  <FontAwesome name={'close'} style = {[{color: '#9394a5'}, styles.icon]}/>
                                              </Pressable>
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
                                      </View>
                                  </Modal>
                            </View>

                            <Text style = {styles.volunteersNeeded}>{postObject.volunteerCount} volunteers needed</Text>

                        </View>
                    </View>
                </Pressable>
            </Link>
        </View>
    )
}

const Comment = ({ pfp, username, text }) => {
    return (
        <View style={styles.commentContainer}>
        <Image
          source={{ uri: "https://via.placeholder.com/40x40/000000/000000" }}
          style={{ width: 50, height: 50, borderRadius: 40 }}
        />
            <View style={{flexDirection: "column", paddingLeft: "3%"}}>
                <Text style={{fontWeight: "semibold", color:"gray"}}>@{username}</Text>
                <Text>{text}</Text>
            </View>
        </View>
    );
}

const Tab = () => {
    const handleSecondImagePress = () => console.log('Second image pressed');

    return (
        <View style={{ backgroundColor: '#ffffff', }}>
            <SafeAreaView>
                <ScrollView style={{ backgroundColor: "#ffffff" }}>
                    <View style={styles.bannerContainer}>
                        <Pressable onPress={handleSecondImagePress} style = {styles.headerImageContainerLeft}>
                            <Image style={{aspectRatio: 1, borderRadius: 50}} source={require("../../assets/images/image.jpg")} />
                        </Pressable>
                        <Image style={styles.bannerImage} source={require("../../assets/images/logo2.png")} />
                        <Link href={{ pathname: "pages/applicationsStatus" }} style={styles.headerImageContainerRight}>
                            <Image style={{ aspectRatio: 1, width: 40, height: 40}} source={require("../../assets/images/chat2.png")} />
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
        width:"95%",
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
        gap: 10, 
    },

    icon: {
        fontSize: 18,
    },
    modalOverlay: {
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    centeredView: {
        width: "90%",
        marginHorizontal: "auto",
    },
    modalContainer: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',

    },
    modalContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    modalText: {
        fontSize: 18,
        marginRight: 20,
    },
    modalTextInput: {
        borderRadius: 15,
        borderColor: "gray",
        borderWidth: 1,
        },
        modalView: {
            flexDirection: "row",
            marginHorizontal: 5,
            marginVertical: 15,
            justifyContent: "space-between",
           backgroundColor: 'white',
           alignItems: 'center',
           shadowColor: '#000',
        },
        buttonOpen: {
          backgroundColor: '#F194FF',
        },
        buttonClose: {
          backgroundColor: '#2196F3',
        },
        textStyle: {
          color: 'white',
          fontWeight: 'bold',
          textAlign: 'center',
        },
    commentContainer: {
        flexDirection: "row",
        marginHorizontal: 7,
        marginVertical: 15,
        borderRadius: 15,
        padding: 5,
        backgroundColor: "#FFFFFF",
        borderColor: "gray",
        }
    
})

export default Tab;

