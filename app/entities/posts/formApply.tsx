import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import { useNavigation, useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { verticalUnits } from "../../jmecheriis/ddunits";

export default function FormApply() {
  const navigation = useNavigation();
  const router = useRouter();

  // Initialize answers state as an empty array
  const [answers, setAnswers] = useState([]);

  const questions = [
    { "Why do you want to volunteer?": "long" },
    { "What relevant experience do you have?": "long" },
    { "Which post would you like to apply for?": "short" },
  ];

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  // Function to handle input changes
  const handleInputChange = (index, text) => {
    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[index] = text;
      return newAnswers;
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={[styles.header, { height: verticalUnits(12) }]}>
        <Pressable
          onPress={() => {
            router.back();
          }}
        >
          <Ionicons
            name="chevron-back"
            style={Object.assign({ color: "#9394a5" }, styles.backIcon)}
          />
        </Pressable>
        <Text style={styles.headerTitle}>Application</Text>
      </View>
      <ScrollView style={{ paddingTop: "5%", paddingHorizontal: "5%" }}>
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
        <Pressable
          style={{ alignItems: "center", marginTop: "10%" }}
          onPress={() => {
            router.back();
          }}
        >
          <Text style={{ color: "#C981EC", fontSize: 16, fontWeight: "bold" }}>
            Apply
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

function Question({ index, question, type, onInputChange, answers }) {
  // Define the TextInput for short and long answers
  let shortAnswer = (
    <TextInput
      style={[{ height: verticalUnits(3.5) }, styles.shortAnswer]}
      value={answers[index] || ""}
      onChangeText={(text) => onInputChange(index, text)}
    />
  );
  let longAnswer = (
    <TextInput
      multiline={true}
      style={[{ height: verticalUnits(14.5) }, styles.longAnswer]}
      value={answers[index] || ""}
      onChangeText={(text) => onInputChange(index, text)}
    />
  );

  // Choose which TextInput to render based on the type
  let input = type === "short" ? shortAnswer : longAnswer;

  return (
    <View style={[{ marginBottom: verticalUnits(3.5) }, styles.question]}>
      <Text style={styles.questionText}>{question}</Text>
      {input}
    </View>
  );
}

const styles = StyleSheet.create({
  question: {},
  questionText: {
    fontSize: 15,
    marginBottom: 14,
  },
  shortAnswer: {
    width: "100%",
    backgroundColor: "#fbf2ff",
    borderColor: "#7211a2b3",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 14,
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
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: "4%",
    paddingRight: "6%",
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
});
