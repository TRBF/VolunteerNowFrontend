import AsyncStorage from "@react-native-async-storage/async-storage";

export async function placeholderTestingStore(){
  try {
    await AsyncStorage.setItem("account_id", "1");
  } catch (e) {
    console.log(e);
  }
}

export async function isLoggedIn() {
  try {
    const token = await AsyncStorage.getItem("token");
    console.log("letoken", token)
    return token != null;
  } catch (e) {
    console.log(e);
  }
}

export async function getAccountToken() {
  return await AsyncStorage.getItem("token");
}

export async function getAccountId() {
  return await AsyncStorage.getItem("user_id");
}

