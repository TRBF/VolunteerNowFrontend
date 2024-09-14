import {url_endpoint} from "./_config";

export async function search_event(search_term) {
    const url = url_endpoint+`/api/search_events/${search_term}`;
    const response = await fetch(url);
    const result = await response.json();
    if (!result.success)return [];
    return result.result;
}

export async function search_organisers(search_term) {
    const url = url_endpoint+`/api/search_organisers/${search_term}`;
    const response = await fetch(url);
    const result = await response.json();
    if (!result.success)return [];
    return result.result;
}

export async function search_volunteers(search_term) {
    const url = url_endpoint+`/api/search_volunteers/${search_term}`;
    const response = await fetch(url);
    const result = await response.json();
    if (!result.success)return [];
    return result.result;
}

