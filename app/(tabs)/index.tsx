import React, {useState} from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
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
    const [saveClicked, setSaveClicked] = useState(false);
    const [shareClicked, setShareClicked] = useState(false);
    const { height, width } = useWindowDimensions();

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
                            </View>

                            <Text style = {styles.volunteersNeeded}>{postObject.volunteerCount} volunteers needed</Text>

                        </View>
                    </View>
                </Pressable>
            </Link>
        </View>
    )
}

const Tab = () => {
    const handleSecondImagePress = () => console.log('Second image pressed');

    return (
        <View style={{ backgroundColor: '#ffffff' }}>
            <ScrollView style={{ backgroundColor: "#ffffff" }}>
            <View style={styles.bannerContainer}>
                
                    <View style={styles.bannerImageContainer}>

                        <Pressable onPress={handleSecondImagePress}>
                            <Image style={styles.bannerImage3} source={require("../../assets/images/profile.png")} />
                        </Pressable>
                        
                        <Image style={styles.bannerImage} source={require("../../assets/images/logo2.png")} />
                        
                        <Pressable onPress={handleSecondImagePress}>
                            <Image style={styles.bannerImage2} source={require("../../assets/images/chat2.png")} />
                        </Pressable>

                    </View>

            </View>
            
                {events.map((event: any) => <Post postObject={{ ...event }} key={event.content} />)}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    post: {
        backgroundColor: "#ffffff",
        borderColor: "#C981EC",
        //borderBottomWidth: 0.2,
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
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#7211A2',
        borderRightWidth: 1,
        borderRightColor: '#7211A2',
        borderLeftWidth: 1,
        borderLeftColor: '#7211A2',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 1,
        height: 100,
        backgroundColor: '#ffffff',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },

    bannerImageContainer: {
        flexDirection: 'row', // Align images horizontally
        justifyContent: 'center', // Center images horizontally
        alignItems: 'center', // Center images vertically
        width: '100%',
      },

      bannerImage: {
        width: 200, // Adjust this width to fit your design
        height: 100,
        resizeMode: 'contain',
        marginTop: 20,
        marginHorizontal: 10, // Reduced space between images
      },

      bannerImage2: {
        width: 35
        , // Adjust this width to fit your design
        height: 50,
        resizeMode: 'contain',
        marginTop: 20,
        marginHorizontal: 43, // Reduced space between images
      },

      bannerImage3: {
        width: 50, // Adjust this width to fit your design
        height: 47,
        resizeMode: 'contain',
        marginTop: 20,
        marginHorizontal: 35, // Reduced space between images
      },


    bannerButton: {
        backgroundColor: '#ffffff',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
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
        fontSize: 16,
    },
})

export default Tab;

