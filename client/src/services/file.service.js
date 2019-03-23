import Axios from 'axios';

export function uploadFiles(plaintext, key) {
    const formData = new FormData();
    formData.append('plaintext', plaintext);
    formData.append('key', key);

    return Axios.post('/api/upload/file', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
}

export function uploadFolders(files, key) {
    const formData = new FormData();
    const folder = files[0].webkitRelativePath.split('/')[0];

    Object.keys(files).forEach(key => formData.append(files[key].webkitRelativePath, files[key]));
    formData.append('key', key);

    return Axios.post(`/api/upload/folder/${folder}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });  
}