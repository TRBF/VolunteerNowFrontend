import { searchUniversal } from "../apistuff/search"

export async function search (query:string) {
  if (!query) return []; // Return empty array if search query is empty

  try {
    let result = await searchUniversal(query);
    return result;
  } catch (error) {
    console.error("Error fetching search results: ", error);
    return [];
  }
};
