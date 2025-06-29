import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable, SafeAreaView, Platform, StatusBar, Linking } from 'react-native';
import { Link } from 'expo-router';
import { useNavigation, useRouter } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import { verticalUnits } from '../../jmecheriis/ddunits';
import { logout } from '../../apistuff/logsign';


export default function SettingsUserScreen(){
  const navigation = useNavigation();
  const router = useRouter();
  useEffect(() => {
      navigation.setOptions({ headerShown: false });
  }, [navigation]);


    return(
        <SafeAreaView>
            <View style={styles.header}>

                <Pressable onPress={() => { router.back() }}>
                    <Ionicons name='chevron-back' style={Object.assign({ color: "#9394a5" }, styles.backIcon)} />
                </Pressable>

                <Text style={styles.headerTitle}>Settings</Text>

                <Pressable>
                    <Ionicons name='chevron-back' style={Object.assign({ color: "#fff" }, styles.backIcon)} />
                </Pressable>

            </View>

            <ScrollView style = {{minHeight: verticalUnits(100), backgroundColor: "#fff"}} contentContainerStyle = {{paddingHorizontal: "4%", }}>
                {/* 
                <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                    <Text style={styles.textStyle}>Dark Mode</Text>
                    <Switch
                        trackColor={{false: '#767577', true: '#81b0ff'}}
                        thumbColor={isEnabled ? '#FFFFFF' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
                */}
                <Pressable onPress={() => {Linking.openURL("https://volunteernow.ro/gdpr")}}>
                    <Text style={styles.textStyle}>GDPR</Text>
                </Pressable>

                <Pressable onPress={
                  ()=>{
                    logout();
                    router.navigate("(auth)/login")
                  }
                }>
                    <Text style={styles.logOut}>Log Out</Text>
                </Pressable>

            </ScrollView>

        </SafeAreaView>
        );
    }

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 18,
    },
    logOut: {
        fontSize: 18,
        color: "#ff0000",
    },
    header: {
        width: "100%",
        height: verticalUnits(12),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: "4%",
        backgroundColor: "#ffffff",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, // Adjusts for the status bar on Android
        paddingBottom: verticalUnits(2),
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    backIcon: {
        fontSize: 30,
    },
})
