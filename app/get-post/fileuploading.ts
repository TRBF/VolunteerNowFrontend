import { getAccountToken } from "./_account";
import { url_endpoint } from "./_config";

export function uploadFile(fileToUpload : any) {
    return new Promise((resolve, reject) => {
        const method = 'post';
      
        const xhr = new XMLHttpRequest();
        xhr.upload.onprogress = (ev) => {
            console.log(ev.loaded + " / " + ev.total);
        }
        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4) {
                console.log("done: " + xhr.status);
                console.log(xhr.response);
                resolve(xhr.response);
            }
        };

        getAccountToken().then(token => {
            console.log("starting upload " + token)
            xhr.open('POST', url_endpoint + '/api/upload', true);
            xhr.setRequestHeader('Authorization', token);
            const formData = new FormData();
            formData.append("file", "hello");
            xhr.send(formData);
        });
    });
}