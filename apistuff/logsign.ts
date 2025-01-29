import AsyncStorage from "@react-native-async-storage/async-storage";
import { url_endpoint } from "./_config";

export async function signUp(
  username: string,
  password: string,
  email: string,
  first_name: string,
  last_name: string,
  gender: string,
  birthday: Date
) {
  const url = url_endpoint + "/api/register";
  const response = await fetch(url, {
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
      gender: gender,
      birthday: birthday,
    }),
  });
  const newUser = await response.json();
  console.log(newUser);
  return newUser;
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
  else
    return 400
}
