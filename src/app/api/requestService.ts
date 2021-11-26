import axios from "axios";

export const BASE_URL = "https://nodejs-basic-todo.herokuapp.com";

export const config = {
    headers: {
        'Content-Type': 'application/json'
    },
};

export function get(URL: String) {
    console.log("sending.. get : ", BASE_URL + URL);
    return axios.get(BASE_URL + URL, config);
}

export function post(URL: String, json: any) {
    console.log("sending.. post : ", BASE_URL + "/" + URL + " json = ", json);
    return axios.post(BASE_URL + URL, json, config);
}