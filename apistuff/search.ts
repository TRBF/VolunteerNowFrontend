import { url_endpoint } from "./_config";

export async function searchUniversal(search_term: string) {
  let response = await fetch(
    `${url_endpoint}/api/search/${search_term}?format=json`
  );
  let result = await response.json();
  console.log("res: ", result);
  return result;
}

