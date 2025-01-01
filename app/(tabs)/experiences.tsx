import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Pressable,
  TextInput,
  ScrollView,
  Modal,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SafeAreaView } from "react-native-safe-area-context";
import * as DocumentPicker from "expo-document-picker";

import { ExperienceSection } from "../components/experiencesection";
import { styles } from "../styles/experiences";
import { getUserAddedParticipations } from "../apistuff/experiences";
import { user_id } from "../apistuff/_config";

export default function DiplomasPastExperiencesScreen() {
  const [searchText, setSearchText] = useState("");
  const [nameText, setNameText] = useState("");
  const [organiserText, setOrganiserText] = useState("");
  const [descriptionText, setDescriptionText] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [visible, setVisible] = useState(false);
  const [experiences, setExperiences] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const updateSearch = (text: string) => {
    setSearchText(text);
  };

  // call function to get events
  async function init() {
    const e = await getUserAddedParticipations(user_id);
    setExperiences(e);
    console.log(experiences)
    setLoading(false);
  }
  
  // check log in and make api call
  useEffect(() => {
    init();
  }, []);



  function startDateUpdate(text: string) {
    if (text.length == 2 && text[1] != "/") text += "/";
    else if (text.length == 5 && text[4] != "/") text += "/";
    setStartDate(text);
  }

  function endDateUpdate(text: string) {
    if (text.length == 2 && text[1] != "/") text += "/";
    else if (text.length == 5 && text[4] != "/") text += "/";
    setEndDate(text);
  }

  function pressableClicked() {
    if (Keyboard.isVisible()) Keyboard.dismiss();
    else setVisible(!visible);
  }

  function getDocument() {
    DocumentPicker.getDocumentAsync({ type: "image/*" });
  }

  return (
    <View style={{ backgroundColor: "#ffffff" }}>
      <SafeAreaView style={[styles.container, { overflow: "visible" }]}>
        <TextInput
          placeholder="Search"
          onChangeText={updateSearch}
          value={searchText}
          style={styles.searchBar}
          placeholderTextColor={"#e3b5f7"}
          returnKeyType="search"
        />

        <View style={{ flex: 1, overflow: "visible", marginTop: 10 }}>
          <ScrollView contentContainerStyle={{ alignItems: "center" }}>
            {experiences.map((object, index) =>
              object.role.toLowerCase().startsWith(searchText.toLowerCase()) ||
              searchText === "" ? (
                <ExperienceSection key={index} experience={object} />
              ) : null
            )}
            <View style={{ height: 50, width: "100%" }}></View>
          </ScrollView>

          <Pressable
            style={styles.addButton}
            onPress={() => {
              setVisible(true);
            }}
          >
            <Ionicons name={"add"} size={24} color={"#FFFFFF"} />
          </Pressable>

          <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
              setVisible(!visible);
            }}
          >
            <Pressable
              style={styles.centeredView}
              onPress={() => {
                pressableClicked();
              }}
            >
              <KeyboardAvoidingView style={styles.modalView} behavior="padding">
                <Text style={styles.modalText}>Add experience</Text>
                <TextInput
                  placeholder="Experience Name"
                  placeholderTextColor={"#cfcfcf"}
                  onChangeText={(text) => {
                    setNameText(text);
                  }}
                  value={nameText}
                  style={styles.modalTextInput}
                />
                <TextInput
                  placeholder="Location"
                  placeholderTextColor={"#cfcfcf"}
                  onChangeText={(text) => {
                    setOrganiserText(text);
                  }}
                  value={organiserText}
                  style={styles.modalTextInput}
                />
                <TextInput
                  placeholder="Description"
                  placeholderTextColor={"#cfcfcf"}
                  onChangeText={(text) => {
                    setDescriptionText(text);
                  }}
                  value={descriptionText}
                  style={styles.modalDescription}
                  multiline={true}
                />
                <Pressable
                  style={styles.uploadImageButton}
                  onPress={() => {
                    getDocument();
                  }}
                >
                  <AntDesign
                    name={"upload"}
                    style={[{ color: "#9394a5" }, styles.uploadIcon]}
                  />
                </Pressable>
                <View
                  style={{
                    width: "100%",
                    height: "8%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                  }}
                >
                  <TextInput
                    placeholder="DD/MM/YY"
                    keyboardType="numeric"
                    placeholderTextColor={"#cfcfcf"}
                    onChangeText={(text) => {
                      startDateUpdate(text);
                    }}
                    value={startDate}
                    style={styles.modalDate}
                  />
                  <TextInput
                    placeholder="DD/MM/YY"
                    keyboardType="numeric"
                    placeholderTextColor={"#cfcfcf"}
                    onChangeText={(text) => {
                      endDateUpdate(text);
                    }}
                    value={endDate}
                    style={styles.modalDate}
                  />
                </View>
                <Pressable style={styles.submitButton}>
                  <Text style={{ color: "white" }}>Submit</Text>
                </Pressable>
              </KeyboardAvoidingView>
            </Pressable>
          </Modal>
        </View>
      </SafeAreaView>
    </View>
  );
}

