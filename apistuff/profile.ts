import { url_endpoint } from "./_config";

export async function getProfile(id: Number) {
  let profile = {};
  
  try {
    let response = await fetch(
      `${url_endpoint}/api/get_user_by_id/${id}?format=json`
    );
    profile = await response.json();
  } catch (error) {
    console.error(error);
  } finally {
    return profile; 
  }
}

export async function getUserOpportunities(id: Number) {
  let opportunities = [];
  
  try {
    let response = await fetch(
      `${url_endpoint}/api/get_user_participations/${id}?format=json`
    );
    opportunities = await response.json();
  } catch (error) {
    console.error(error);
  } finally {
    return opportunities
  }
}

export async function updateProfilePicture(id: Number, formdata: any) { 
    fetch(
      `${url_endpoint}/api/update_user_pfp/${id}`,
      {
        method: "PUT",
        body: formdata
      }
    )
    .then(() => {console.log("sent")})
    .catch(error => {
      console.error("Fetch error:", error);
    });
}
