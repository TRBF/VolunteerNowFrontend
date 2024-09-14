export function uploadFile(fileToUpload : Blob) {
    return new Promise((resolve, reject) => {
        const method = 'post';
      
        const xhr = new XMLHttpRequest();
        xhr.onload = resolve;
        xhr.onerror = reject;
      
        const data = new FormData();
        data.set("file", fileToUpload);
      
        xhr.open(method, url);
        xhr.send(data);
    });
}