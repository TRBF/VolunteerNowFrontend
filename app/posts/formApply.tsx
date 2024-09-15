import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable, TextInput, SafeAreaView } from 'react-native';
import { useWindowDimensions } from 'react-native';

export default function FormApply(){
      const questions = [
        {"Why do you want to volunteer?": "long"},
        {"What relevant experience do you have?": "long"},
        {"Which post would you like to apply for?": "short"},
      ]

    return(
        <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
              <ScrollView>
                    {questions.map((question:any) => <Question question = {{...question}}/>)}
            </ScrollView>
          </SafeAreaView>
        );
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

const styles = StyleSheet.create({
        question: {

        },
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
    })
