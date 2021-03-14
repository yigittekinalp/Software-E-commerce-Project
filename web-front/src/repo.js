import axios from 'axios'



let url = 'http://localhost:8000/api';

export function getProducts(){
    return axios.get(`${url}/mainPage`)
    .then(response => response.data)
}