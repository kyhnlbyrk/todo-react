import axios from "axios";
import { post, get } from "./requestService";

export const BASE_URL = "/api/ws";

export function getAllToDo(search: string) {
    let url = '/getTodoList?search=' + search;
    return get(url);
}