import Axios from 'axios';

export function uploadFiles(plaintext, key) {
    const formData = new FormData();
    formData.append('plaintext', plaintext);
    formData.append('key', key);

    return Axios.post('/api/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
}