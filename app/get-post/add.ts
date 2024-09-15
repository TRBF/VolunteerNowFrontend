import { isLoggedIn } from "./_account";
import { url_endpoint } from "./_config";
import { uploadFile } from "./fileuploading";
import { getAccountToken } from "./_account";

// functie pt login la users
export async function login(username, password) {
    const url = url_endpoint+`/api/login?username=${username}&password=${password}`;
    const response = await fetch(url);
    const result = await response.json();
    console.log(result);
    return result;
}
export async function get_my_profile() {
    if(!isLoggedIn())
        return;
    const url=url_endpoint+`/api/my_profile`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': await getAccountToken()
        }
    });
    const result=await response.json();
    return result;
}
export async function modify_pfp(picture_hash) {
    if(!isLoggedIn())
        return;
    const url = url_endpoint+`/api/modify_profile`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': await getAccountToken()
        },
        body: JSON.stringify({LinkToPFP: picture_hash})
    });
    return await response.json();
}
export async function modify_Profile(username, first_name, last_name, description){
    if(!isLoggedIn())
        return;
    console.log("hello world!");
    const url=url_endpoint+`/api/modify_profile`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': await getAccountToken()
        },
        body: JSON.stringify({Username: username, FirstName: first_name, LastName: last_name, Description: description})
    });
    const result=await response.json();
    console.log(result);
    return result;
}
// functie pt creare de user:
export async function signUp(username, password, email, first_name, last_name, gender, birthday) {
    const url = url_endpoint+'/api/register';
    const response = await fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({username: username, password: password,
            email: email, first_name: first_name, last_name: last_name, 
            gender: gender, birthday: birthday}),
    });
    const newUser = await response.json();
    console.log(newUser);
    return newUser;
}

export async function get_events(number) {
    const url = url_endpoint+'/api/get_events?page';
    const response = await fetch(url);
    const event = await response.json();
    return event;
}

export async function get_event(eventid) {
    const url = url_endpoint + `/api/get_event_by_id/${eventid}`;
    const response = await fetch(url);
    return await response.json();
}

export async function add_event(name, description, link_to_pfp, link_to_cover_image, edition, location, time) {
    const url = url_endpoint+'/api/add_event';
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
    const url = url_endpoint+'/api/add_experience';
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

export async function getExperiences(userid) {
    const url = url_endpoint + `/api/get_experiences/${userid}`;
    const response = await fetch(url);
    return await response.json();
}

export async function deleteExperience(expid) {
    const url = url_endpoint + `/api/delete_experience/${expid}`;
    const response = await fetch(url, {
        headers: {
            'Authorization': await getAccountToken()
        }
    });
    return await response.json();
}