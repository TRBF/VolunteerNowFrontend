import React, { useState } from "react";
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
import { deleteExperience } from "../apistuff/add";
import { verticalUnits } from "../jmecheriis/ddunits";

import { styles } from "../styles/experiences";
import { url_endpoint } from "../apistuff/_config";

export function ExperienceSection({ experience }) {
  const [role, setNameText] = useState(experience.role);
  const [organiserText, setOrganiserText] = useState(experience.organiser);
  const [descriptionText, setDescriptionText] = useState(
    experience.description
  );
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [visible, setVisible] = useState(false);

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
    DocumentPicker.getDocumentAsync({ type: "image/*", multiple: false }).then(
      (result) => {
        console.log(result.assets[0].file);
      }
    );
  }

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
              <Text style={styles.modalText}>Modify {experience.organiser}</Text>
              <TextInput
                placeholder="Experience Name"
                placeholderTextColor={"#cfcfcf"}
                onChangeText={(text) => {
                  setNameText(text);
                }}
                value={role}
                style={styles.modalTextInput}
              />
              <TextInput
                placeholder="Organisation"
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
                      deleteExperience(experience.id);
                      setVisible(false);
                    }
                  }}
                >
                  <Text style={{ color: "white" }}>
                    {confirmDelete ? "Confirm" : "Delete"}
                  </Text>
                </Pressable>
                <Pressable style={styles.submitButton}>
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
