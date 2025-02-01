import AsyncStorage from "@react-native-async-storage/async-storage";
import { url_endpoint } from "./_config";

export async function getUserAddedParticipations(id: String){
  const url = url_endpoint + "/api/get_user_added_participations/" + id; 
  let response = await fetch(url);
  const participations = await response.json();
  if(!Array.isArray(participations) && Object.keys(participations).length!=0){
    return [participations]
  }
  else if(!Array.isArray(participations))
    return []
  return participations;
}

export async function addUserAddedParticipation(role: String, organiser: String, description: String, startDate: Date, endDate: Date, hours: String){
  const token = await AsyncStorage.getItem("token")
  
  const start_date = `${startDate.getFullYear()}-${startDate.getMonth()+1}-${startDate.getDate()}`
  const end_date = `${endDate.getFullYear()}-${endDate.getMonth()+1}-${endDate.getDate()}`

  await fetch(
    `${url_endpoint}/api/add_user_added_participation/`,
    {
      method: "POST",
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify({
        role: role,
        organiser: organiser,
        description: description,
        start_date: start_date,
        end_date: end_date,
        hours: hours,
      }),
    }
  )
} 

export async function updateUserAddedParticipation(id: String, role: String, organiser: String, description: String){
  const token = await AsyncStorage.getItem("token")
  await fetch(
    `${url_endpoint}/api/update_user_added_participation/${id}/`,
    {
      method: "PUT",
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify({
        role: role,
        organiser: organiser,
        description: description,
      }),
    }
  )

}

export async function deleteUserAddedParticipation(id: String){
  const token = await AsyncStorage.getItem("token")
  const response  = await fetch(
    `${url_endpoint}/api/delete_user_added_participation/${id}/`,
    {
      method: "DELETE",
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      }
    }
  )
  const json = await response.json()
  console.log(json) 

}
