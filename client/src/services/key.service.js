import Axios from 'axios';

export function getKey(length) {
    return Axios.get(`/api/key/${length}`);
}