import AsyncStorage, { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { url_endpoint } from "./_config";
import { getUserAddedParticipations } from "./experiences";

export async function getProfile(id: String) {
  let profile = {};
  
  try {
    let response = await fetch(
      `${url_endpoint}/api/get_user_profile_by_id/${id}?format=json`
    );
    profile = await response.json();
  } catch (error) {
    console.error("getProfile() error: ", error);
  } finally {
    return profile; 
  }
}

export async function getUserOpportunities(id: String) {
  let opportunities = [];
  
  try {
    let response = await fetch(
      `${url_endpoint}/api/get_user_participations/${id}?format=json`
    );
    opportunities = await response.json();
    if(!Array.isArray(opportunities))
      opportunities = []; 
  } catch (error) {
    console.error(error);
  } finally {
    const uaOpportunities = await getUserAddedParticipations(id)
    opportunities = opportunities.concat(uaOpportunities) 
    return opportunities
  }
}

export async function updateProfilePicture(formdata: any) { 
  const token = await AsyncStorage.getItem("token")
  try {
    const response = await fetch(
      `${url_endpoint}/api/update_user_pfp/`,
      {
        method: "PUT",
        body: formdata,
        headers: {
          'Authorization': `Token ${token}`
        }
      }
    )  
    if (!response.ok) {
      console.error('Server responded with an error:', response.status);
      const errorBody = await response.text();
      console.error('Error message from server:', errorBody);
    }
  } catch(error) {
    console.error("Fetch error:", error);
  }
}

export async function updateUser(username: string, first_name: string, last_name: string, description: string) {
  const token = await AsyncStorage.getItem("token")
  await fetch(
    `${url_endpoint}/api/update_user/`,
    {
      method: "PUT",
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify({
        username: username,
        first_name: first_name,
        last_name: last_name,
      }),
    }
  )
  await fetch(
    `${url_endpoint}/api/update_user_profile/`,
    {
      method: "PUT",
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify({
        description: description,
      }),
    }
  )

}
