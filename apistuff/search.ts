import { url_endpoint } from "./_config";

export async function searchUniversal(search_term: string) {
  let response = await fetch(
    `${url_endpoint}/api/search/${search_term}?format=json`
  );
  let result = await response.json();
  return result;
}

export async function getPfp(id: String) {
  const url = url_endpoint + "/api/get_user_profile_by_id/" + id; 
  let response = await fetch(url);
  const json = await response.json();
  return json.profile_picture
}
