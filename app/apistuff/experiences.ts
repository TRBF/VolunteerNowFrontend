import { url_endpoint } from "./_config";

export async function getUserAddedParticipations(id: string){
  const url = url_endpoint + "/api/get_user_added_participations/" + id; 
  let response = await fetch(url);
  const participations = await response.json();
  console.log("participations: ", participations)
  if(!Array.isArray(participations)) return [participations]
  return participations;
}
