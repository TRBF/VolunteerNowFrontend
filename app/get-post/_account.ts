import AsyncStorage from "@react-native-async-storage/async-storage";

export async function isLoggedIn() {
    try {
        const token = await AsyncStorage.getItem('token');
        return token != null;
    } catch(e) {
        console.log(e);
    }    
}

export async function getAccountToken() {
    return await AsyncStorage.getItem('token');
}

export async function getAccountId() {
    return parseInt(await AsyncStorage.getItem('account_id'));
}

export async function rememberAccount(token : string, id : number) {
    try {
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('account_id', id.toString());
    } catch(e) {
        console.log(e);
    }
}