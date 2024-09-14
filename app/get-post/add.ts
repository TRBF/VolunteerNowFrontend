export const urlendpoint="http://api.volunteernow.ro";



import { uploadFile } from "./fileuploading";

// functie pt login la users
export async function getUsers() {
    const url = urlendpoint+'/api/login?username&password';
    const response = await fetch(url);
    const users = await response.json();
    return users;
}

// functie pt creare de user:
export async function createUser(username, password, gender, first_name, last_name, email) {
    const url = urlendpoint+'/api/register';
    const response = await fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify([username, password, gender, first_name, last_name, email]),
    });
    const newUser = await response.json();
    return newUser;
}

export async function eventGet(number) {
    const url = urlendpoint+'/api/get_events?page';
    const response = await fetch(url);
    const event = await response.json();
    return event;
}

export async function eventAdd(name, description, link_to_pfp, link_to_cover_image, edition, location, time) {
    const url = urlendpoint+'/api/add_event';
    const response = await fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify([name, description, link_to_pfp, link_to_cover_image, edition, location, time]),
    });
    const newEvent = await response.json();
    return newEvent;   
}

export async function addExperiences(name, description, location, time, file:Blob){
    const asset_hash = await uploadFile(file);
    const url = urlendpoint+'/api/add_experience';
    const token="";
    const response = await fetch(url, {
        method: 'GET', 
        headers: {
            authorization: token
        }
    });
    const result = await response.json();
    if (!result.success)return [];
    return result.result;
}