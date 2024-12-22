import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  View,
  Pressable,
  TextInput,
  ScrollView,
  Image,
  Modal,
} from "react-native";
import { useWindowDimensions } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import ExperienceSection from "../(tabs)/experiences";

function DiplomaSection() {
  const [modalVisible, setModalVisible] = useState(false);

  const handleEdit = () => {
    return;
  };

  const handleDelete = () => {
    return;
  };

  const { height } = useWindowDimensions();
  return (
    <View style={styles.diplomaSection}>
      <Image
        source={require("../../assets/images/image.jpg")}
        resizeMode="cover"
        style={{
          height: height / 12,
          width: height / 12,
        }}
      />
      <Image
        source={require("../../assets/images/image.jpg")}
        resizeMode="cover"
        style={{
          height: height / 4,
          width: "90%",
          marginTop: 10,
        }}
      />

      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{ marginRight: 10 }}
        >
          <Text>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDelete()}
          style={{ marginLeft: 10 }}
        >
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
        visible={modalVisible}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.editExperienceText}>Edit Diploma</Text>
            <View></View>
            <View style={styles.editExperienceButtons}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleEdit()}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default function DiplomasPastExperiencesScreen() {
  const [searchText, setSearchText] = useState("");
  const [tab, setTab] = useState("experiences");
  const firstVolunteered = "12/03/2023";
  const name = "Voluntariat Untold 2024 2 zile";
  const username = "tomoioaga";
  const description =
    "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.";
  const [addDiploma, setAddDiploma] = useState(false);

  const handleAddDiploma = () => {
    return;
  };

  const updateSearch = (text) => {
    setSearchText(text);
  };

  const experienceObjects = [
    { name, username, firstVolunteered, description },
    { name: "Darius", username, firstVolunteered, description },
    { name: "Andrei", username, firstVolunteered, description },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileTabSection}>
        <Pressable
          onPress={() => {
            setTab("experiences");
            console.log(tab);
          }}
          style={styles.buttonsView}
        >
          <View
            style={[
              styles.profileTab,
              tab === "experiences" ? styles.activeTab : styles.inactiveTab,
            ]}
          >
            <Text
              style={[
                styles.profileTabText,
                tab === "experiences"
                  ? styles.activeTabText
                  : styles.inactiveTabText,
              ]}
            >
              Past experiences
            </Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => {
            setTab("diplomas");
            console.log(tab);
          }}
          style={styles.buttonsView}
        >
          <View
            style={[
              styles.profileTab,
              tab === "diplomas" ? styles.activeTab : styles.inactiveTab,
            ]}
          >
            <Text
              style={[
                styles.profileTabText,
                tab === "diplomas"
                  ? styles.activeTabText
                  : styles.inactiveTabText,
              ]}
            >
              Diplomas
            </Text>
          </View>
        </Pressable>
      </View>

      <TextInput
        placeholder="Search"
        onChangeText={updateSearch}
        value={searchText}
        style={styles.searchBar}
      />

      <View style={{ flex: 1 }}>
        {tab === "experiences" && (
          <ScrollView>
            {experienceObjects.map((object, index) =>
              object.name.toLowerCase().startsWith(searchText.toLowerCase()) ||
              searchText === "" ? (
                <ExperienceSection key={index} experience={object} />
              ) : null
            )}
          </ScrollView>
        )}

        {tab === "diplomas" && (
          <View>
            <ScrollView>
              {experienceObjects.map((diploma, index) => (
                <DiplomaSection key={index} diploma={diploma} />
              ))}
            </ScrollView>
            <Pressable
              style={styles.addButton}
              onPress={() => {
                setAddDiploma(true);
              }}
            >
              <Ionicons name={"add"} size={24} color={"#FFFFFF"} />
            </Pressable>

            <Modal
              animationType="slide"
              transparent={true}
              onRequestClose={() => setAddDiploma(false)}
              visible={addDiploma}
            >
              <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                  <Text style={styles.editExperienceText}>Add Diploma</Text>
                  <View></View>
                  <View style={styles.editExperienceButtons}>
                    <TouchableOpacity
                      onPress={() => setAddDiploma(false)}
                      style={styles.closeButton}
                    >
                      <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={handleAddDiploma()}
                      style={styles.closeButton}
                    >
                      <Text style={styles.closeButtonText}>Add</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  buttonsView: {
    width: "40%",
  },
  button: {
    justifyConte: "row",
    backgroundColor: "rgba(114, 17, 162, .7)",
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
    borderColor: "gray",
    borderWidth: 2,
  },
  activeTab: {
    backgroundColor: "rgba(114, 17, 162, .7)",
    borderRadius: 15,
    borderColor: "rgba(114, 17, 162, .7)",
    borderWidth: 2,
  },
  inactiveTabText: {
    color: "#000000",
  },
  activeTabText: {
    color: "#FFFFFF",
  },
  searchBar: {
    height: 50,
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 20,
    paddingLeft: 10,
    marginHorizontal: 10,
    marginTop: "5%",
  },
  addButton: {
    height: "5%",
    width: "5%",
    borderRadius: 50,
    backgroundColor: "#000000",
    marginTop: "5%",
  },
  diplomaSection: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "96%",
    borderWidth: 1,
    marginTop: "5%",
    marginLeft: "2%",
    marginRight: "2%",
    paddingLeft: "5%",
    paddingVertical: "4%",
    paddingRight: "1%",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    shadowColor: "#0000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalOverlay: {
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
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
    backgroundColor: "#7211A2",
    borderRadius: 5,
    marginHorizontal: 20,
    width: "20%",
  },
  closeButtonText: {
    color: "#fff",
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
    justifyContent: "space-between",
    width: "100%",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#7211A2",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});

