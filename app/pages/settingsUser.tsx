import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable, SafeAreaView, Platform, StatusBar, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import { useNavigation, useRouter } from "expo-router";
import { useWindowDimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

function verticalUnits (num:number){
    const height = Dimensions.get("window").height;
    return height/100*num;
}

function horizontalUnits (num:number){
    const width = Dimensions.get("window").width;
    return width/100*num;
}


export default function SettingsUserScreen(){
  //const [isEnabled, setIsEnabled] = useState(false);
  //const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const navigation = useNavigation();
  const router = useRouter();
  useEffect(() => {
      navigation.setOptions({ headerShown: false });
  }, [navigation]);

    const { height } = useWindowDimensions();


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

                <Link href={{
                    pathname: "pages/GDPRFormular"
                    }}>
                    <Text style={styles.textStyle}>GDPR formular</Text>
                </Link>

                <Pressable style={{marginVertical: "3%"}}>
                    <Text style={styles.textStyle}>Donate</Text>
                </Pressable>

                <Pressable>
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
