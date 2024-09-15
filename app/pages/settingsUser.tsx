import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, Pressable, Switch, SafeAreaView, Platform, StatusBar } from 'react-native';
import { Link, router } from 'expo-router';
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import { useWindowDimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';



export default function SettingsUserScreen(){
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const navigation = useNavigation();
  const router = useRouter();
  const params = useLocalSearchParams();
  useEffect(() => {
      navigation.setOptions({ headerShown: false });
  }, [navigation]);

    const { height, width } = useWindowDimensions();


    return(
        <SafeAreaView>
            <View style={[styles.header, { height: height / 100 * 12 }]}>
                <Pressable onPress={() => { router.back() }}>
                    <Ionicons name='chevron-back' style={Object.assign({ color: "#9394a5" }, styles.backIcon)} />
                </Pressable>
                <Text style={styles.headerTitle}>Settings</Text>
            </View>
            <View style={styles.bigContainer}>
                <ScrollView>
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
                        <Link href={{
                            pathname: "pages/GDPRFormular"
                            }}>
                            <Text style={styles.textStyle}>GDPR formular</Text>
                        </Link>
                        <Pressable style={{marginVertical: "3%"}}>
                            <Text style={styles.textStyle}>Donate</Text>
                        </Pressable>
                        <Pressable>
                            <Text style={styles.textStyle}>Log Out</Text>
                        </Pressable>
                    </ScrollView>
            </View>
        </SafeAreaView>
        );
    }

const styles = StyleSheet.create({
    bigContainer: {
        marginVertical: 10,
        marginHorizontal: 10,
        },
    textStyle: {
            fontSize: 18,
        },
        header: {
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: "4%",
            paddingRight: "6%",
            backgroundColor: "#ffffff",
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, // Adjusts for the status bar on Android
        },
        headerTitle: {
            fontSize: 16,
            fontWeight: "bold",
        },
        backIcon: {
            fontSize: 30,
        },
    })
