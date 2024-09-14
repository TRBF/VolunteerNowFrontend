const form = document.querySelector('form');

function uploadFiles() {
    const url = 'https://httpbin.org/post';
    const method = 'post';
  
    const xhr = new XMLHttpRequest();
  
    const data = new FormData(form);
  
    xhr.open(method, url);
    xhr.send(data);
}