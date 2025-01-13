import { url_endpoint } from "./_config";

export async function getOpportunity(id: string | string[]) {
  const url = url_endpoint + "/api/get_opportunity_by_id/" + id;
  let response = await fetch(url);
  console.log(response)
  const opportunity = await response.json();
  console.log(opportunity)
  return opportunity 
}

