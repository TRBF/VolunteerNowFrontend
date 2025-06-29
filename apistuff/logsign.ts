import AsyncStorage from "@react-native-async-storage/async-storage";
import { url_endpoint } from "./_config";
import * as Sentry from "@sentry/react-native";

const handleError = (error: any) => {
  console.error('Network Error:', error);
  Sentry.captureException(error);
};

const logRequest = (url: string, method: string, headers: any, body: any) => {
  console.log('Request:', { url, method, headers, body });
};

const logResponse = (status: number, body: any) => {
  console.log('Response:', { status, body });
};

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
    const requestBody = {
      username,
      password,
      email,
      first_name,
      last_name,
    };
    logRequest(`${url_endpoint}/api/register/`, 'POST', { 'Content-Type': 'application/json' }, requestBody);

    const response = await fetch(`${url_endpoint}/api/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    logResponse(response.status, await response.text());

    await login(username, password);
    const token = await AsyncStorage.getItem("token");

    const updateRequestBody = {
      gender,
      birthday,
    };
    logRequest(`${url_endpoint}/api/update_user_profile/`, 'POST', { 'Content-Type': 'application/json', 'Authorization': `Token ${token}` }, updateRequestBody);

    const updateResponse = await fetch(`${url_endpoint}/api/update_user_profile/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(updateRequestBody),
    });

    logResponse(updateResponse.status, await updateResponse.text());
    return true;
  } catch(error) {
    handleError(error);
    return false;
  }
}

async function fetchID(){
  const token = await AsyncStorage.getItem("token");
  logRequest(`${url_endpoint}/api/get_id/`, 'GET', { 'Authorization': `Token ${token}` }, null);

  const response = await fetch(
      `${url_endpoint}/api/get_id/`,
      {
        method: "GET",
        headers: {
          "Authorization": `Token ${token}`
        }
      }
    );
  logResponse(response.status, await response.text());
  const json = await response.json();
  return json["id"];
}

export async function login(username: string, password: string) { 
  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);

  logRequest(`${url_endpoint}/api/get_token/`, 'POST', null, formData);

  try{
    const response = await fetch(
        `${url_endpoint}/api/get_token/`,
        {
          method: "POST",
          body: formData,
        }
      );
    logResponse(response.status, await response.text());
    const data = await response.json();
    if(data["token"]){
      await AsyncStorage.setItem("token", data["token"]);
      try {
        const id = await fetchID();
        const strID = id.toString();
        await AsyncStorage.setItem("user_id", strID);
        return 200;
      } 
      catch (error) {
        console.error("Error fetching ID:", error);
        return 500; 
      }
    }
  }
  catch(error){
    handleError(error);
    return 400;
  }
}

export async function logout() {
  await AsyncStorage.removeItem("token");
  await AsyncStorage.removeItem("user_id");
}
