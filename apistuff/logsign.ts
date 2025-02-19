import AsyncStorage from "@react-native-async-storage/async-storage";
import { url_endpoint } from "./_config";
import * as Sentry from "sentry-expo";

export async function signUp(
  username: string,
  password: string,
  email: string,
  first_name: string,
  last_name: string,
  gender: string,
  birthday: Date
) {
  try {
    await fetch(`${url_endpoint}/api/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
        first_name: first_name,
        last_name: last_name,
      }),
    });

    await login(username, password);
    const token = await AsyncStorage.getItem("token");

    await fetch(`${url_endpoint}/api/update_user_profile/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify({
        gender: gender,
        birthday: birthday,
      }),
    });
    return true;
  } catch(error) {
    Sentry.Native.captureException(error);
    return false;
  }
}

async function fetchID(){
  const token = await AsyncStorage.getItem("token");
  const response = await fetch(
      `${url_endpoint}/api/get_id/`,
      {
        method: "GET",
        headers: {
          "Authorization": `Token ${token}`
        }
      }
    )
  const json = await response.json()
  console.log(json)
  return json["id"] 
}

export async function login(username: string, password: string) { 
  const formData = new FormData();

  formData.append("username", username);
  formData.append("password", password);
  try{
    const response = await fetch(
        `${url_endpoint}/api/get_token/`,
        {
          method: "POST",
          body: formData,
        }
      )
    const data = await response.json()
    if(data["token"]){
      await AsyncStorage.setItem("token", data["token"])
      try {
        const id = await fetchID()
        const strID = id.toString()
        await AsyncStorage.setItem("user_id", strID)
        return 200;
      } 
      catch (error) {
        console.error("Error fetching ID:", error);
        return 500; 
      }
    }
  }
  catch(error){
    Sentry.Native.captureException(error);
    return 400;
  }
}

export async function logout() {
  await AsyncStorage.removeItem("token");
  await AsyncStorage.removeItem("user_id");
}
