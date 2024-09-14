import React, { useState } from 'react';
import { StyleSheet, Button, TouchableOpacity, Text, View, Pressable, TextInput, ScrollView, Image, Modal, KeyboardAvoidingView, Platform } from 'react-native';
import {useWindowDimensions} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

function ExperienceSection({ experience }) {
    const { height, width } = useWindowDimensions();

    return (
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

        </View>
    );
}

export default function DiplomasPastExperiencesScreen() {
    const [searchText, setSearchText] = useState("");
    const [tab, setTab] = useState("experiences");
    const firstVolunteered = "12/03/2023";
    const name = "Voluntariat Untold 2024 2 zile";
    const username = "tomoioaga";
    const description = "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.";
    const [ visible, setVisible ] = useState(false);

    const updateSearch = (text: string) => {
        setSearchText(text);
    };

    const experienceObjects = [
        { name, username, firstVolunteered, description },
        { name: "Darius", username, firstVolunteered, description },
        { name: "Andrei", username, firstVolunteered, description },
    ];

    return (
        <View style = {{backgroundColor: "#ffffff"}}>
            <SafeAreaView style= {[styles.container, {overflow: 'visible'}]}>
                <TextInput
                    placeholder="Search"
                    onChangeText={updateSearch}
                    value={searchText}
                    style={styles.searchBar}
                />

                <View style={{ flex: 1, overflow: 'visible', marginTop: 10}}>
                      <ScrollView>
                            {experienceObjects.map((object, index) => (
                                (object.name.toLowerCase().startsWith(searchText.toLowerCase()) || searchText === "") ? (
                                    <ExperienceSection key={index} experience={object} />
                                ) : null
                            ))}
                            {experienceObjects.map((object, index) => (
                                (object.name.toLowerCase().startsWith(searchText.toLowerCase()) || searchText === "") ? (
                                    <ExperienceSection key={index} experience={object} />
                                ) : null
                            ))}
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
                          <View style={styles.centeredView}>
                              <View style={styles.modalView}>
                                  <Text style={styles.modalText}>Hello World!</Text>
                                  <Pressable
                                      style={[styles.button, styles.buttonClose]}
                                      onPress={() => setVisible(!visible)}>
                                      <Text style={styles.textStyle}>Hide Modal</Text>
                                  </Pressable>
                              </View>
                          </View>
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
        height: 40,
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
    modalOverlay: {
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
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
    closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#7211A2',
        borderRadius: 5,
        marginHorizontal: 20,
        width: "20%"
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: "center",
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
       margin: 20,
       backgroundColor: 'white',
       borderRadius: 20,
       height: "80%",
       width: "90%",
       alignItems: 'center',
       shadowColor: '#000',
       shadowOffset: {
          width: 2,
          height: 2,
       },
       shadowOpacity: 0.25,
       shadowRadius: 4,
       elevation: 5,
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
});
