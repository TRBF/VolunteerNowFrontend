import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, TextInput, ScrollView, Image, Modal, KeyboardAvoidingView, Keyboard } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {useWindowDimensions} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as DocumentPicker from 'expo-document-picker';

function ExperienceSection({ experience }) {
    const { height, width } = useWindowDimensions();
    const [nameText, setNameText] = useState(experience.name);
    const [organiserText, setOrganiserText] = useState(experience.username);
    const [descriptionText, setDescriptionText] = useState(experience.description);
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [ visible, setVisible ] = useState(false);

    function startDateUpdate(text: string){
        if(text.length==2 && text[1]!='/') text+='/'
        else if(text.length==5 && text[4]!='/') text+='/'
        setStartDate(text)
    }

    function endDateUpdate(text: string){
        if(text.length==2 && text[1]!='/') text+='/'
        else if(text.length==5 && text[4]!='/') text+='/'
        setEndDate(text)
    }

    function pressableClicked(){
        console.log('eee')
        if(Keyboard.isVisible()) Keyboard.dismiss()
        else setVisible(!visible)
    }

    function getDocument(){
        DocumentPicker.getDocumentAsync({type: "image/*"})
    }

    return (
        <Pressable onPress={() => {pressableClicked()}}>
            <View style={styles.experienceSection}>
                <View style={{flexDirection: "column", alignItems: "baseline"}}>
                    <Image source={require("../../assets/images/image.jpg")} resizeMode='cover' style={[styles.experienceImage, {
                        height: height / 12,
                        width: height / 12,
                    }]} />
                    <Text style={styles.experienceDate}>{experience.firstVolunteered}</Text>
                </View>

                <View style={{ width: "76%" }}>
                    <View style={styles.experienceIdentifiers}>
                        <Text style={styles.experienceName}>{experience.name}</Text>
                        <Text style={styles.experienceUsername}>@{experience.username}</Text>
                    </View>
                    <Text style={styles.experienceDescription}>{experience.description}</Text>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={visible}
                    onRequestClose={() => {
                        setVisible(!visible);
                    }}>
                    <Pressable style={styles.centeredView} onPress={() => {pressableClicked()}}>
                        <KeyboardAvoidingView style={styles.modalView} behavior='padding'>
                            <Text style = {styles.modalText}>Modify {experience.name}</Text>
                            <TextInput
                                placeholder="Experience Name"
                                placeholderTextColor={"#cfcfcf"}
                                onChangeText={(text) => {setNameText(text)}}
                                value={nameText}
                                style={styles.modalTextInput}
                            />
                            <TextInput
                                placeholder="Organisation"
                                placeholderTextColor={"#cfcfcf"}
                                onChangeText={(text) => {setOrganiserText(text)}}
                                value={organiserText}
                                style={styles.modalTextInput}
                            />
                            <TextInput
                                placeholder="Description"
                                placeholderTextColor={"#cfcfcf"}
                                onChangeText={(text) => {setDescriptionText(text)}}
                                value={descriptionText}
                                style={styles.modalDescription}
                                multiline={true}
                            />
                            <Pressable style = {styles.uploadImageButton} onPress = {() => {getDocument()}}>
                                <AntDesign name={'upload'} style = {[{color: '#9394a5'}, styles.uploadIcon]}/>
                            </Pressable>
                            <View style = {{width: "100%", height: "8%", display: "flex", flexDirection: "row", justifyContent: "space-evenly"}}>
                                <TextInput
                                    placeholder="DD/MM/YY"
                                    keyboardType='numeric'
                                    placeholderTextColor={"#cfcfcf"}
                                    onChangeText={(text) => {startDateUpdate(text)}}
                                    value={startDate}
                                    style={styles.modalDate}
                                />
                                <TextInput
                                    placeholder="DD/MM/YY"
                                    keyboardType='numeric'
                                    placeholderTextColor={"#cfcfcf"}
                                    onChangeText={(text) => {endDateUpdate(text)}}
                                    value={endDate}
                                    style={styles.modalDate}
                                />
                            </View>
                            <Pressable style = {styles.submitButton}>
                                <Text style = {{color: "white"}}>Submit</Text>
                            </Pressable>
                        </KeyboardAvoidingView>
                    </Pressable>
                </Modal>
            </View>
        </Pressable>
    );
}

