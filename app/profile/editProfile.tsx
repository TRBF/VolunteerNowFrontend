import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Image,
  SafeAreaView,
  Platform,
  StatusBar,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation, useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { verticalUnits } from "../../jmecheriis/ddunits";
import { getAccountId } from "../../apistuff/account";
import { getProfile, updateProfilePicture, updateUser } from "../../apistuff/profile";
import { url_endpoint } from "../../apistuff/_config";

export default function EditProfileScreen() {
  const navigation = useNavigation();
  const router = useRouter();

  const [id, setID] = useState("1");
  const [username, setUsername] = useState("@loading");
  const [firstName, setFirstName] = useState("Loading");
  const [secondName, setSecondName] = useState("Loading");
  const [description, setDescription] = useState("Loading");
  const [pfpLink, setPfpLink] = React.useState<string | null>(null);

  const [isLoading, setLoading] = useState(true);
  //
  //async function init(){
  //  getAccountId()
  //    .then((account_id) => {setID(account_id)})
  //
  //  getProfile(id)
  //    .then((account_profile) => {profile = account_profile})
  //    .then(() => { setUsername(profile["username"]) })
  //    .then(() => { setFirstName(profile["first_name"]) })
  //    .then(() => { setSecondName(profile["last_name"]) })
  //    .then(() => { setDescription(profile["description"]) })
  //    .then(() => { setPfpLink(profile["profile_picture"]) })
  //    .then(() => { setLoading(false) })
  //}

  async function init(){
    const account_id = await getAccountId(); // Ensure account_id is fetched before proceeding
    setID(account_id);

    const profile = await getProfile(account_id); // Use account_id, not id
    setUsername(profile["username"]);
    setFirstName(profile["first_name"]);
    setSecondName(profile["last_name"]);
    setDescription(profile["description"]);
    setPfpLink(profile["profile_picture"]);

    setLoading(false);
  }

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
    init()
  }, [navigation]);

  async function getProfilePicture() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    
    console.log("URI: ", result.assets[0].uri);
    if (!result.canceled) {
      return result.assets[0].uri;
    } 
    return null;
  }

  async function changeProfilePicture(){    const pfpURI = await getProfilePicture()
    const formData = new FormData();
    formData.append('profile_picture', {
      uri: pfpURI,  // File URI you get from the picker
      type: 'image/jpeg', // Correct MIME type
      name: 'profile_picture.jpg',
    });
    await updateProfilePicture(formData);
    const profile = await getProfile(id);
    setPfpLink(profile["profile_picture"] + `?time=${Date.now()}`)
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0} // Adjust this value as needed
    >
      {!isLoading &&
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.header}>
            <Pressable
              onPress={() => {
                router.back();
              }}
            >
              <Ionicons
                name="chevron-back"
                style={[{ color: "#9394a5" }, styles.backIcon]}
              />
            </Pressable>

            <Text style={styles.headerTitle}>Edit Profile</Text>

            <Pressable>
              <Ionicons
                name="chevron-back"
                style={[{ color: "#fff" }, styles.backIcon]}
              />
            </Pressable>
          </View>

          <ScrollView
            style={{ paddingHorizontal: "5%", backgroundColor: "#fff" }}
          >
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: `${url_endpoint}/api${pfpLink}?time=${Date.now()}`}}
                style={styles.profileImage}
                resizeMode="cover"
              />

              <Pressable
                onPress={changeProfilePicture}
              >
                <Text style={styles.modifyButtonText}>Change Profile Picture</Text>
              </Pressable>
            </View>

            <View style={styles.container}>
              <View style={styles.nameRow}>
                <View style={styles.nameField}>
                  <EditBar
                    value={firstName}
                    setValue={setFirstName}
                    title={"First Name"}
                  />
                </View>

                <View style={styles.nameField}>
                  <EditBar
                    value={secondName}
                    setValue={setSecondName}
                    title={"Last Name"}
                  />
                </View>
              </View>

              <View style={styles.editContainer}>
                <EditBar
                  value={username}
                  setValue={setUsername}
                  title={"Username"}
                />
              </View>

              <EditBar
                value={description}
                setValue={setDescription}
                title={"Description"}
                numberOfLines={6}
              />
            </View>

            <View style={styles.buttonContainer}>
              <Pressable
                style={styles.button}
                onPress={async () => {
                  await updateUser(
                    username,
                    firstName,
                    secondName,
                    description
                  );
                  router.back();
                }}
              >
                <Text style={styles.topProfileButton}>Save</Text>
              </Pressable>
            </View>
          </ScrollView>
        </SafeAreaView>
      }
    </KeyboardAvoidingView>
  );
}

function EditBar({ value, setValue, title, numberOfLines = 1 }) {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        value={value}
        onChangeText={(text) => setValue(text)}
        placeholder={title}
        style={[
          styles.textInput,
          numberOfLines > 1 ? { textAlignVertical: "top" } : null, // Apply textAlignVertical only if numberOfLines > 1
          { backgroundColor: "#ffffff" },
        ]}
        selectionColor="#C981EC"
        multiline={true}
        numberOfLines={numberOfLines}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: verticalUnits(2.5),
    backgroundColor: "#fff",
  },
  nameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nameField: {
    width: "48%",
  },
  editContainer: {
    marginVertical: "5%",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 5,
  },
  textInput: {
    borderRadius: 8,
    width: "100%",
    padding: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    color: "#000000",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    padding: verticalUnits(1),
  },
  button: {
    marginTop: verticalUnits(10),
    width: "50%",
  },
  topProfileButton: {
    width: "100%",
    paddingVertical: verticalUnits(1.5),
    textAlign: "center",
    borderRadius: 15,
    color: "#FFFFFF",
    backgroundColor: "#C981EC",
    fontWeight: "400",
    fontSize: 16,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 125,
    height: 125,
    borderRadius: 75,
    marginTop: "5%",
  },
  modifyButtonText: {
    color: "#C981EC",
    fontWeight: "500",
    marginTop: 10,
  },
  header: {
    width: "100%",
    height: verticalUnits(12),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: "4%",
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

