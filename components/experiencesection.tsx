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
  ScrollView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { deleteUserAddedParticipation, updateUserAddedParticipation, updateUserAddedParticipationPicture } from "../apistuff/experiences";
import { verticalUnits } from "../jmecheriis/ddunits";

import { styles } from "../styles/experiences";
import { url_endpoint } from "../apistuff/_config";
import { DatePickerModal } from "react-native-paper-dates";

import * as ImagePicker from "expo-image-picker";

function getImageSource(link) {
  if (!link) return undefined;
  if (link.startsWith('http')) return { uri: link };
  return { uri: url_endpoint + "/api" + link };
}

export function ExperienceSection({ experience, refreshExperiences }) {
  const [visible, setVisible] = useState(false);
  const [refreshTrigger, setRefresh] = useState(0);

  const [count, setCount] = useState(0)
  const [countType, setCountType] = useState("0")

  const [pictureURI, setPictureURI] = useState("")
  const [datePickerText, setDatePickerText] = useState("When?")
  const [hours, setHours] = useState(experience.hours)

  const start_date = new Date(experience.start_date)
  const end_date = new Date(experience.end_date)

  async function init(){
    if(end_date.getFullYear()-start_date.getFullYear()>0){
      setCount(end_date.getFullYear()-start_date.getFullYear()) 
      setCountType("years")
      if(end_date.getFullYear()-start_date.getFullYear() == 1)
        setCountType("year")
    }
    else if(end_date.getMonth()-start_date.getMonth()>0){
      setCount(end_date.getMonth()-start_date.getMonth())
      setCountType("months")
      if(end_date.getMonth()-start_date.getMonth() == 1)
        setCountType("month")

    }
    else if(end_date.getDate()-start_date.getDate()>0){
      setCount(end_date.getDate()-start_date.getDate())
      setCountType("days")
      if(end_date.getDate()-start_date.getDate() == 1)
        setCountType("date")
    }
    console.log(experience.participation_picture)
    if(experience.participation_picture)
      setPictureURI(`${url_endpoint}/api${experience.participation_picture}`)
    
    if(start_date && end_date)
      setDatePickerText("Interval set!")
  }

  // date stuff
  const [range, setRange] = React.useState({ startDate: undefined, endDate: undefined });
  const [open, setOpen] = React.useState(false);

   const onDismiss = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

 const onConfirm = React.useCallback(
    ({ startDate, endDate }) => {
      setOpen(false);
      setRange({ startDate, endDate });
    },
    [setOpen, setRange]
  );
  // end of date stuff

  async function getUserAddedParticipationPicture() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    setPictureURI(result.assets[0].uri);
  }

  function pressableClicked() {
    if (Keyboard.isVisible()) Keyboard.dismiss();
    else setVisible(true);
  }

  useEffect(()=>{
    refreshExperiences();
  }, [refreshTrigger])

  useEffect(()=>{
    init(); 
  }, [])

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
            source={getImageSource(experience.participation_picture)}
            resizeMode="cover"
            style={[
              styles.experienceImage,
              {
                height: verticalUnits(8.3),
                width: verticalUnits(8.3),
              },
            ]}
          />
          <Text style={styles.experienceDate}>{count} {countType}</Text>
          <Text style={styles.experienceDate}>{experience.hours} hours</Text>
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
            <ScrollView style={styles.modalView}>
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
              {
                !pictureURI ? 
                <Pressable
                  style={styles.uploadImageButton}
                  onPress={() => {
                    getUserAddedParticipationPicture();
                  }}
                >
                    <Ionicons
                      name={"camera-outline"}
                      style={[{ color: "#9394a5" }, styles.uploadIcon]}
                    />
                </Pressable>
                :
                <Pressable
                  style={styles.uploadImageButton}
                  onPress={() => {
                    getUserAddedParticipationPicture();
                  }}>
                  <Image
                    source={{ uri: pictureURI }}
                    resizeMode="cover"
                    style={styles.modalImage}
                  />
                </Pressable>
              }
              <View
                style={{
                  width: "100%",
                  height: "8%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  marginBottom: verticalUnits(3),
                }}
              >
                <Pressable style = {styles.intervalPressable} onPress={() => setOpen(true)}>
                  <Text style = {start_date && end_date ? styles.unsetIntervalText : styles.setIntervalText}>{datePickerText}</Text>
                </Pressable>
                <DatePickerModal
                  locale="en"
                  mode="range"
                  visible={open}
                  onDismiss={onDismiss}
                  startDate={range.startDate}
                  endDate={range.endDate}
                  onConfirm={onConfirm}
                  label="When did you volunteer?"
                />
                <TextInput 
                  style = {styles.modalDate} 
                  keyboardType="numeric" 
                  placeholderTextColor = "#cfcfcf" 
                  placeholder = "No. hours?" 
                  secureTextEntry={false}
                  onChangeText={(text) => {setHours(text)}}
                  value={hours}
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
                  updateUserAddedParticipation(experience.id, experience.role, experience.organiser, experience.description, range.startDate, range.endDate, hours, pictureURI);
                  setRefresh(refreshTrigger+1)
                  setVisible(false);
                }}>  
                  <Text style={{ color: "white" }}>Done</Text>
                </Pressable>
              </View>
            </ScrollView>
          </Pressable>
        </Modal>
      </View>
    </Pressable>
  );
}
