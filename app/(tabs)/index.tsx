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
        <View style = { styles.post }>
            <View style = { styles.postHeader }>

            </View>
            <View style = { styles.imageContainer }>
                <Image source = {{uri: postObject.featureImage}}/>
            </View>
            <View style = { styles.interactionSection }>
              
              {/* LIKES */}
              
              {/* VOLUNTEERS NEEDED */}

            </View>
            <View style = { styles.description }>

            </View>



        </View>
    )
}

const Tab = () => {
    return(
    <View style = {{backgroundColor:"#ffffff"}}>
        <SafeAreaView>
            <ScrollView style = {{backgroundColor: "#ffffff"}}>
                {events.map((event:any) => <Post postObject = {{...event}} key = {event.content}/>)}
            </ScrollView>
        </SafeAreaView>
    </View>
    )
}

const styles = StyleSheet.create({
})

export default Tab;

