import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Pressable,
  TextInput,
  Image,
  Modal,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as DocumentPicker from "expo-document-picker";
import { deleteUserAddedParticipation, updateUserAddedParticipation } from "../apistuff/experiences";
import { verticalUnits } from "../jmecheriis/ddunits";

import { styles } from "../styles/experiences";
import { url_endpoint } from "../apistuff/_config";

export function ExperienceSection({ experience, refreshExperiences }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [visible, setVisible] = useState(false);
  const [refreshTrigger, setRefresh] = useState(0);

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
    else setVisible(true);
  }

  function getDocument() {
    DocumentPicker.getDocumentAsync({ type: "image/*", multiple: false }).then(
      (result) => {
        console.log(result.assets[0].file);
      }
    );
  }

  useEffect(()=>{
    refreshExperiences();
  }, [refreshTrigger])

  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <Pressable
      onPress={() => {
        pressableClicked();
      }}
    >
      <View style={styles.experienceSection}>
        <View style={{ flexDirection: "column", alignItems: "baseline" }}>
          <Image
            source={{ uri: url_endpoint + "/api" + experience.participation_picture }}
            resizeMode="cover"
            style={[
              styles.experienceImage,
              {
                height: verticalUnits(8.3),
                width: verticalUnits(8.3),
              },
            ]}
          />
          <Text style={styles.experienceDate}>
            {/*experience.experienceStartDate*/}
            REEEE
          </Text>
          <Text style={styles.experienceDate}>{/*experience.days*/} days</Text>
        </View>

        <View style={{ width: "76%" }}>
          <View style={styles.experienceIdentifiers}>
            <Text style={styles.experienceName}>{experience.role}</Text>
            <Text style={styles.experienceUsername}>
              {experience.organiser}
            </Text>
          </View>
          <Text style={styles.experienceDescription}>
            {experience.description}
          </Text>
          {experience.diploma ? (
            <Text style={styles.attestedText}>Attested by diploma</Text>
          ) : (
            <View></View>
          )}
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={visible}
          onRequestClose={() => {
            setConfirmDelete(false);
          }}
        >
          <Pressable
            style={styles.centeredView}
            onPress={() => {
              pressableClicked();
            }}
          >
            <KeyboardAvoidingView style={styles.modalView} behavior="padding">
              <Text style={styles.modalText}>Modify {experience.organiser}</Text>
              <TextInput
                placeholder="What was your role?"
                placeholderTextColor={"#cfcfcf"}
                onChangeText={(text) => {experience.role = text}}
                value={experience.role}
                style={styles.modalTextInput}
              />
              <TextInput
                placeholder="Who organised it?"
                placeholderTextColor={"#cfcfcf"}
                onChangeText={(text) => {experience.organiser = text}}
                value={experience.organiser}
                style={styles.modalTextInput}
              />
              <TextInput
                placeholder="Describe your volunteering experience!"
                placeholderTextColor={"#cfcfcf"}
                onChangeText={(text) => {experience.description = text}}
                value={experience.description}
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
              <View
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <Pressable
                  style={styles.deleteButton}
                  onPress={() => {
                    if (!confirmDelete) setConfirmDelete(true);
                    else {
                      deleteUserAddedParticipation(experience.id);
                      setRefresh(refreshTrigger+1)
                      setVisible(false);
                    }
                  }}
                >
                  <Text style={{ color: "white" }}>
                    {confirmDelete ? "Confirm" : "Delete"}
                  </Text>
                </Pressable>
                <Pressable style={styles.submitButton} onPress={()=>{
                  updateUserAddedParticipation(experience.id, experience.role, experience.organiser, experience.description);
                  setRefresh(refreshTrigger+1)
                  setVisible(false);
                }}>  
                  <Text style={{ color: "white" }}>Done</Text>
                </Pressable>
              </View>
            </KeyboardAvoidingView>
          </Pressable>
        </Modal>
      </View>
    </Pressable>
  );
}
