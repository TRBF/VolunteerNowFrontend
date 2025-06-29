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

async function changeUserAddedParticipationPicture(id: String, uri: String){
  const formData = new FormData();
  formData.append('user_added_participation_picture', {
    uri: uri,  // File URI you get from the picker
    type: 'image/jpeg', // Correct MIME type
    name: 'user_added_participation_picture.jpg',
  });

  await updateUserAddedParticipationPicture(formData, id);
}
export async function addUserAddedParticipation(role: String, organiser: String, description: String, startDate: Date, endDate: Date, hours: String, pictureURI: String){
  const token = await AsyncStorage.getItem("token")
  
  const start_date = `${startDate.getFullYear()}-${startDate.getMonth()+1}-${startDate.getDate()}`
  const end_date = `${endDate.getFullYear()}-${endDate.getMonth()+1}-${endDate.getDate()}`

  const participation = await fetch(
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
  const json = await participation.json()
  changeUserAddedParticipationPicture(json["id"], pictureURI)
} 

export async function updateUserAddedParticipation(id: String, role: String, organiser: String, description: String, startDate: Date, endDate: Date, hours: String, pictureURI: String){

  const token = await AsyncStorage.getItem("token")

  const start_date = `${startDate.getFullYear()}-${startDate.getMonth()+1}-${startDate.getDate()}`
  const end_date = `${endDate.getFullYear()}-${endDate.getMonth()+1}-${endDate.getDate()}`


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
        start_date: start_date,
        end_date: end_date,
        hours: hours,
      }),
    }
  )

  changeUserAddedParticipationPicture(id, pictureURI)

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
}

export async function updateUserAddedParticipationPicture(formdata: any, id: String) { 
  const token = await AsyncStorage.getItem("token")
  try {
    const response = await fetch(
      `${url_endpoint}/api/update_user_added_participation_picture/${id}/`,
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
