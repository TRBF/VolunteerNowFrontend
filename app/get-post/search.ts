
export async function search_event(search_term) {
    const url = `http://188.214.88.101:3000/api/search_events/${search_term}`;
    const response = await fetch(url);
    const result = await response.json();
    if (!result.success)return [];
    return result.result;
}

export async function search_organisers(search_term) {
    const url = `http://188.214.88.101:3000/api/search_organisers/${search_term}`;
    const response = await fetch(url);
    const result = await response.json();
    if (!result.success)return [];
    return result.result;
}

export async function search_volunteers(search_term) {
    const url = `http://188.214.88.101:3000/api/search_volunteers/${search_term}`;
    const response = await fetch(url);
    const result = await response.json();
    if (!result.success)return [];
    return result.result;
}

