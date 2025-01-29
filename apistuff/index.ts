import { url_endpoint } from "./_config";

export async function getEvents() {
  const url = url_endpoint + "/api/get_opportunities"; 
  let response = await fetch(url);
  const events = await response.json();
  return events;
}

export async function getPfp(id: String) {
  const url = url_endpoint + "/api/get_user_profile_by_id/" + id; 
  let response = await fetch(url);
  const json = await response.json();
  return json.profile_picture
}