export default function DiplomasPastExperiencesScreen() {
    const [searchText, setSearchText] = useState("");
    const [nameText, setNameText] = useState("");
    const [organiserText, setOrganiserText] = useState("");
    const [descriptionText, setDescriptionText] = useState("");
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [ visible, setVisible ] = useState(false);

    const firstVolunteered = "12/03/2023";
    const name = "Voluntariat Untold 2024 2 zile";
    const username = "tomoioaga";
    const description = "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.";
    const imageLink = "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" 

    const updateSearch = (text: string) => {
        setSearchText(text);
    };

    const experienceObjects = [
        { name, username, firstVolunteered, description, imageLink },
        { name, username, firstVolunteered, description, imageLink },
        { name, username, firstVolunteered, description, imageLink },
        { name, username, firstVolunteered, description, imageLink },
        { name, username, firstVolunteered, description, imageLink },
        { name, username, firstVolunteered, description, imageLink },
    ];


    function startDateUpdate(text: string){
        if(text.length==2 && text[1]!='/') text+='/'
        else if(text.length==5 && text[4]!='/') text+='/'
        setStartDate(text)
    }

    function endDateUpdate(text: string){
        if(text.length==2 && text[1]!='/') text+='/'
        else if(text.length==5 && text[4]!='/') text+='/'
        setEndDate(text)
    }

    function pressableClicked(){
        console.log('eee')
        if(Keyboard.isVisible()) Keyboard.dismiss()
        else setVisible(!visible)
    }

    function getDocument(){
        DocumentPicker.getDocumentAsync({type: "image/*"})
    }

    return (
        <View style = {{backgroundColor: "#ffffff", flex: 1}}>
            <SafeAreaView style= {[styles.container, {overflow: 'visible'}]}>
                <TextInput
                    placeholder="Search"
                    onChangeText={updateSearch}
                    value={searchText}
                    style={styles.searchBar}
                />

                <View style={{ flex: 1, overflow: 'visible'}}>
                      <ScrollView>
                            {experienceObjects.map((object, index) => (
                                (object.name.toLowerCase().startsWith(searchText.toLowerCase()) || searchText === "") ? (
                                    <ExperienceSection key={index} experience={object} />
                                ) : null
                            ))}
                            <View style = {{height: 50, width: "100%"}}></View>
                      </ScrollView>

                      <Pressable style={styles.addButton} onPress={() => {setVisible(true)}}>
                            <Ionicons name={'add'} size={24} color={"#FFFFFF"} />
                      </Pressable>
                      
                      <Modal
                          animationType="slide"
                          transparent={true}
                          visible={visible}
                          onRequestClose={() => {
                              setVisible(!visible);
                          }}>
                          <Pressable style={styles.centeredView} onPress={() => {pressableClicked()}}>
                              <KeyboardAvoidingView style={styles.modalView} behavior='padding'>
                                  <Text style = {styles.modalText}>Add experience</Text>
                                  <TextInput
                                      placeholder="Experience Name"
                                      placeholderTextColor={"#cfcfcf"}
                                      onChangeText={(text) => {setNameText(text)}}
                                      value={nameText}
                                      style={styles.modalTextInput}
                                  />
                                  <TextInput
                                      placeholder="Organisation"
                                      placeholderTextColor={"#cfcfcf"}
                                      onChangeText={(text) => {setOrganiserText(text)}}
                                      value={organiserText}
                                      style={styles.modalTextInput}
                                  />
                                  <TextInput
                                      placeholder="Description"
                                      placeholderTextColor={"#cfcfcf"}
                                      onChangeText={(text) => {setDescriptionText(text)}}
                                      value={descriptionText}
                                      style={styles.modalDescription}
                                      multiline={true}
                                  />
                                  <Pressable style = {styles.uploadImageButton} onPress = {() => {getDocument()}}>
                                      <AntDesign name={'upload'} style = {[{color: '#9394a5'}, styles.uploadIcon]}/>
                                  </Pressable>
                                  <View style = {{width: "100%", height: "8%", display: "flex", flexDirection: "row", justifyContent: "space-evenly"}}>
                                      <TextInput
                                          placeholder="DD/MM/YY"
                                          keyboardType='numeric'
                                          placeholderTextColor={"#cfcfcf"}
                                          onChangeText={(text) => {startDateUpdate(text)}}
                                          value={startDate}
                                          style={styles.modalDate}
                                      />
                                      <TextInput
                                          placeholder="DD/MM/YY"
                                          keyboardType='numeric'
                                          placeholderTextColor={"#cfcfcf"}
                                          onChangeText={(text) => {endDateUpdate(text)}}
                                          value={endDate}
                                          style={styles.modalDate}
                                      />
                                  </View>
                                  <Pressable style = {styles.submitButton}>
                                      <Text style = {{color: "white"}}>Submit</Text>
                                  </Pressable>
                              </KeyboardAvoidingView>
                          </Pressable>
                      </Modal>

                </View>
            </SafeAreaView>
        </View>
    );
}



