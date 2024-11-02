import { isLoggedIn } from "./_account";
import { url_endpoint } from "./_config";
import { uploadFile } from "./fileuploading";
import { getAccountToken } from "./_account";

export async function signUp(username: string, password: string, email: string, first_name: string, last_name: string, gender: string, birthday: Date) {
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

export async function login(username, password) {
    const url = url_endpoint+`/api/login?username=${username}&password=${password}`;
    const response = await fetch(url);
    const result = await response.json();
    console.log(result);
    return result;
}
