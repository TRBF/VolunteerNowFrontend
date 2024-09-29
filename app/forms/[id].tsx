import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable, TextInput, SafeAreaView, Platform, StatusBar, Dimensions } from 'react-native';
import { useWindowDimensions } from 'react-native';
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';

function verticalUnits (num:number){
    const height = Dimensions.get("window").height;
    return height/100*num;
}

function horizontalUnits (num:number){
    const width = Dimensions.get("window").width;
    return width/100*num;
}

export default function FormApply() {
    const navigation = useNavigation();
    const router = useRouter();
    const params = useLocalSearchParams();
    const { width, height } = useWindowDimensions();

    // Initialize answers state as an empty array
    const [answers, setAnswers] = useState([]);

    const questions = [
        {"Why do you want to volunteer?": "long"},
        {"What relevant experience do you have?": "long"},
        {"Which post would you like to apply for?": "short"},
    ];

    useEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    // Function to handle input changes
    const handleInputChange = (index, text) => {
        setAnswers(prevAnswers => {
            const newAnswers = [...prevAnswers];
            newAnswers[index] = text;
            return newAnswers;
        });
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>

            <View style={[styles.header, { height: height / 100 * 12 }]}>

                <Pressable onPress={() => { router.back() }}>
                    <Ionicons name='chevron-back' style={Object.assign({ color: "#9394a5" }, styles.backIcon)} />
                </Pressable>

                <Text style={styles.headerTitle}>Application</Text>

                <View></View>
                  
            </View>

            <ScrollView style={{ paddingTop: verticalUnits(5), paddingHorizontal: "5%" }}>
                {questions.map((question, index) => (
                    <Question
                        key={index}
                        index={index}
                        question={Object.keys(question)[0]}
                        type={Object.values(question)[0]}
                        onInputChange={handleInputChange}
                        answers={answers}
                    />
                ))}

                <Pressable style={styles.sendPressable} onPress={() => {router.back()}}>
                    <Text style={styles.sendText}>Send Application</Text>
                </Pressable>

            </ScrollView>

        </SafeAreaView>
    );
}



function Question({ index, question, type, onInputChange, answers }) {
    const { height } = useWindowDimensions();

    let shortAnswer = (
        <TextInput
            style={styles.shortAnswer}
            value={answers[index] || ''}
            onChangeText={(text) => onInputChange(index, text)}
            selectionColor = "#C981EC"
            
        />
    );
    let longAnswer = (
        <TextInput
            multiline={true}
            style={styles.longAnswer}
            value={answers[index] || ''}
            onChangeText={(text) => onInputChange(index, text)}
            selectionColor = "#C981EC"
        />
    );

    let input = type === "short" ? shortAnswer : longAnswer;

    return (
        <View style={[{ marginBottom: height / (7 * 4) }, styles.question]}>
            <Text style={styles.questionText}>{question}</Text>
            {input}
        </View>
    );
}


const styles = StyleSheet.create({
    question: {
    
    },
    questionText: {
        fontSize: 16,
        marginBottom: 14,
        color: "#7211A2",
        fontWeight: "bold",
    },
    shortAnswer: {
        height: verticalUnits(4),
        width: "100%",
        backgroundColor: "#fbf2ff",
        borderColor: "#7211a2b3",
        borderRadius: 5,
        paddingHorizontal: 14,
        color: "#7211A2",
    },
    longAnswer: {
        height: verticalUnits(16),
        width: "100%",
        backgroundColor: "#fbf2ff",
        borderColor: "#7211a2b3",
        borderRadius: 5,
        display: "flex",
        textAlignVertical: "top",
        padding: 14,
        color: "#7211A2",
    },
    header: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: "4%",
        paddingRight: "11%",
        backgroundColor: "#ffffff",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    backIcon: {
        fontSize: 30,
    },
    sendText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
        backgroundColor: "#C981EC",
        paddingVertical: verticalUnits(2),
        marginTop: verticalUnits(12),
        marginBottom: verticalUnits(2),
        borderRadius: 10,
        textAlign: "center",
        textAlignVertical: "center",
    },
    sendPressable: {
        width: "55%", // Set the width to be smaller
        alignSelf: "center", // Center the container within its parent
    },
})
