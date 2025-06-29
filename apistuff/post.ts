import { url_endpoint } from "./_config";

export async function getOpportunity(id: string | string[]) {
  const url = url_endpoint + "/api/get_opportunity_by_id/" + id;
  let response = await fetch(url);
  const opportunity = await response.json();
  return opportunity 
}

