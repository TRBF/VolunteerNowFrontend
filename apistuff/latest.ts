import AsyncStorage from "@react-native-async-storage/async-storage";
import { url_endpoint } from "./_config";

export async function getCallouts () {
  const token = await AsyncStorage.getItem("token")
  let response = await fetch(
    `${url_endpoint}/api/get_user_callouts`,
    {
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
    }
  );
  const json = await response.json();
  return json;
};
