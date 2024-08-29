import React, { useState } from 'react';
import { StyleSheet, Button, TouchableOpacity, Text, View, Pressable, TextInput, ScrollView, Image, Modal } from 'react-native';
import {useWindowDimensions} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

function ExperienceSection({ experience }) {
    const [inputText, setInputText] = useState(experience.description);

    const { height, width } = useWindowDimensions();

    const handleEdit = () => {
        return;
        };

    const handleDelete = () => {
        return;
        }

    return (
        <SafeAreaView>
        <View style={styles.experienceSection}>
            <View style={{flexDirection: "column", alignItems: "baseline"}}>
                <Image source={require("../../assets/images/image.jpg")} resizeMode='cover' style={[styles.experienceImage, {
                    height: height / 12,
                    width: height / 12,
                }]} />
                    <Text style={styles.experienceDate}>{experience.firstVolunteered}</Text>

            </View>

            {/* cover pic */}

            {/* Popup when  Edit is clicked */}


            <View style={{ width: "76%" }}>
                <View style={styles.experienceIdentifiers}>
                    <Text style={styles.experienceName}>{experience.name}</Text>
                    {/* name */}
                    <Text style={styles.experienceUsername}>@{experience.username}</Text>
                    {/* username */}
                    {/* date */}
                </View>
                <Text style={styles.experienceDescription}>{experience.description}</Text>
                {/* description (shortened) */}

            </View>
        </View>
        </SafeAreaView>
    );
}
export default ExperienceSection;

const styles = StyleSheet.create({
        experienceSection: {
            display: "flex",
            flexDirection: "row",
            width: "96%",
            padding: "3%",
            marginTop: "5%",
            marginHorizontal: "2%",
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 15,
            backgroundColor: "#FFFFFF",
            shadowColor: '#0000000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        experienceImage: {
            borderRadius: 10,
            marginRight: "5%",
        },
        experienceName: {
            color: "#000000",
        },
        experienceUsername: {
            color: "#9394a5",
        },
        experienceDate: {
            color: "#9394a5",
        },
        experienceDescription: {
            color: "#000000",
        },
        experienceIdentifiers: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "80%",
            marginBottom: "2%",
        },
})