const styles = StyleSheet.create({
    experienceSection: {
        display: "flex",
        flexDirection: "row",
        width: "96%",
        padding: "3%",
        marginTop: "5%",
        marginHorizontal: "2%",
        borderRadius: 15,
        backgroundColor: "#FFFFFF",
        shadowColor: '#0000000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        zIndex: 1,
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
    container: {
        width: "100%",
        height: "100%",
        color: "white",
    },
    buttonsView: {
        width: "40%",
    },
    button: {
        backgroundColor: 'rgba(114, 17, 162, .7)',
    },
    profileTabSection: {
        justifyContent: "space-around",
        width: "100%",
        flexDirection: "row",
        marginTop: "3%",
        height: 50,
    },
    profileTab: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
    },
    profileTabText: {
        fontSize: 15,
    },
    inactiveTab: {
       padding: "5%",
        backgroundColor: "#FFFFFF",
        borderRadius: 15,
        shadowColor: '#000000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    activeTab: {
        backgroundColor: 'rgba(114, 17, 162, .7)',
        borderRadius: 15,
        shadowColor: '#000000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    inactiveTabText: {
        color: "#000000",
    },
    activeTabText: {
        color: "#FFFFFF",
    },
    searchBar: {
        height: "6%",
        borderRadius: 20,
        paddingLeft: 10,
        marginHorizontal: 10,
        backgroundColor: "#ffffff",
        marginTop: "5%",
        marginBottom: "2%",
        shadowColor: '#000000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        zIndex: 3,
    },
    diplomaSection: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        width: "96%",
        marginTop: "5%",
        marginLeft: "2%",
        marginRight: "2%",
        paddingLeft: "5%",
        paddingVertical: "4%",
        paddingRight: "1%",
        borderRadius: 15,
        backgroundColor: "#FFFFFF",
        shadowColor: '#0000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    editExperienceText: {
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: "5%",
    },
    editExperienceButtons: {
        flexDirection: "row",
        justifyContent: 'space-between',
        width: "100%",
    },
    addButton: {
        position: 'absolute',
        bottom: "4%",
        right: "8%",
        aspectRatio: 1,
        width: "15%",
        borderRadius: 100,
        backgroundColor: '#7211A2',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },

    centeredView: {
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
       marginTop: 22,
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        height: "80%",
        width: "90%",
        shadowColor: '#000',
        shadowOffset: {
          width: 2,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        padding: "5%",

        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    modalTextInput: {
      width: '100%',
      height: "6%",
      minHeight: "6%",
      borderRadius: 15,
      paddingLeft: 10,
      backgroundColor: "#f6f6f6",
    },
    modalDescription: {
      width: '100%',
      height: "21%",
      minHeight: "21%",
      borderRadius: 15,
      paddingLeft: "5%",
      paddingRight: "5%",
      paddingTop: 10,
      paddingBottom: 10,
      backgroundColor: "#f6f6f6",
      textAlignVertical: "top"
    },
    modalDate: {
      width: '30%',
      height: '100%',
      backgroundColor: "#f6f6f6",
      textAlign: "center",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      borderRadius: 15,
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    uploadImageButton: {
      width: '100%',
      height: "15%",
      backgroundColor: "#f6f6f6",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 15,
    },
    uploadIcon: {
      fontSize: 40, 
      color: "#cfcfcf",
    },
    submitButton: {
      backgroundColor: "#7211A2",
      paddingVertical: "3%",
      paddingHorizontal: "15%",
      borderRadius: 15,
      marginBottom: "5%",
    },
    modalText: {
      fontSize: 16,
      fontWeight: "normal",
    }
});
