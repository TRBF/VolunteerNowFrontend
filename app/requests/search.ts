import {url_endpoint} from "./_config";

export async function searchUniversal(search_term: string) {
    const url = url_endpoint+`/api/search/${search_term}?format=json`;
    let response = await fetch(`http://192.168.1.218:8000/api/search/${ search_term }?format=json`);
    let result = await response.json();
    return result;
}

// --------- OLD STUFF ---------
//export async function search_opportunity(search_term: string) {
//    const url = url_endpoint+`/api/search_opportunities/${search_term}`;
//    const response = await fetch(url);
//    const result = await response.json();
//    if (!result.success)return [];
//    return result.result;
//}
//
//export async function search_organisers(search_term: string) {
//    const url = url_endpoint+`/api/search_organisers/${search_term}`;
//    const response = await fetch(url);
//    const result = await response.json();
//    if (!result.success)return [];
//    return result.result;
//}
//
//export async function search_volunteers(search_term: string) {
//    const url = url_endpoint+`/api/search_volunteers/${search_term}`;
//    const response = await fetch(url);
//    const result = await response.json();
//    if (!result.success)return [];
//    return result.result;
//}
